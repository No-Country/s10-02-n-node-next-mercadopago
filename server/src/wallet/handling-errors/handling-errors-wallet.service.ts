import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from '../schema/wallet.model';
import { CreditCardMethod } from 'src/payment/schema/creditCard.model';
import { BankAccountMethod } from 'src/payment/schema/accountBank.model';
import { TransferDto } from '../dto/transfer-dto';

@Injectable()
export class HandlingErrorsService {
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
    @InjectModel('CreditCard')
    private readonly creditCardModel: Model<CreditCardMethod>,
    @InjectModel('BankAccount')
    private readonly bankAccountModel: Model<BankAccountMethod>,
  ) {}
  async errorHandlingOperationsWallet(
    wallet: Wallet,
    searchPaymentMethod: CreditCardMethod | BankAccountMethod,
    amount: number,
  ) {
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (!searchPaymentMethod) {
      throw new NotFoundException('Payment method is not registered');
    }

    if (searchPaymentMethod.balance < amount) {
      throw new UnprocessableEntityException('Insufficient balance');
    }
  }

  async errorHandlingTransferFunds(
    fromWallet: Wallet,
    toWallet: Wallet,
    transferDto: TransferDto,
  ) {
    if (!fromWallet || !toWallet) {
      throw new NotFoundException('Wallet not found');
    }

    if (fromWallet.balance < transferDto.amount) {
      throw new UnprocessableEntityException('Insufficient balance');
    }

    if (transferDto.amount <= 0) {
      throw new UnprocessableEntityException('invalid amount');
    }

    if (String(fromWallet._id) === String(toWallet._id)) {
      throw new BadRequestException(
        'You cannot transfer funds to the same wallet',
      );
    }
  }
}
