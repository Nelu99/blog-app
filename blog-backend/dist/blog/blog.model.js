"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogSchema = void 0;
const mongoose = require("mongoose");
exports.BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageLink: { type: String, required: false },
    content: { type: String, required: true },
    interest: { type: String, required: true },
    date: { type: String, required: false }
});
//# sourceMappingURL=blog.model.js.map