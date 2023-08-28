import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Wallet } from 'src/wallet/schema/wallet.model';
import { TransferData } from './interfaces/transfer-data';
import { TransferResult } from './interfaces/Transfer-result';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
  ) {}

  async createWallet(userId: string): Promise<Wallet> {
    const wallet = new this.walletModel({ userId });
    return wallet.save();
  }

  async getBalance(userId: string): Promise<number> {
    const wallet = await this.walletModel.findOne({ userId }).exec();

    if (!wallet) {
      throw new Error('Wallet not found'); // Maneja el caso si la billetera no se encuentra
    }

    return wallet.balance;
  }

  async getWalletByUserId(userId: string): Promise<Wallet> {
    try {
      const wallet = await this.walletModel.findOne({ userId: userId }).exec();
      return wallet;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving wallet.');
    }
  }

  async deposit(userId: string, amount: number): Promise<Wallet | null> {
    const wallet = await this.walletModel.findOne({ userId }).exec();

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    wallet.balance += amount;
    await wallet.save();

    return wallet;
  }

  async withdraw(userId: string, amount: number): Promise<Wallet | null> {
    const wallet = await this.walletModel.findOne({ userId }).exec();

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    wallet.balance -= amount;
    await wallet.save();

    return wallet;
  }

  async transferFunds(transferData: TransferData): Promise<TransferResult> {
    const { fromUserId, toUserId, balance } = transferData;

    const fromWallet = await this.walletModel
      .findOne({ userId: fromUserId })
      .exec();
    const toWallet = await this.walletModel
      .findOne({ userId: toUserId })
      .exec();

    if (!fromWallet || !toWallet) {
      throw new Error('Wallet not found');
    }

    if (fromWallet.balance < balance) {
      throw new Error('Insufficient balance');
    }

    fromWallet.balance -= balance;
    toWallet.balance += balance;

    await Promise.all([fromWallet.save(), toWallet.save()]);

    return {
      fromWallet: fromWallet.toObject(),
      toWallet: toWallet.toObject(),
    };
  }
}
