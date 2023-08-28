import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePaymentDto } from './create-payment.dto';

export class CreateBankPaymentDto extends CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  accountHolderName: string;

  @IsNotEmpty()
  @IsString()
  bankName: string;
}
