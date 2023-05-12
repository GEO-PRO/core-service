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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const moment = require("moment");
const uploadfile_service_1 = require("./uploadfile.service");
let FilesController = class FilesController {
    constructor(UploadfilesService) {
        this.UploadfilesService = UploadfilesService;
    }
    async uploadFileUiWeb(file) {
        return this.UploadfilesService.creatFiles({ name: file.filename });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './src/uploadfile/images-service/images',
            filename: (req, file, cb) => {
                const now = moment();
                const formattedTime = moment(now).format('DD-MM-YYYY');
                const nameSave = formattedTime + file.originalname;
                cb(null, nameSave);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFileUiWeb", null);
FilesController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [uploadfile_service_1.UploadfilesService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=uploadfile.controller.js.map