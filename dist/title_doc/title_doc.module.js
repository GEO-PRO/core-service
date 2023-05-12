"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitleDocModule = void 0;
const common_1 = require("@nestjs/common");
const title_doc_service_1 = require("./title_doc.service");
const title_doc_controller_1 = require("./title_doc.controller");
const typeorm_1 = require("@nestjs/typeorm");
const title_doc_entity_1 = require("../entity/docs/title_doc.entity");
let TitleDocModule = class TitleDocModule {
};
TitleDocModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([title_doc_entity_1.TitleDoc])],
        providers: [title_doc_service_1.TitleDocService],
        controllers: [title_doc_controller_1.TitleDocController]
    })
], TitleDocModule);
exports.TitleDocModule = TitleDocModule;
//# sourceMappingURL=title_doc.module.js.map