import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UsersService } from 'src/users/users.service';
import { CreateCardDto } from './dto/create-card.dto';
import { CreateBankDto } from './dto/create-bank.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly userService: UsersService
    ) {}

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
    
}
