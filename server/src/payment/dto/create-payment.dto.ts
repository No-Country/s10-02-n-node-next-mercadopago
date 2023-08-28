import { IsNotEmpty, IsEnum } from 'class-validator';
import mongoose from 'mongoose';

enum PaymentType {
  CreditCard = 'credit_card',
  BankAccount = 'bank_account',
  // Otros tipos de métodos de pago
}

export class CreatePaymentDto {
  @IsNotEmpty()
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsEnum(PaymentType)
  paymentType: PaymentType;
}
