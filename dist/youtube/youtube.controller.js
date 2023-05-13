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
exports.YoutubeController = void 0;
const common_1 = require("@nestjs/common");
const youtube_service_1 = require("./youtube.service");
const youtube_dto_1 = require("./youtube.dto");
let YoutubeController = class YoutubeController {
    constructor(YoutubeService) {
        this.YoutubeService = YoutubeService;
    }
    findAll() {
        return this.YoutubeService.getAll();
    }
    findId(id) {
        return this.YoutubeService.findIdYoutube(id);
    }
    async create(createYoutubeDto) {
        createYoutubeDto.id = (await this.YoutubeService.findLastById()) + 1;
        return this.YoutubeService.creatYoutube(createYoutubeDto);
    }
    updateTagBlog(updateYoutubeDto) {
        return this.YoutubeService.updateYoutube(updateYoutubeDto);
    }
    delete(id) {
        return this.YoutubeService.deleteYoutube(id);
    }
};
__decorate([
    (0, common_1.Get)('get-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], YoutubeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], YoutubeController.prototype, "findId", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [youtube_dto_1.YoutubeDto]),
    __metadata("design:returntype", Promise)
], YoutubeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [youtube_dto_1.YoutubeDto]),
    __metadata("design:returntype", void 0)
], YoutubeController.prototype, "updateTagBlog", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], YoutubeController.prototype, "delete", null);
YoutubeController = __decorate([
    (0, common_1.Controller)('youtube'),
    __metadata("design:paramtypes", [youtube_service_1.YoutubeService])
], YoutubeController);
exports.YoutubeController = YoutubeController;
//# sourceMappingURL=youtube.controller.js.map