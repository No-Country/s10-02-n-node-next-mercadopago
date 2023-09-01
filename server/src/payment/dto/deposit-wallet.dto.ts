import { IsNotEmpty, IsNumber,  IsString,  Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepositDtoWallet {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'bank', description: 'Número de la tarjeta' })
    paymentType: string; // card or bankAccount

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '155-1414-1545' })
    numberAccount: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 100 })
    depositAmount: number;
}
