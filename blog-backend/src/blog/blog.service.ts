import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { Blog } from './blog.model'

@Injectable()
export class BlogService {
    constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) { }

    async insertBlog(title: string, desc: string, img: string, content: string, interest: string) {
        const date: Date = new Date();
        const newblog = new this.blogModel({
            title,
            description: desc,
            imageLink: img,
            content,
            interest,
            date: date.toDateString()
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
            date: blog.date,
        };
    }

    async getBlogsByInterest(blogInterest: string) {
        const regex = new RegExp(blogInterest, 'i')
        const blogs = await this.blogModel.find({interest: {$regex: regex}}).exec();
        return blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            description: blog.description,
            imageLink: blog.imageLink,
            content: blog.content,
            interest: blog.interest,
            date: blog.date,
        }));
    }

    async updateBlog(blogId: string, title: string, desc: string, img: string, content: string, interest: string) {
        const updatedblog = await this.findBlog(blogId);
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
