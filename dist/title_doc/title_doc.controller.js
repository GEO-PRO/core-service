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
exports.TitleDocController = void 0;
const common_1 = require("@nestjs/common");
const title_doc_service_1 = require("./title_doc.service");
let TitleDocController = class TitleDocController {
    constructor(TitleDocService) {
        this.TitleDocService = TitleDocService;
    }
    findAll() {
        return this.TitleDocService.getAll();
    }
    findId(id) {
        return this.TitleDocService.findIdTitleDoc(id);
    }
    async create(createRequest) {
        return this.TitleDocService.creatTitleDoc(createRequest);
    }
    updateTitleDoc(updateRequest) {
        return this.TitleDocService.updateTitleDoc(updateRequest);
    }
    deleteTitleDoc(id) {
        return this.TitleDocService.deleteTitleDoc(id);
    }
};
__decorate([
    (0, common_1.Get)('get-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TitleDocController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TitleDocController.prototype, "findId", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TitleDocController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TitleDocController.prototype, "updateTitleDoc", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TitleDocController.prototype, "deleteTitleDoc", null);
TitleDocController = __decorate([
    (0, common_1.Controller)('title-doc'),
    __metadata("design:paramtypes", [title_doc_service_1.TitleDocService])
], TitleDocController);
exports.TitleDocController = TitleDocController;
//# sourceMappingURL=title_doc.controller.js.map