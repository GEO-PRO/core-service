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
exports.TitleDocService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const title_doc_entity_1 = require("../entity/docs/title_doc.entity");
const typeorm_2 = require("typeorm");
let TitleDocService = class TitleDocService {
    constructor(TitleDocRepository) {
        this.TitleDocRepository = TitleDocRepository;
    }
    getAll() {
        return this.TitleDocRepository.find();
    }
    creatTitleDoc(createRequest) {
        try {
            const newTitleDoc = this.TitleDocRepository.create(Object.assign(Object.assign({}, createRequest), { created_at: new Date(), update_at: new Date() }));
            return this.TitleDocRepository.save(newTitleDoc);
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async updateTitleDoc(updateTitleDoc) {
        try {
            await this.TitleDocRepository.update(updateTitleDoc.id, Object.assign(Object.assign({}, updateTitleDoc), { update_at: new Date() }));
            return await this.TitleDocRepository.findOne({
                where: {
                    id: updateTitleDoc.id,
                },
            });
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    findIdTitleDoc(id) {
        return this.TitleDocRepository.findOne({
            where: {
                id: id,
            },
        });
    }
    deleteTitleDoc(id) {
        try {
            this.TitleDocRepository.delete(id);
            return id;
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
};
TitleDocService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(title_doc_entity_1.TitleDoc)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TitleDocService);
exports.TitleDocService = TitleDocService;
//# sourceMappingURL=title_doc.service.js.map