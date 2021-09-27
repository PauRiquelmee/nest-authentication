import { Document } from 'mongoose';

export interface UserI extends Document {
  _id: string;
  name: string;
  username: string;
  password: string;
  createAt?: Date;
}
