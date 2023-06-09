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
exports.TagDocController = void 0;
const common_1 = require("@nestjs/common");
const tag_doc_service_1 = require("./tag_doc.service");
let TagDocController = class TagDocController {
    constructor(TagDocService) {
        this.TagDocService = TagDocService;
    }
    findAll(title_id) {
        return this.TagDocService.getAll(parseInt(title_id));
    }
    findId(id) {
        return this.TagDocService.findIdTagDoc(id);
    }
    async create(createRequest) {
        return this.TagDocService.creatTagDoc(createRequest);
    }
    updateTagDoc(updateRequest) {
        return this.TagDocService.updateTagDoc(updateRequest);
    }
    deleteTagDoc(id) {
        return this.TagDocService.deleteTagDoc(id);
    }
};
__decorate([
    (0, common_1.Get)('get-all'),
    __param(0, (0, common_1.Query)('title_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TagDocController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TagDocController.prototype, "findId", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagDocController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TagDocController.prototype, "updateTagDoc", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TagDocController.prototype, "deleteTagDoc", null);
TagDocController = __decorate([
    (0, common_1.Controller)('tag-doc'),
    __metadata("design:paramtypes", [tag_doc_service_1.TagDocService])
], TagDocController);
exports.TagDocController = TagDocController;
//# sourceMappingURL=tag_doc.controller.js.map