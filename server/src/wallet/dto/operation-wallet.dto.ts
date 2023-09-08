import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentTypes } from 'src/payment/interfaces/payment.types';

export class OperationsWalletDto {
  @ApiProperty()
  @IsNotEmpty()
  paymentTypes: PaymentTypes;

  @ApiProperty()
  @IsString()
  selectedPaymentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
