import { Controller, Inject, Param, Post, Get, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateCreditCardPaymentDto } from './dto/creditcard-partial.dto';
import { CreateBankPaymentDto } from './dto/bank-partial.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    @Inject('paymentService') private readonly paymentService: PaymentService,
  ) {}

  @Post('/creditcard')
  async createCreditCardPayment(
    @Body() createCreditCardDto: CreateCreditCardPaymentDto,
  ) {
    const payment = await this.paymentService.createCreditCardPayment(
      createCreditCardDto,
    );
    return payment;
  }

  @Post('/bank')
  async CreateBankPaymentDto(
    @Body() createBankPaymentDto: CreateBankPaymentDto,
  ) {
    const payment = await this.paymentService.createBankPaymentDto(
      createBankPaymentDto,
    );
    return payment;
  }

  @Get(':userId')
  getPaymentsByUserId(@Param('userId') userId: string) {
    return this.paymentService.getPaymentsByUserId(userId);
  }
}
