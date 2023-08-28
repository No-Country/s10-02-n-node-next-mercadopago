import * as mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paymentType: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cardHolderName: { type: String, required: true },
  expirationMonth: { type: Number, required: true },
  expirationYear: { type: Number, required: true },
  cvv: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountHolderName: { type: String, required: true },
  bankName: { type: String, required: true },
});
