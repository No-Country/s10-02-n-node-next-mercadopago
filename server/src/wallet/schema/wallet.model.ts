import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { WalletSchema } from './wallet.schema';

@Schema()
export class Wallet extends mongoose.Document {
  @Prop()
  balance: number;

  @Prop()
  status: boolean;

  @Prop({ default: 'Mercado Pago' })
  name: string;

  @Prop({ type: [String], default: [] })
  paymentMethodsCards: string[];

  @Prop({ type: [String], default: [] })
  paymentMethodsBanks: string[];

  @Prop()
  cvu: string;

  @Prop()
  alias: string;
}

export const WalletModel = mongoose.model<Wallet>('Wallet', WalletSchema);
export { WalletSchema };
