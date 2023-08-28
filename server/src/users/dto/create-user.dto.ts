import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email no valido' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
