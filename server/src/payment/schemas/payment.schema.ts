import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Card } from "./card.schemas";
import { Bank } from "./bank.schema";

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({ required: true })
  paymentType: string;

  @Prop({ type: Card })
  card?: Card;
    
  @Prop({ type: Bank })
  bankAccount?: Bank;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)