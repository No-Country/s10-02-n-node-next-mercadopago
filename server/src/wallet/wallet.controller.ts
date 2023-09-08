import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './schema/wallet.model';
import { TransferResult } from './interfaces/Transfer-result';
import { UsersService } from 'src/users/users.service';

import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/users/guard/auth-guard';
import { Request } from 'express';
import { User } from 'src/users/schema/user.model';
import { ActionGetInfo } from './interfaces/operations-get-wallet';
import { ActionPostWallet } from './interfaces/operations-post-wallet.types';
import { TransferDto } from './dto/transfer-dto';
import { OperationsWalletDto } from './dto/operation-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  // Peticion del usuario autenticado sin roles de administrador
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/wallet/:action')
  async getInfoWallet(
    @Req() { user }: Request & { user: User },
    @Param('action') action: ActionGetInfo,
  ): Promise<Wallet | { balance: number } | string> {
    return this.walletService.getInfoWallet(user.id, action);
  }

  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('wallet/:action')
  async operationsWallet(
    @Req() { user }: Request & { user: User },
    @Param('action') action: ActionPostWallet,
    @Body() { paymentTypes, selectedPaymentId, amount }: OperationsWalletDto,
  ) {
    return this.walletService.operationsWallet(
      user.id,
      action,
      paymentTypes,
      selectedPaymentId,
      amount,
    );
  }

  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('transfer')
  async transferBetweenWallets(
    @Req() { user }: Request & { user: User },
    @Body() transferDto: TransferDto,
  ): Promise<TransferResult> {
    return this.walletService.transferFunds(user.id, transferDto);
  }

  //Este lo dejo asi para poder hacer los test de prueba
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async getWallets(): Promise<Wallet[]> {
    return this.walletService.getWallets();
  }
}
