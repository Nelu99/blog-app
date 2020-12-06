import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageLink: { type: String, required: false },
  content: { type: String, required: true },
  interest: { type: String, required: true },
  date: { type: String, required: false }
});

export interface Blog extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  content: string;
  interest: string;
  date: string
}