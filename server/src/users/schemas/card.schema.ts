import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
    @Prop()
    number: String 

    @Prop()
    expiration: String 

    @Prop()
    cvv: Number 

    @Prop()
    headline: String 
}

export const CardSchema = SchemaFactory.createForClass(Card);
 