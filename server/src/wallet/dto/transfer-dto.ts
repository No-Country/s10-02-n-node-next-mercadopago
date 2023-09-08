import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransferDto {
  @IsString()
  toUserId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
