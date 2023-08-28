import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';



export class CreateUserDto {
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
