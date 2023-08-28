import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login-dto';
import { UnauthorizedException } from '@nestjs/common';
import { LoginResponse } from './interfaces/login-response';
import { User } from './schema/auth.model';
import { JwtPayload } from './interfaces/jwt-payload';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @Inject(forwardRef(() => JwtService))
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<LoginResponse> {
    const user = await this.usersService.createUser(signUpDto);

    return {
      user: user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync({
      id: user._id,
      email: user.email,
    });
    return {
      token,
    };
  }
}
