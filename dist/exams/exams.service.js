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
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exams_entity_1 = require("../entity/exams/exams.entity");
const link_tag_exam_entity_1 = require("../entity/exams/link_tag_exam.entity");
const tag_exam_entity_1 = require("../entity/exams/tag_exam.entity");
const title_exam_entity_1 = require("../entity/exams/title_exam.entity");
const typeorm_2 = require("typeorm");
let ExamsService = class ExamsService {
    constructor(ExamsRepository, TagExamRepository, LinkTagExamRepository, TitleExamRepository) {
        this.ExamsRepository = ExamsRepository;
        this.TagExamRepository = TagExamRepository;
        this.LinkTagExamRepository = LinkTagExamRepository;
        this.TitleExamRepository = TitleExamRepository;
    }
    async getAll() {
        const query = this.ExamsRepository.createQueryBuilder('exams')
            .select('exams.*')
            .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(DISTINCT tag.id::text, \', \')', 'link_tag_exam')
            .addSelect('title.name', 'title_name')
            .leftJoin('link_tag_exam', 'link_tag', 'link_tag.exam_id = exams.id')
            .leftJoin('tag_exam', 'tag', 'link_tag.tag_exam_id = tag.id')
            .leftJoin('title_exam', 'title', 'title.id = exams.title_exam_id')
            .groupBy('exams.id')
            .addGroupBy('title.name');
        return await query.getRawMany();
    }
    async findIdExams(idFind) {
        const query = this.ExamsRepository.createQueryBuilder('exams')
            .select('exams.*')
            .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(DISTINCT tag.id::text, \', \')', 'link_tag_exam')
            .addSelect('title.name', 'title_name')
            .addSelect('files.name', 'image_name')
            .leftJoin('link_tag_exam', 'link_tag', 'link_tag.exam_id = exams.id')
            .leftJoin('tag_exam', 'tag', 'link_tag.tag_exam_id = tag.id')
            .leftJoin('title_exam', 'title', 'title.id = exams.title_exam_id')
            .leftJoin('files', 'files', 'files.id = exams.image_id')
            .where('exams.id = :id', { id: idFind })
            .groupBy('exams.id')
            .addGroupBy('title.name')
            .addGroupBy('files.name');
        return await query.getRawMany();
    }
    async findLastById() {
        const lastID = await this.ExamsRepository.find({
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
    async creatExams(createExamsDto) {
        try {
            createExamsDto.link_tag_exam.forEach((value) => {
                const newLinkTagExam = this.LinkTagExamRepository.create({
                    exam_id: createExamsDto.id,
                    tag_exam_id: value
                });
                this.LinkTagExamRepository.save(newLinkTagExam);
            });
            const newExams = this.ExamsRepository.create(Object.assign(Object.assign({}, createExamsDto), { created_at: new Date(), update_at: new Date() }));
            this.ExamsRepository.save(newExams);
            return "true";
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async updateExams(updateExams) {
        try {
            await this.LinkTagExamRepository.delete({ exam_id: updateExams.id });
            await updateExams.link_tag_exam.forEach((value) => {
                const newLinkTagExam = this.LinkTagExamRepository.create({
                    exam_id: updateExams.id,
                    tag_exam_id: value
                });
                this.LinkTagExamRepository.save(newLinkTagExam);
            });
            const newData = Object.assign({}, updateExams);
            const { link_tag_exam } = newData, dataUpdate = __rest(newData, ["link_tag_exam"]);
            await this.ExamsRepository.update(updateExams.id, dataUpdate);
            return await this.ExamsRepository.findOne({
                where: {
                    id: updateExams.id,
                },
            });
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async deleteExams(idDelete) {
        try {
            await this.LinkTagExamRepository.delete({ exam_id: idDelete.id });
            await this.ExamsRepository.delete(idDelete);
            return idDelete.id;
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async findExamsIdTitle(inputFilter) {
        const page = inputFilter.page;
        const limit = 10;
        const skip = (page - 1) * limit;
        try {
            const query = await this.ExamsRepository.createQueryBuilder('exams')
                .select('exams.*')
                .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
                .leftJoin('link_tag_exam', 'link_tag', 'link_tag.exam_id = exams.id')
                .leftJoin('tag_exam', 'tag', 'tag.id = link_tag.tag_exam_id')
                .groupBy('exams.id');
            if (inputFilter.title_id) {
                query.where('exams.title_exam_id = :title_exam_id', { title_exam_id: inputFilter.title_id });
            }
            if (inputFilter.tag_id.length > 0) {
                query.andWhere('link_tag.tag_exam_id IN (:...ids)', { ids: inputFilter.tag_id });
            }
            if (inputFilter.search_key) {
                query.where('to_tsvector(unaccent(exams.name)) @@ to_tsquery(:keyword)', { keyword: inputFilter.search_key });
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
ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exams_entity_1.Exams)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_exam_entity_1.TagExam)),
    __param(2, (0, typeorm_1.InjectRepository)(link_tag_exam_entity_1.LinkTagExam)),
    __param(3, (0, typeorm_1.InjectRepository)(title_exam_entity_1.TitleExam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ExamsService);
exports.ExamsService = ExamsService;
//# sourceMappingURL=exams.service.js.map