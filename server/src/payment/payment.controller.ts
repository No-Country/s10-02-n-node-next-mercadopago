import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UsersService } from 'src/users/users.service';
import { CreateCardDto } from './dto/create-card.dto';
import { CreateBankDto } from './dto/create-bank.dto';
import { ApiTags } from '@nestjs/swagger';
import { DepositDtoWallet } from './dto/deposit-wallet.dto';

@ApiTags('payments')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly userService: UsersService
  ) { }

  @Post(':id/card')
  async createCard(
    @Param('id') id: string,
    @Body() cardDto: CreateCardDto,
  ) {
    return this.userService.createCard(id, cardDto);
  }

  @Post(':id/banck')
  async createBankAccount(
    @Param('id') id: string,
    @Body() bankDto: CreateBankDto,
  ) {
    return this.userService.createBankAccount(id, bankDto);
  }

  @Post(':id/deposit-wallet/:walletId')
  async depositWallet(
    @Param('id') id: string,
    @Param('walletId') walletId: string,
    @Body() DepositDtoWallet: DepositDtoWallet,
  ) {
    return this.paymentService.depositToWalletUsingCardOrBank(id, DepositDtoWallet, walletId);
  }

  @Post(':id/transaccions')
  async getTransaccionPayment(
    @Param('id') id: string,
  ) {
    return this.paymentService.getTransactionsByUserId(id);
  }



}
