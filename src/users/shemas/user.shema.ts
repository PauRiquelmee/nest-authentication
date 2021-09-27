import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});
