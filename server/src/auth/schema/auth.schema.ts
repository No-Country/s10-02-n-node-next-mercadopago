import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CardSchema } from 'src/users/schemas/card.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  _id?: string;

  @Prop()
  name: string;

  @Prop({ unique: [true, 'Email ya registrado en la base de datos'] })
  email: string;

  @Prop({ trim: true })
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  wallet: string;
  
  // card 
  @Prop([CardSchema])
  cards: string[]; 

  @Prop({ type: [String], default: ['user'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
