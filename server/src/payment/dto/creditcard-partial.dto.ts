import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';
import { CreatePaymentDto } from './create-payment.dto';

export class CreateCreditCardPaymentDto extends CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  cardHolderName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(12)
  expirationMonth: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(new Date().getFullYear())
  expirationYear: number;

  @IsNotEmpty()
  @IsString()
  cvv: string;
}
