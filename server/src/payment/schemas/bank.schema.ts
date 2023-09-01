import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BankDocument = Bank & Document;


@Schema()
export class Bank {
    @Prop({required: true})
    accountNumber: string;

    @Prop({required: true})
    headline: string;

    @Prop({required: true})
    bankName: string;
}

export const BankSchema = SchemaFactory.createForClass(Bank)