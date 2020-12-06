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
    async insertBlog(title, desc, img, content, interest) {
        const newblog = new this.blogModel({
            title,
            description: desc,
            imageLink: img,
            content,
            interest,
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
            date: blog.date,
        }));
    }
    async updateBlog(blogId, title, desc, img, content, interest) {
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