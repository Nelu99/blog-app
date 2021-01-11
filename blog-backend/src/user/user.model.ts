import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  photoUrl: { type: String, required: true },
  interests: { type: [String], required: false },
  role : { type: String, required: true, default: "user" }
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  password: string;
  email: string;
  photoUrl: string;
  interests: string[];
  role: string;
}