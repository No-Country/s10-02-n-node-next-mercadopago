import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  forwardRef,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';
import { Types } from 'mongoose';
import { User } from './schema/user.model';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;

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
        throw new BadRequestException(`${createUserDto.email} already exists!`);
      }
      throw new InternalServerErrorException('Something bad happen!!!');
    }
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ObjectId');
      }
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new BadRequestException('User not found');
      }
      return user;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Actualizar campos permitidos del DTO
    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    // Continuar con otros campos que se permitia actualizar

    await user.save();

    return user;
  }

  async remove(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const user = await this.userModel.findByIdAndRemove(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
