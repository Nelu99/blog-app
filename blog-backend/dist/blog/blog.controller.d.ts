import { HttpStatus } from '@nestjs/common';
import { BlogService } from './blog.service';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    addblog(blogTitle: string, blogDesc: string, blogImage: string, blogContent: string, blogInterest: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./blog.model").Blog;
    }>;
    getAllblogs(): Promise<{
        id: string;
        title: string;
        description: string;
        imageLink: string;
        content: string;
        interest: string;
    }[]>;
    getblog(blogInterest: string): Promise<{
        id: string;
        title: string;
        description: string;
        imageLink: string;
        content: string;
        interest: string;
    }>;
    getBlogsByInterest(blogId: string): Promise<{
        id: string;
        title: string;
        description: string;
        imageLink: string;
        content: string;
        interest: string;
    }[]>;
    updateBlog(blogId: string, blogTitle: string, blogDesc: string, blogImage: string, blogContent: string, blogInterest: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        blog: import("./blog.model").Blog;
    }>;
    removeBlog(blogId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
