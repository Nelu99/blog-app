import { HttpStatus } from '@nestjs/common';
import { BlogService } from './blog.service';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    addblog(blogTitle: string, blogDesc: string, blogImage: string, blogContent: string, blogInterest: string, blogWriter: string, blogWriterId: string): Promise<{
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
        writer: string;
        writerId: string;
        comments: string[][];
        likes: string[];
        date: string;
    }[]>;
    getblog(blogInterest: string): Promise<{
        id: string;
        title: string;
        description: string;
        imageLink: string;
        content: string;
        interest: string;
        writer: string;
        writerId: string;
        comments: string[][];
        likes: string[];
        date: string;
    }>;
    getBlogsByInterest(blogId: string): Promise<{
        id: string;
        title: string;
        description: string;
        imageLink: string;
        content: string;
        interest: string;
        writer: string;
        writerId: string;
        comments: string[][];
        likes: string[];
        date: string;
    }[]>;
    commentBlog(blogId: string, commentText: string, commentName: string, commentPhotoUrl: string, userId: string): Promise<{
        id: string;
        title: string;
        description: string;
        imageLink: string;
        content: string;
        interest: string;
        writer: string;
        writerId: string;
        comments: string[][];
        likes: string[];
        date: string;
    }>;
    deleteComment(blogId: string, commentText: string, commentName: string, commentPhotoUrl: string, userId: string): Promise<{
        id: string;
        title: string;
        description: string;
        imageLink: string;
        content: string;
        interest: string;
        writer: string;
        writerId: string;
        comments: string[][];
        likes: string[];
        date: string;
    }>;
    likeBlog(blogId: string, userId: string): Promise<{
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
    }>;
    dislikeBlog(blogId: string, userId: string): Promise<{
        id: string;
        title: string;
        description: string;
        imageLink: string;
        content: string;
        interest: string;
        writer: string;
        writerId: string;
        comments: string[][];
        likes: string[];
        date: string;
    }>;
    updateBlog(blogId: string, blogTitle: string, blogDesc: string, blogImage: string, blogContent: string, blogInterest: string, blogWriterId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        blog: import("./blog.model").Blog;
    }>;
    removeBlog(blogId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
