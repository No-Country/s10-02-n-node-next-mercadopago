import { IsNotEmpty, IsNumber,  IsString,  Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '155-144-1545', description: 'Número de la tarjeta' })
    cardNumber: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Nombre del titular de la tarjeta', description: 'Nombre del titular de la tarjeta' })
    headline: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '12/25', description: 'Fecha de vencimiento de la tarjeta (MM/YY)' })
    expiration: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: '123', description: 'Código CVV de 3 o 4 dígitos' })
    cvv: number;
}
