import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { userInfo } from 'os';
import { Blog } from './blog.model'

@Injectable()
export class BlogService {
    constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) { }

    async insertBlog(title: string, desc: string, img: string, content: string, interest: string, writer: string, writerId: string) {
        const newblog = new this.blogModel({
            title,
            description: desc,
            imageLink: img,
            content,
            interest,
            writer: writer,
            writerId: writerId,
            comments: [],
            likes: [],
            date: new Date().toLocaleString()
        });
        const result = await newblog.save();
        return result;
    }

    async getBlogs() {
        const blogs = await this.blogModel.find().exec();
        return blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            description: blog.description,
            imageLink: blog.imageLink,
            content: blog.content,
            interest: blog.interest,
            writer: blog.writer,
            writerId: blog.writerId,
            comments: blog.comments,
            likes: blog.likes,
            date: blog.date,
        }));
    }

    async getSingleBlog(blogId: string) {
        const blog = await this.findBlog(blogId);
        return {
            id: blog.id,
            title: blog.title,
            description: blog.description,
            imageLink: blog.imageLink,
            content: blog.content,
            interest: blog.interest,
            writer: blog.writer,
            writerId: blog.writerId,
            comments: blog.comments,
            likes: blog.likes,
            date: blog.date,
        };
    }

    async getBlogsByInterest(blogInterest: string) {
        const regex = new RegExp(blogInterest, 'i')
        const blogs = await this.blogModel.find({ interest: { $regex: regex } }).exec();
        return blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            description: blog.description,
            imageLink: blog.imageLink,
            content: blog.content,
            interest: blog.interest,
            writer: blog.writer,
            writerId: blog.writerId,
            comments: blog.comments,
            likes: blog.likes,
            date: blog.date,
        }));
    }

    async updateBlog(blogId: string, title: string, desc: string, img: string, content: string, interest: string, writerId: string) {
        const updatedblog = await this.findBlog(blogId);
        if (updatedblog.writerId !== writerId) {
            throw new HttpException('User Id does not match that of the writer.', HttpStatus.FORBIDDEN);
        }

        if (title) {
            updatedblog.title = title;
        }
        if (desc) {
            updatedblog.description = desc;
        }
        if (img) {
            updatedblog.imageLink = img;
        }
        if (content) {
            updatedblog.content = content;
        }
        if (interest) {
            updatedblog.interest = interest;
        }
        updatedblog.save();
        return updatedblog;
    }

    async likeBlog(blogId: string, userId: string) {
        const updatedblog = await this.findBlog(blogId);
        if (!updatedblog.likes.includes(userId)) {
            updatedblog.likes.push(userId);
        }
        updatedblog.save();

        return {
            id: updatedblog.id,
            title: updatedblog.title,
            description: updatedblog.description,
            imageLink: updatedblog.imageLink,
            content: updatedblog.content,
            interest: updatedblog.interest,
            writer: updatedblog.writer,
            writerId: updatedblog.writerId,
            likes: updatedblog.likes,
            comments: updatedblog.comments,
            date: updatedblog.date,
        };
    }

    async dislikeBlog(blogId: string, userId: string) {
        const updatedblog = await this.findBlog(blogId);
        if (updatedblog.likes.includes(userId)) {
            updatedblog.likes.forEach((item, index) => {
                if (item === userId.toString()) updatedblog.likes.splice(index, 1);
            });
        }
        updatedblog.save();

        return {
            id: updatedblog.id,
            title: updatedblog.title,
            description: updatedblog.description,
            imageLink: updatedblog.imageLink,
            content: updatedblog.content,
            interest: updatedblog.interest,
            writer: updatedblog.writer,
            writerId: updatedblog.writerId,
            comments: updatedblog.comments,
            likes: updatedblog.likes,
            date: updatedblog.date,
        };
    }

    async commentBlog(blogId: string, commentText: string, commentName: string, commentPhotoUrl: string) {
        const updatedblog = await this.findBlog(blogId);
        const newComment = [commentName, commentText, commentPhotoUrl];
        updatedblog.comments.forEach((item, index) => {
            if (item[0] === commentName && item[1] === commentText && item[2] === commentPhotoUrl) {
                throw new HttpException('You cannot post the same comment twice.', HttpStatus.FORBIDDEN);
            };
        });
        updatedblog.comments.push(newComment);
        updatedblog.save();

        return {
            id: updatedblog.id,
            title: updatedblog.title,
            description: updatedblog.description,
            imageLink: updatedblog.imageLink,
            content: updatedblog.content,
            interest: updatedblog.interest,
            writer: updatedblog.writer,
            writerId: updatedblog.writerId,
            comments: updatedblog.comments,
            likes: updatedblog.likes,
            date: updatedblog.date,
        };
    }

    async deleteComment(blogId: string, commentText: string, commentName: string, commentPhotoUrl: string) {
        const updatedblog = await this.findBlog(blogId);

        updatedblog.comments.forEach((item, index) => {
            if (item[0] === commentName && item[1] === commentText && item[2] === commentPhotoUrl) updatedblog.comments.splice(index, 1);
        });
        updatedblog.save();

        return {
            id: updatedblog.id,
            title: updatedblog.title,
            description: updatedblog.description,
            imageLink: updatedblog.imageLink,
            content: updatedblog.content,
            interest: updatedblog.interest,
            writer: updatedblog.writer,
            writerId: updatedblog.writerId,
            comments: updatedblog.comments,
            likes: updatedblog.likes,
            date: updatedblog.date,
        };
    }

    async deleteBlog(blogId: string) {
        const result = await this.blogModel.deleteOne({ _id: blogId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find blog.');
        }
        return true;
    }

    private async findBlog(id: string): Promise<Blog> {
        let blog: Blog;
        try {
            blog = await this.blogModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find blog.');
        }
        if (!blog) {
            throw new NotFoundException('Could not find blog.');
        }
        return blog;
    }
}
