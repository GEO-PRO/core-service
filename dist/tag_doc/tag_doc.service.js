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
exports.TagDocService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tag_doc_entity_1 = require("../entity/docs/tag_doc.entity");
const typeorm_2 = require("typeorm");
let TagDocService = class TagDocService {
    constructor(TagDocRepository) {
        this.TagDocRepository = TagDocRepository;
    }
    getAll(title_id) {
        const query = this.TagDocRepository.createQueryBuilder('tag_doc')
            .select('tag_doc.*')
            .addSelect('count(tag_doc.id)', 'count')
            .leftJoin('link_tag_doc', 'link_tag', 'link_tag.tag_doc_id = tag_doc.id')
            .leftJoin('docs', 'docs', 'link_tag.doc_id = docs.id')
            .groupBy('tag_doc.id');
        if (title_id) {
            query.where('docs.title_doc_id = :title_doc_id', { title_doc_id: title_id });
        }
        return query.getRawMany();
    }
    creatTagDoc(createRequest) {
        try {
            const newTagDoc = this.TagDocRepository.create(Object.assign(Object.assign({}, createRequest), { created_at: new Date(), update_at: new Date() }));
            return this.TagDocRepository.save(newTagDoc);
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async updateTagDoc(updateTagDoc) {
        try {
            await this.TagDocRepository.update(updateTagDoc.id, Object.assign(Object.assign({}, updateTagDoc), { update_at: new Date() }));
            return await this.TagDocRepository.findOne({
                where: {
                    id: updateTagDoc.id,
                },
            });
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    findIdTagDoc(id) {
        return this.TagDocRepository.findOne({
            where: {
                id: id,
            },
        });
    }
    deleteTagDoc(id) {
        try {
            this.TagDocRepository.delete(id);
            return id;
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
};
TagDocService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tag_doc_entity_1.TagDoc)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TagDocService);
exports.TagDocService = TagDocService;
//# sourceMappingURL=tag_doc.service.js.map