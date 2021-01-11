"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogSchema = exports.BlogCommentSchema = void 0;
const mongoose = require("mongoose");
exports.BlogCommentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    text: { type: String, required: true },
    photoUrl: { type: String, required: false },
});
exports.BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageLink: { type: String, required: false },
    content: { type: String, required: true },
    interest: { type: String, required: true },
    writer: { type: String, required: true },
    writerId: { type: String, required: true },
    likes: { type: [String], required: false },
    comments: { type: [[String]], required: false },
    date: { type: String, required: false }
});
//# sourceMappingURL=blog.model.js.map