"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagDocModule = void 0;
const common_1 = require("@nestjs/common");
const tag_doc_controller_1 = require("./tag_doc.controller");
const tag_doc_service_1 = require("./tag_doc.service");
const typeorm_1 = require("@nestjs/typeorm");
const tag_doc_entity_1 = require("../entity/docs/tag_doc.entity");
let TagDocModule = class TagDocModule {
};
TagDocModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tag_doc_entity_1.TagDoc])],
        controllers: [tag_doc_controller_1.TagDocController],
        providers: [tag_doc_service_1.TagDocService]
    })
], TagDocModule);
exports.TagDocModule = TagDocModule;
//# sourceMappingURL=tag_doc.module.js.map