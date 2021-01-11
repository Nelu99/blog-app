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
        @Body('interest') blogInterest: string,
        @Body('writer') blogWriter: string,
        @Body('writerId') blogWriterId: string
    ) {
        const blog = await this.blogService.insertBlog(
            blogTitle,
            blogDesc,
            blogImage,
            blogContent,
            blogInterest,
            blogWriter,
            blogWriterId
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
    async getblog(@Param('id') blogInterest: string) {
        return this.blogService.getSingleBlog(blogInterest);
    }

    @Get('posts/:interest')
    async getBlogsByInterest(@Param('interest') blogId: string) {
        return this.blogService.getBlogsByInterest(blogId);
    }

    @Patch('comment/:id')
    async commentBlog(
        @Param('id') blogId: string,
        @Body('text') commentText: string,
        @Body('name') commentName: string,
        @Body('photoUrl') commentPhotoUrl: string,
    ) {
        return await this.blogService.commentBlog(
            blogId,
            commentText,
            commentName,
            commentPhotoUrl
        );
    }

    @Patch('comment/delete/:id')
    async deleteComment(
        @Param('id') blogId: string,
        @Body('text') commentText: string,
        @Body('name') commentName: string,
        @Body('photoUrl') commentPhotoUrl: string,
    ) {
        return await this.blogService.deleteComment(
            blogId,
            commentText,
            commentName,
            commentPhotoUrl
        );
    }

    @Patch('like/:id')
    async likeBlog(
        @Param('id') blogId: string,
        @Body('userId') userId: string
    ) {
        return await this.blogService.likeBlog(
            blogId,
            userId
        );
    }
    
    @Patch('dislike/:id')
    async dislikeBlog(
        @Param('id') blogId: string,
        @Body('userId') userId: string
    ) {
        return await this.blogService.dislikeBlog(
            blogId,
            userId
        );
    }

    @Patch(':id')
    async updateBlog(
        @Param('id') blogId: string,
        @Body('title') blogTitle: string,
        @Body('description') blogDesc: string,
        @Body('imageLink') blogImage: string,
        @Body('content') blogContent: string,
        @Body('interest') blogInterest: string,
        @Body('writerId') blogWriterId: string
    ) {
        const blog = await this.blogService.updateBlog(
            blogId,
            blogTitle,
            blogDesc,
            blogImage,
            blogContent,
            blogInterest,
            blogWriterId
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
