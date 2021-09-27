import { Document } from 'mongoose';

export interface ProductI extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  createAt?: Date;
}
