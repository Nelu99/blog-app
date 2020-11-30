import * as mongoose from 'mongoose';
export declare const BlogSchema: mongoose.Schema<any>;
export interface Blog extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    imageLink: string;
    content: string;
    interest: string;
}
