import { User } from '../schema/auth.model';

export interface LoginResponse {
  user: User;
  token: string;
}
