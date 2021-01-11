import * as mongoose from 'mongoose';
export declare const BlogCommentSchema: mongoose.Schema<any>;
export interface BlogComment extends mongoose.Document {
    name: string;
    text: string;
    photoUrl: string;
}
export declare const BlogSchema: mongoose.Schema<any>;
export interface Blog extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    imageLink: string;
    content: string;
    interest: string;
    writer: string;
    writerId: string;
    likes: string[];
    comments: string[][];
    date: string;
}
