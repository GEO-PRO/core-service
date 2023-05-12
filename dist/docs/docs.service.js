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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const docs_entity_1 = require("../entity/docs/docs.entity");
const link_tag_doc_entity_1 = require("../entity/docs/link_tag_doc.entity");
const tag_doc_entity_1 = require("../entity/docs/tag_doc.entity");
const title_doc_entity_1 = require("../entity/docs/title_doc.entity");
const typeorm_2 = require("typeorm");
let DocsService = class DocsService {
    constructor(DocsRepository, TagDocRepository, LinkTagDocRepository, TitleDocRepository) {
        this.DocsRepository = DocsRepository;
        this.TagDocRepository = TagDocRepository;
        this.LinkTagDocRepository = LinkTagDocRepository;
        this.TitleDocRepository = TitleDocRepository;
    }
    async getAll() {
        const query = this.DocsRepository.createQueryBuilder('docs')
            .select('docs.*')
            .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(DISTINCT tag.id::text, \', \')', 'link_tag_doc')
            .addSelect('title.name', 'title_name')
            .leftJoin('link_tag_doc', 'link_tag', 'link_tag.doc_id = docs.id')
            .leftJoin('tag_doc', 'tag', 'link_tag.tag_doc_id = tag.id')
            .leftJoin('title_doc', 'title', 'title.id = docs.title_doc_id')
            .groupBy('docs.id')
            .addGroupBy('title.name');
        return await query.getRawMany();
    }
    async findIdDocs(idFind) {
        const query = this.DocsRepository.createQueryBuilder('docs')
            .select('docs.*')
            .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(DISTINCT tag.id::text, \', \')', 'link_tag_doc')
            .addSelect('title.name', 'title_name')
            .addSelect('files.name', 'image_name')
            .leftJoin('link_tag_doc', 'link_tag', 'link_tag.doc_id = docs.id')
            .leftJoin('tag_doc', 'tag', 'link_tag.tag_doc_id = tag.id')
            .leftJoin('title_doc', 'title', 'title.id = docs.title_doc_id')
            .leftJoin('files', 'files', 'files.id = docs.image_id')
            .where('docs.id = :id', { id: idFind })
            .groupBy('docs.id')
            .addGroupBy('title.name')
            .addGroupBy('files.name');
        return await query.getRawMany();
    }
    async findLastById() {
        const lastID = await this.DocsRepository.find({
            order: {
                id: 'DESC',
            },
            take: 1,
        });
        try {
            return lastID[0].id;
        }
        catch (error) {
            return 0;
        }
    }
    async creatDocs(createDocsDto) {
        try {
            createDocsDto.link_tag_doc.forEach((value) => {
                const newLinkTagDoc = this.LinkTagDocRepository.create({
                    doc_id: createDocsDto.id,
                    tag_doc_id: value
                });
                this.LinkTagDocRepository.save(newLinkTagDoc);
            });
            const newDocs = this.DocsRepository.create(Object.assign(Object.assign({}, createDocsDto), { created_at: new Date(), update_at: new Date() }));
            this.DocsRepository.save(newDocs);
            return "true";
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async updateDocs(updateDocs) {
        try {
            await this.LinkTagDocRepository.delete({ doc_id: updateDocs.id });
            await updateDocs.link_tag_doc.forEach((value) => {
                const newLinkTagDoc = this.LinkTagDocRepository.create({
                    doc_id: updateDocs.id,
                    tag_doc_id: value
                });
                this.LinkTagDocRepository.save(newLinkTagDoc);
            });
            const newData = Object.assign({}, updateDocs);
            const { link_tag_doc } = newData, dataUpdate = __rest(newData, ["link_tag_doc"]);
            await this.DocsRepository.update(updateDocs.id, dataUpdate);
            return await this.DocsRepository.findOne({
                where: {
                    id: updateDocs.id,
                },
            });
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async deleteDocs(idDelete) {
        try {
            await this.LinkTagDocRepository.delete({ doc_id: idDelete.id });
            await this.DocsRepository.delete(idDelete);
            return idDelete.id;
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async findDocsIdTitle(inputFilter) {
        const page = inputFilter.page;
        const limit = 10;
        const skip = (page - 1) * limit;
        try {
            const query = await this.DocsRepository.createQueryBuilder('docs')
                .select('docs.*')
                .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
                .leftJoin('link_tag_doc', 'link_tag', 'link_tag.doc_id = docs.id')
                .leftJoin('tag_doc', 'tag', 'tag.id = link_tag.tag_doc_id')
                .where('docs.title_doc_id = :title_doc_id', { title_doc_id: inputFilter.title_id })
                .groupBy('docs.id');
            if (inputFilter.tag_id.length > 0) {
                query.andWhere('link_tag.tag_doc_id IN (:...ids)', { ids: inputFilter.tag_id });
            }
            if (inputFilter.search_key) {
                query.where('to_tsvector(unaccent(docs.name)) @@ to_tsquery(:keyword)', { keyword: inputFilter.search_key });
            }
            const getTotalData = await query.getCount();
            const totalPages = Math.ceil(getTotalData / limit);
            const result = await query.offset(skip).limit(limit).getRawMany();
            return {
                pageIn: page,
                totalPages: totalPages,
                totalData: getTotalData,
                result: result
            };
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
};
DocsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(docs_entity_1.Docs)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_doc_entity_1.TagDoc)),
    __param(2, (0, typeorm_1.InjectRepository)(link_tag_doc_entity_1.LinkTagDoc)),
    __param(3, (0, typeorm_1.InjectRepository)(title_doc_entity_1.TitleDoc)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DocsService);
exports.DocsService = DocsService;
//# sourceMappingURL=docs.service.js.map