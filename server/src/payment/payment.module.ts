import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './schemas/card.schemas';
import { BankSchema } from './schemas/bank.schema';
import { PaymentSchema } from './schemas/payment.schema';
import { UsersModule } from 'src/users/users.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { TransactionSchema } from './schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Card', schema: CardSchema },
      { name: 'Bank', schema: BankSchema},
      { name: 'Payment', schema: PaymentSchema},
      { name: 'Transaction', schema: TransactionSchema},
    ]),
    UsersModule,
    WalletModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
