// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { PaymentTypes } from '../interfaces/payment.types';

// @Schema()
// export class CreditCardMethod {
//   _id?: string;

//   @Prop({ required: true })
//   paymentType: PaymentTypes;

//   @Prop({ required: true })
//   name: string;

//   @Prop({ unique: [true, 'This card is already registered'] })
//   cardNumber: string;

//   @Prop({ required: true })
//   expirationDate: string;

//   @Prop({ required: true })
//   cvv: string;

//   @Prop({ default: 1000000 })
//   balance: number;
// }

// export const CreditCardSchema = SchemaFactory.createForClass(CreditCardMethod);

import * as mongoose from 'mongoose';

export const CreditCardSchema = new mongoose.Schema({
  _id: { type: String },
  paymentType: { type: String, required: true },
  name: { type: String, required: true },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
    message: 'This card is already registered',
  },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true },
  balance: { type: Number, required: true, default: 1000000 },
});
