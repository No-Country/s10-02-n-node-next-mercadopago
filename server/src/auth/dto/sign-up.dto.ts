import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({example: 'felipe'})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example: 'correo@correo.com'})
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email no valido' })
  email: string;

  @ApiProperty({example: '12456725'})
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
