"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsModule = void 0;
const common_1 = require("@nestjs/common");
const docs_controller_1 = require("./docs.controller");
const docs_service_1 = require("./docs.service");
const typeorm_1 = require("@nestjs/typeorm");
const docs_entity_1 = require("../entity/docs/docs.entity");
const link_tag_doc_entity_1 = require("../entity/docs/link_tag_doc.entity");
const tag_doc_entity_1 = require("../entity/docs/tag_doc.entity");
const title_doc_entity_1 = require("../entity/docs/title_doc.entity");
let DocsModule = class DocsModule {
};
DocsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([docs_entity_1.Docs, link_tag_doc_entity_1.LinkTagDoc, tag_doc_entity_1.TagDoc, title_doc_entity_1.TitleDoc, link_tag_doc_entity_1.LinkTagDoc])],
        controllers: [docs_controller_1.DocsController],
        providers: [docs_service_1.DocsService]
    })
], DocsModule);
exports.DocsModule = DocsModule;
//# sourceMappingURL=docs.module.js.map