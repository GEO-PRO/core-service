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
exports.Blogs = void 0;
const typeorm_1 = require("typeorm");
let Blogs = class Blogs {
    formatContent() {
        const content = [this.title, this.summary].join(' ');
        const slug = content
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, '')
            .replace(/\s+/g, ' ');
        this.tsvector_column = slug;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Generated)('increment'),
    __metadata("design:type", Number)
], Blogs.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", String)
], Blogs.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", String)
], Blogs.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", String)
], Blogs.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tsvector', nullable: true }),
    (0, typeorm_1.Index)('tsvector_column_index', { synchronize: false }),
    __metadata("design:type", String)
], Blogs.prototype, "tsvector_column", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Blogs.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Blogs.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    (0, typeorm_1.AfterInsert)(),
    (0, typeorm_1.AfterUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Blogs.prototype, "formatContent", null);
Blogs = __decorate([
    (0, typeorm_1.Entity)()
], Blogs);
exports.Blogs = Blogs;
//# sourceMappingURL=blogs.entity.js.map