import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop({ required: true })
  cardNumber: string;

  @Prop({ required: true })
  headline: string;

  @Prop({ required: true })
  expiration: number;

  @Prop({ required: true })
  cvv: string;
}


export const CardSchema = SchemaFactory.createForClass(Card);