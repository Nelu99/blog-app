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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async addblog(blogTitle, blogDesc, blogImage, blogContent, blogInterest, blogWriter, blogWriterId) {
        const blog = await this.blogService.insertBlog(blogTitle, blogDesc, blogImage, blogContent, blogInterest, blogWriter, blogWriterId);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'blog added successfully',
            data: blog,
        };
    }
    async getAllblogs() {
        const blog = await this.blogService.getBlogs();
        return blog;
    }
    async getblog(blogInterest) {
        return this.blogService.getSingleBlog(blogInterest);
    }
    async getBlogsByInterest(blogId) {
        return this.blogService.getBlogsByInterest(blogId);
    }
    async commentBlog(blogId, commentText, commentName, commentPhotoUrl, userId) {
        return await this.blogService.commentBlog(blogId, commentText, commentName, commentPhotoUrl, userId);
    }
    async deleteComment(blogId, commentText, commentName, commentPhotoUrl, userId) {
        return await this.blogService.deleteComment(blogId, commentText, commentName, commentPhotoUrl, userId);
    }
    async likeBlog(blogId, userId) {
        return await this.blogService.likeBlog(blogId, userId);
    }
    async dislikeBlog(blogId, userId) {
        return await this.blogService.dislikeBlog(blogId, userId);
    }
    async updateBlog(blogId, blogTitle, blogDesc, blogImage, blogContent, blogInterest, blogWriterId) {
        const blog = await this.blogService.updateBlog(blogId, blogTitle, blogDesc, blogImage, blogContent, blogInterest, blogWriterId);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'blog updated successfully',
            blog: blog,
        };
    }
    async removeBlog(blogId) {
        const isDeleted = await this.blogService.deleteBlog(blogId);
        if (isDeleted) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'blog deleted successfully',
            };
        }
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('title')),
    __param(1, common_1.Body('description')),
    __param(2, common_1.Body('imageLink')),
    __param(3, common_1.Body('content')),
    __param(4, common_1.Body('interest')),
    __param(5, common_1.Body('writer')),
    __param(6, common_1.Body('writerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "addblog", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAllblogs", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getblog", null);
__decorate([
    common_1.Get('posts/:interest'),
    __param(0, common_1.Param('interest')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBlogsByInterest", null);
__decorate([
    common_1.Patch('comment/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('text')),
    __param(2, common_1.Body('name')),
    __param(3, common_1.Body('photoUrl')),
    __param(4, common_1.Body('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "commentBlog", null);
__decorate([
    common_1.Patch('comment/delete/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('text')),
    __param(2, common_1.Body('name')),
    __param(3, common_1.Body('photoUrl')),
    __param(4, common_1.Body('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteComment", null);
__decorate([
    common_1.Patch('like/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "likeBlog", null);
__decorate([
    common_1.Patch('dislike/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "dislikeBlog", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('title')),
    __param(2, common_1.Body('description')),
    __param(3, common_1.Body('imageLink')),
    __param(4, common_1.Body('content')),
    __param(5, common_1.Body('interest')),
    __param(6, common_1.Body('writerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updateBlog", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "removeBlog", null);
BlogController = __decorate([
    common_1.Controller('blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map