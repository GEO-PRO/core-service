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
exports.TagBlogController = void 0;
const common_1 = require("@nestjs/common");
const tag_blog_dto_1 = require("./tag_blog.dto");
const tag_blog_service_1 = require("./tag_blog.service");
let TagBlogController = class TagBlogController {
    constructor(TagBlogService) {
        this.TagBlogService = TagBlogService;
    }
    findAll() {
        return this.TagBlogService.getAll();
    }
    findId(id) {
        return this.TagBlogService.findIdTagBlog(id);
    }
    async create(createTagBlogDto) {
        return this.TagBlogService.creatTagBlog(createTagBlogDto);
    }
    updateTagBlog(updateTagBlogDto) {
        return this.TagBlogService.updateTagBlog(updateTagBlogDto);
    }
    deleteTagBlog(id) {
        return this.TagBlogService.deleteTagBlog(id);
    }
};
__decorate([
    (0, common_1.Get)('get-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TagBlogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TagBlogController.prototype, "findId", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_blog_dto_1.TagBlogDto]),
    __metadata("design:returntype", Promise)
], TagBlogController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tag_blog_dto_1.TagBlogDto]),
    __metadata("design:returntype", void 0)
], TagBlogController.prototype, "updateTagBlog", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TagBlogController.prototype, "deleteTagBlog", null);
TagBlogController = __decorate([
    (0, common_1.Controller)('tag-blog'),
    __metadata("design:paramtypes", [tag_blog_service_1.TagBlogService])
], TagBlogController);
exports.TagBlogController = TagBlogController;
//# sourceMappingURL=tag_blog.controller.js.map