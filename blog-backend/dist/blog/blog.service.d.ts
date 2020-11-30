import { Model } from 'mongoose';
import { Blog } from './blog.model';
export declare class BlogService {
    private readonly blogModel;
    constructor(blogModel: Model<Blog>);
    insertBlog(title: string, desc: string, img: string, content: string, interest: string): Promise<Blog>;
    getBlogs(): Promise<{
        id: string;
        title: string;
        description: string;
    }[]>;
    getSingleBlog(blogId: string): Promise<{
        id: string;
        title: string;
        description: string;
    }>;
    updateBlog(blogId: string, title: string, desc: string, img: string, content: string, interest: string): Promise<Blog>;
    deleteBlog(blogId: string): Promise<boolean>;
    private findBlog;
}
