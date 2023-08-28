import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/auth/schema/auth.schema';
import mongoose, { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  // consultas query
  async findAll(@Req() request: Request) {
    return this.userModel.find(request.query)
      .setOptions({ sanitizeFilter: true })
      .exec();
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a # user`;
  }

  remove(id: string) {
    return `This action removes a #user`;
  }

  ///////// CARDS
  async addCard(id: string, card: any) {
    let user: UserDocument = await this.userModel.findById(id);
    user.cards.push(card);
    user.save();
    console.log(user.cards)
    return user;
  }
}
