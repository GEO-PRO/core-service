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
exports.TagExamController = void 0;
const common_1 = require("@nestjs/common");
const tag_exam_service_1 = require("./tag_exam.service");
let TagExamController = class TagExamController {
    constructor(TagExamService) {
        this.TagExamService = TagExamService;
    }
    findAll(title_id) {
        return this.TagExamService.getAll(parseInt(title_id));
    }
    findId(id) {
        return this.TagExamService.findIdTagExam(id);
    }
    async create(createRequest) {
        return this.TagExamService.creatTagExam(createRequest);
    }
    updateTagExam(updateRequest) {
        return this.TagExamService.updateTagExam(updateRequest);
    }
    deleteTagExam(id) {
        return this.TagExamService.deleteTagExam(id);
    }
};
__decorate([
    (0, common_1.Get)('get-all'),
    __param(0, (0, common_1.Query)('title_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TagExamController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TagExamController.prototype, "findId", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagExamController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TagExamController.prototype, "updateTagExam", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TagExamController.prototype, "deleteTagExam", null);
TagExamController = __decorate([
    (0, common_1.Controller)('tag-exam'),
    __metadata("design:paramtypes", [tag_exam_service_1.TagExamService])
], TagExamController);
exports.TagExamController = TagExamController;
//# sourceMappingURL=tag_exam.controller.js.map