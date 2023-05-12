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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkTagBlog = void 0;
const typeorm_1 = require("typeorm");
let LinkTagBlog = class LinkTagBlog {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Generated)('increment'),
    __metadata("design:type", Number)
], LinkTagBlog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], LinkTagBlog.prototype, "tag_blog_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], LinkTagBlog.prototype, "blog_id", void 0);
LinkTagBlog = __decorate([
    (0, typeorm_1.Entity)()
], LinkTagBlog);
exports.LinkTagBlog = LinkTagBlog;
//# sourceMappingURL=link_tag_blog.entity.js.map