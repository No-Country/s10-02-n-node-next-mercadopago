import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login-dto';
import { UnauthorizedException } from '@nestjs/common';
import { User } from './schema/auth.schema';
import { WalletService } from 'src/wallet/wallet.service';
import { LoginResponse } from './interfaces/login-response';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @Inject(forwardRef(() => JwtService))
    private jwtService: JwtService,
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService,
  ) {}

  async createUser(signUpDto: SignUpDto): Promise<User> {
    try {
      const { password, ...userData } = signUpDto;

      const newUser = new this.userModel({
        password: bcrypt.hashSync(password, 10),
        ...userData,
      });

      await newUser.save();

      const wallet = await this.walletService.createWallet(
        newUser._id.toString(),
      );
      newUser.wallet = wallet._id.toString();

      const { password: _, ...user } = newUser.toJSON();

      return user as unknown as User;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${signUpDto.email} already exists!`);
      }
      throw new InternalServerErrorException('Something bad happen!!!');
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<LoginResponse> {
    const user = await this.createUser(signUpDto);

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
