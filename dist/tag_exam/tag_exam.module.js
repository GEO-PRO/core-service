"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagExamModule = void 0;
const common_1 = require("@nestjs/common");
const tag_exam_controller_1 = require("./tag_exam.controller");
const tag_exam_service_1 = require("./tag_exam.service");
const typeorm_1 = require("@nestjs/typeorm");
const tag_exam_entity_1 = require("../entity/exams/tag_exam.entity");
let TagExamModule = class TagExamModule {
};
TagExamModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tag_exam_entity_1.TagExam])],
        controllers: [tag_exam_controller_1.TagExamController],
        providers: [tag_exam_service_1.TagExamService]
    })
], TagExamModule);
exports.TagExamModule = TagExamModule;
//# sourceMappingURL=tag_exam.module.js.map