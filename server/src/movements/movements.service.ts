import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
// import { UpdateMovementDto } from './dto/update-movement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Movement } from 'src/movements/schema/movement.model';
import { WalletService } from 'src/wallet/wallet.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel('Movement') private readonly movementModel: Model<Movement>,
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async createMovement(
    createMovementDto: CreateMovementDto,
    userId: string,
  ): Promise<Movement> {
    try {
      const { type, amount, source, destination, status } = createMovementDto;

      const user = await this.userService.getUserAndCheck(userId);
      const wallet = await this.walletService.findById(
        user.walletId.toString(),
      );

      const mov = new this.movementModel({
        walletId: wallet._id,
        type,
        amount,
        source,
        destination,
        status,
        date: new Date(),
      });

      await mov.save();
      return mov;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Movement already exists!`);
      }
      throw new InternalServerErrorException('Something bad happen!!!');
    }
  }

  findAllMovements() {
    return this.movementModel.find();
  }

  async findOneMovement(id: string) {
    {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ObjectId');
      }
      const mov = await this.movementModel.find({ walletId: id });

      if (!mov.length) {
        throw new BadRequestException('Movement not found');
      }
      return mov;
    }
  }

  // update(id: number, updateMovementDto: UpdateMovementDto) {
  //   return `This action updates a #${id} movement`;
  // }

  // removeMovement(id: number) {
  //   return `This action removes a #${id} movement`;
  // }
}