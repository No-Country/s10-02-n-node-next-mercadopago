// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { PaymentTypes } from '../interfaces/payment.types';

// @Schema()
// export class BankAccount {
//   _id?: string;

//   @Prop({ required: true })
//   paymentType: PaymentTypes;

//   @Prop({ required: true })
//   bankName: string;

//   @Prop({
//     required: true,
//     unique: true,
//     message: 'This card is already registered',
//   })
//   accountNumber: string;

//   @Prop({ default: 1000000 })
//   balance: number;
// }

// export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);

import * as mongoose from 'mongoose';

export const BankAccountSchema = new mongoose.Schema({
  _id: { type: String },
  paymentType: { type: String, required: true },
  bankName: { type: String, required: true },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    message: 'This account bank is already registered',
  },
  balance: { type: Number, required: true, default: 1000000 },
});
