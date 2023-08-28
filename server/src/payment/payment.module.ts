import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentSchema } from './schema/payment.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'paymentService',
      useClass: PaymentService,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
