import * as mongoose from 'mongoose';

export const BlogCommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  photoUrl: { type: String, required: false },
})

export interface BlogComment extends mongoose.Document {
 name: string;
 text: string;
 photoUrl: string;
}

export const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageLink: { type: String, required: false },
  content: { type: String, required: true },
  interest: { type: String, required: true },
  writer: { type: String, required: true },
  writerId: { type: String, required: true },
  likes: { type: [String], required: false },
  comments: { type: [[String]], required: false },
  date: { type: String, required: false }
});

export interface Blog extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  content: string;
  interest: string;
  writer: string;
  writerId: string;
  likes : string[];
  comments : string[][];
  date: string
}