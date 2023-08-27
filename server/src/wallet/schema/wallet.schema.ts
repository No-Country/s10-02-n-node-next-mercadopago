import * as mongoose from 'mongoose';

export const WalletSchema = new mongoose.Schema({
  name: { type: String, default: 'Mercado Pago' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  balance: { type: Number, default: 0 },
});
