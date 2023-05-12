"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsModule = void 0;
const common_1 = require("@nestjs/common");
const blogs_controller_1 = require("./blogs.controller");
const blogs_service_1 = require("./blogs.service");
const typeorm_1 = require("@nestjs/typeorm");
const blogs_entity_1 = require("../entity/blogs/blogs.entity");
const link_tag_blog_entity_1 = require("../entity/blogs/link_tag_blog.entity");
const link_files_blog_entity_1 = require("../entity/blogs/link_files_blog.entity");
let BlogsModule = class BlogsModule {
};
BlogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([blogs_entity_1.Blogs, link_tag_blog_entity_1.LinkTagBlog, link_files_blog_entity_1.LinkFilesBlog])],
        controllers: [blogs_controller_1.BlogsController],
        providers: [blogs_service_1.BlogsService]
    })
], BlogsModule);
exports.BlogsModule = BlogsModule;
//# sourceMappingURL=blogs.module.js.map