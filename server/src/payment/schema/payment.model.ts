import * as mongoose from 'mongoose';
import { PaymentSchema } from './payment.schema';

export interface Payment extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  paymentType: string;
  cardNumber: string;
  cardHolderName: string;
  expirationMonth: number;
  expirationYear: number;
  cvv: string;
  accountNumber: string;
  accountHolderName: string;
  bankName: string;
}

export const PaymentModel = mongoose.model<Payment>('Payment', PaymentSchema);
export { PaymentSchema };
