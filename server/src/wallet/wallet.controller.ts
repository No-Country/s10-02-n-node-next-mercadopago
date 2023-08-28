import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './schema/wallet.model';
import { TransferData } from 'src/auth/interfaces/transfer-data';
import { TransferResult } from 'src/auth/interfaces/Transfer-result';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async createWallet(@Body('userId') userId: string) {
    return this.walletService.createWallet(userId);
  }

  @Get(':userId/balance')
  async getBalance(@Param('userId') userId: string) {
    return this.walletService.getBalance(userId);
  }

  @Get(':userId/wallet')
  async getUserWallet(@Param('userId') userId: string): Promise<Wallet> {
    return this.walletService.getWalletByUserId(userId);
  }

  @Post(':userId/deposit')
  async depositToWallet(
    @Param('userId') userId: string,
    @Body('balance') balance: number,
  ): Promise<Wallet | null> {
    return this.walletService.deposit(userId, balance);
  }

  @Post(':userId/withdraw')
  async withdrawFromWallet(
    @Param('userId') userId: string,
    @Body('balance') balance: number,
  ): Promise<Wallet | null> {
    return this.walletService.withdraw(userId, balance);
  }

  @Post('transfer')
  async transferFunds(
    @Body() transferData: TransferData,
  ): Promise<TransferResult> {
    return this.walletService.transferFunds(transferData);
  }
}
