import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Payment } from './schema/payment.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCreditCardPaymentDto } from './dto/creditcard-partial.dto';
import { CreateBankPaymentDto } from './dto/bank-partial.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel('Payment') private readonly paymentModel: Model<Payment>,
  ) {}

  async createCreditCardPayment(
    createCreditCardDto: CreateCreditCardPaymentDto,
  ): Promise<Payment> {
    const payment = new this.paymentModel({
      userId: createCreditCardDto.userId,
      paymentType: createCreditCardDto.paymentType, // Usar el valor del DTO
      ...createCreditCardDto,
    });
    return payment.save();
  }

  async createBankPaymentDto(
    createBankPaymentDto: CreateBankPaymentDto,
  ): Promise<Payment> {
    const payment = new this.paymentModel({
      userId: createBankPaymentDto.userId,
      paymentType: createBankPaymentDto.paymentType,
      ...createBankPaymentDto,
    });
    return payment.save();
  }

  async getPaymentsByUserId(userId: string): Promise<Payment[]> {
    try {
      return this.paymentModel.find({ userId }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving payments.');
    }
  }
}
