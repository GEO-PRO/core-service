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
exports.DocsController = void 0;
const common_1 = require("@nestjs/common");
const docs_service_1 = require("./docs.service");
const docs_dto_1 = require("./docs.dto");
let DocsController = class DocsController {
    constructor(DocsService) {
        this.DocsService = DocsService;
    }
    findAll() {
        return this.DocsService.getAll();
    }
    findIdTitle(inputFilter) {
        return this.DocsService.findDocsIdTitle(inputFilter);
    }
    findId(id) {
        return this.DocsService.findIdDocs(id);
    }
    async create(createDocsDto) {
        createDocsDto.id = (await this.DocsService.findLastById()) + 1;
        return this.DocsService.creatDocs(createDocsDto);
    }
    updateTagBlog(updateDocsDto) {
        return this.DocsService.updateDocs(updateDocsDto);
    }
    delete(id) {
        return this.DocsService.deleteDocs(id);
    }
};
__decorate([
    (0, common_1.Get)('get-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('title'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "findIdTitle", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "findId", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [docs_dto_1.DocsDto]),
    __metadata("design:returntype", Promise)
], DocsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [docs_dto_1.DocsDto]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "updateTagBlog", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "delete", null);
DocsController = __decorate([
    (0, common_1.Controller)('docs'),
    __metadata("design:paramtypes", [docs_service_1.DocsService])
], DocsController);
exports.DocsController = DocsController;
//# sourceMappingURL=docs.controller.js.map