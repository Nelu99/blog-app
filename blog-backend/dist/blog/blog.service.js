"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_decorators_1 = require("@nestjs/mongoose/dist/common/mongoose.decorators");
const mongoose_1 = require("mongoose");
let BlogService = class BlogService {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async insertBlog(title, desc, img, content, interest, writer, writerId) {
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
    async getSingleBlog(blogId) {
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
    async getBlogsByInterest(blogInterest) {
        const regex = new RegExp(blogInterest, 'i');
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
    async updateBlog(blogId, title, desc, img, content, interest, writerId) {
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
    async likeBlog(blogId, userId) {
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
    async dislikeBlog(blogId, userId) {
        const updatedblog = await this.findBlog(blogId);
        if (updatedblog.likes.includes(userId)) {
            updatedblog.likes.forEach((item, index) => {
                if (item === userId.toString())
                    updatedblog.likes.splice(index, 1);
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
    async commentBlog(blogId, commentText, commentName, commentPhotoUrl, userId) {
        const updatedblog = await this.findBlog(blogId);
        const newComment = [commentName, commentText, commentPhotoUrl, userId];
        updatedblog.comments.forEach((item, index) => {
            if (item[0] === commentName && item[1] === commentText && item[2] === commentPhotoUrl) {
                throw new common_1.HttpException('You cannot post the same comment twice.', common_1.HttpStatus.FORBIDDEN);
            }
            ;
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
    async deleteComment(blogId, commentText, commentName, commentPhotoUrl, userId) {
        const updatedblog = await this.findBlog(blogId);
        updatedblog.comments.forEach((item, index) => {
            if (item[0] === commentName && item[1] === commentText && item[2] === commentPhotoUrl)
                updatedblog.comments.splice(index, 1);
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
    async deleteBlog(blogId) {
        const result = await this.blogModel.deleteOne({ _id: blogId }).exec();
        if (result.n === 0) {
            throw new common_1.NotFoundException('Could not find blog.');
        }
        return true;
    }
    async findBlog(id) {
        let blog;
        try {
            blog = await this.blogModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find blog.');
        }
        if (!blog) {
            throw new common_1.NotFoundException('Could not find blog.');
        }
        return blog;
    }
};
BlogService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_decorators_1.InjectModel('Blog')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map