"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagBlogModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const time_now_service_1 = require("../component-service/time_now.service");
const tag_blog_entity_1 = require("../entity/blogs/tag_blog.entity");
const tag_blog_controller_1 = require("./tag_blog.controller");
const tag_blog_service_1 = require("./tag_blog.service");
let TagBlogModule = class TagBlogModule {
};
TagBlogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tag_blog_entity_1.TagBlog])],
        controllers: [tag_blog_controller_1.TagBlogController],
        providers: [tag_blog_service_1.TagBlogService, time_now_service_1.TimeNow]
    })
], TagBlogModule);
exports.TagBlogModule = TagBlogModule;
//# sourceMappingURL=tag_blog.module.js.map