import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post()
    async addblog(
        @Body('title') blogTitle: string,
        @Body('description') blogDesc: string,
        @Body('imageLink') blogImage: string,
        @Body('content') blogContent: string,
        @Body('interest') blogInterest: string
    ) {
        const blog = await this.blogService.insertBlog(
            blogTitle,
            blogDesc,
            blogImage,
            blogContent,
            blogInterest
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'blog added successfully',
            data: blog,
        };
    }

    @Get()
    async getAllblogs() {
        const blog = await this.blogService.getBlogs();
        return blog;
    }

    @Get(':id')
    getblog(@Param('id') blogId: string) {
        return this.blogService.getSingleBlog(blogId);
    }

    @Patch(':id')
    async updateBlog(
        @Param('id') blogId: string,
        @Body('title') blogTitle: string,
        @Body('description') blogDesc: string,
        @Body('imageLink') blogImage: string,
        @Body('content') blogContent: string,
        @Body('interest') blogInterest: string
    ) {
        const blog = await this.blogService.updateBlog(
            blogId,
            blogTitle,
            blogDesc,
            blogImage,
            blogContent,
            blogInterest
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'blog updated successfully',
            blog: blog,
        };
    }

    @Delete(':id')
    async removeBlog(@Param('id') blogId: string) {
        const isDeleted = await this.blogService.deleteBlog(blogId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'blog deleted successfully',
            };
        }
    }
}
