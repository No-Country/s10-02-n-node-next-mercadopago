import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Payment } from './payment.schema';
import { Wallet } from 'src/wallet/schema/wallet.model';

export type TransactionDocument = Transaction & Document;

@Schema({
    timestamps: true,
  })
export class Transaction extends Document {
  @Prop({ required: true })
  type: string; // "deposit", "withdraw", "payment", "transfer", etc.

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' })
  paymentMethods: Payment;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
  wallet?: Wallet;

  @Prop({ required: true })
  amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
