import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './schemas/card.schemas';
import { BankSchema } from './schemas/bank.schema';
import { PaymentSchema } from './schemas/payment.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Card', schema: CardSchema },
      { name: 'Bank', schema: BankSchema},
      { name: 'Payment', schema: PaymentSchema},
    ]),
    UsersModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
