"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadfileModule = void 0;
const common_1 = require("@nestjs/common");
const uploadfile_controller_1 = require("./uploadfile.controller");
const uploadfile_service_1 = require("./uploadfile.service");
const typeorm_1 = require("@nestjs/typeorm");
const files_entity_1 = require("../entity/blogs/files.entity");
const link_files_blog_entity_1 = require("../entity/blogs/link_files_blog.entity");
let UploadfileModule = class UploadfileModule {
};
UploadfileModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([files_entity_1.Files, link_files_blog_entity_1.LinkFilesBlog])],
        controllers: [uploadfile_controller_1.FilesController],
        providers: [uploadfile_service_1.UploadfilesService]
    })
], UploadfileModule);
exports.UploadfileModule = UploadfileModule;
//# sourceMappingURL=uploadfile.module.js.map