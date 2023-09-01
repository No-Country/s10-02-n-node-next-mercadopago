import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '155-144-1545', description: 'Número de cuenta' })
    accountNumber: string;
   
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Felipe titular', description: 'Nombre del titular de la tarjeta' })
    headline: string;

    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Bancolombia', description: 'Nombre del titular de la tarjeta' })
    bankName: string;
}
