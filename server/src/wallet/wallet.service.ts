import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from 'src/wallet/schema/wallet.model';
import { CvuGeneratorService } from './cvu-alias-generator/cvu-generator.service';
import { UsersService } from 'src/users/users.service';

import { TransferResult } from './interfaces/Transfer-result';

import { CreateWalletDto } from './dto/create-wallet.dto';
import { CreditCardMethod } from 'src/payment/schema/creditCard.model';
import { PaymentService } from 'src/payment/payment.service';
import { PaymentTypes } from 'src/payment/interfaces/payment.types';
import { ActionGetInfo } from './interfaces/operations-get-wallet';
import { ActionPostWallet } from './interfaces/operations-post-wallet.types';
import { BankAccountMethod } from 'src/payment/schema/accountBank.model';
import { HandlingErrorsService } from './handling-errors/handling-errors-wallet.service';
import { TransferDto } from './dto/transfer-dto';

@Injectable()
export class WalletService {
  private walletDto: CreateWalletDto;
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
    @InjectModel('CreditCard')
    private readonly creditCardModel: Model<CreditCardMethod>,
    @InjectModel('BankAccount')
    private readonly bankAccountModel: Model<BankAccountMethod>,

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,

    @Inject(forwardRef(() => CvuGeneratorService))
    private readonly cvuGeneratorService: CvuGeneratorService,

    @Inject(forwardRef(() => HandlingErrorsService))
    private readonly handlingErrorsService: HandlingErrorsService,
  ) {
    this.walletDto = new this.walletModel();
  }

  async findById(walletId: string): Promise<Wallet | null> {
    return this.walletModel.findById(walletId).exec();
  }

  async getWallets(): Promise<Wallet[]> {
    return this.walletModel.find().exec();
  }
  async getWalletByCvu(cvu: string): Promise<Wallet | null> {
    return this.walletModel.findOne({ cvu }).exec();
  }
  async getWalletByAlias(alias: string): Promise<Wallet | null> {
    return this.walletModel.findOne({ alias }).exec();
  }

  async getWalletAndCheck(walletId: string): Promise<Wallet> {
    const wallet = this.walletModel.findById(walletId).exec();

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async getWalletByFilter(filter: Record<string, any>): Promise<Wallet | null> {
    return this.walletModel.findOne(filter).exec();
  }

  async createWallet(): Promise<Wallet> {
    try {
      const cvu = await this.cvuGeneratorService.generateUniqueCVU();
      const alias = await this.cvuGeneratorService.generateUniqueAlias();
      //const alias = await this;
      const { ...data } = this.walletDto;
      const newWallet = new this.walletModel({
        alias,
        data,
        cvu: cvu,
      });

      await newWallet.save();
      return newWallet;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Wallet already exists!`);
      }

      throw new InternalServerErrorException(
        'Something happened creating the wallet',
      );
    }
  }

  async getInfoWallet(
    userId: string,
    action: ActionGetInfo,
  ): Promise<Wallet | { balance: number } | string> {
    const user = await this.userService.getUserAndCheck(userId);
    const walletInfo = await this.findById(user.walletId.toString());
    if (!walletInfo) {
      throw new NotFoundException('Wallet not found');
    }

    switch (action) {
      case 'info':
        return walletInfo;
      case 'id':
        return walletInfo._id;
      case 'balance':
        return { balance: walletInfo.balance };
      default:
        throw new Error('Invalid action');
    }
  }

  async operationsWallet(
    userId: string,
    action: ActionPostWallet,
    paymentTypes: PaymentTypes,
    selectedPaymentId: string,
    amount: number,
  ): Promise<Wallet | { amount: number; selectedPaymentId: string } | string> {
    const user = await this.userService.getUserAndCheck(userId);
    const wallet = await this.findById(user.walletId.toString());
    const searchPaymentMethod = await this.paymentService.searchPymentMethods(
      selectedPaymentId,
      paymentTypes,
    );

    await this.handlingErrorsService.errorHandlingOperationsWallet(
      wallet,
      searchPaymentMethod,
      amount,
    );

    switch (action) {
      case 'deposit':
        await searchPaymentMethod.save();
        wallet.balance += amount;
        await wallet.save();
        return wallet;
      case 'withdraw':
        if (
          searchPaymentMethod.paymentType === ('CreditCard' as PaymentTypes)
        ) {
          throw new BadRequestException(
            'To withdraw funds select a bank account or wallet',
          );
        }

        searchPaymentMethod.balance += amount;
        await searchPaymentMethod.save();
        wallet.balance -= amount;
        await wallet.save();
        return wallet;
      default:
        throw new Error('Invalid action');
    }
  }

  async transferFunds(
    fromUserId: string,
    transferDto: TransferDto,
  ): Promise<TransferResult> {
    const fromUser = await this.userService.getUserAndCheck(fromUserId);
    const toUser = await this.userService.getUserAndCheck(transferDto.toUserId);
    const fromWallet = await this.findById(fromUser.walletId.toString());
    const toWallet = await this.findById(toUser.walletId.toString());

    await this.handlingErrorsService.errorHandlingTransferFunds(
      fromWallet,
      toWallet,
      transferDto,
    );

    fromWallet.balance -= transferDto.amount;
    toWallet.balance += transferDto.amount;

    await Promise.all([fromWallet.save(), toWallet.save()]);

    return {
      fromWallet: fromWallet.toObject(),
      toWallet: toWallet.toObject(),
      message: 'Operation successful',
    };
  }
}
