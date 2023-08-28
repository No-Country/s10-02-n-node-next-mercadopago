import * as mongoose from 'mongoose';
import { UserSchema } from './auth.schema';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  wallet: string;
  roles: string[];
}

export const UserModel = mongoose.model<User>('User', UserSchema);

export { UserSchema };
