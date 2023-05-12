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
exports.TitleExamService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const title_exam_entity_1 = require("../entity/exams/title_exam.entity");
const typeorm_2 = require("typeorm");
let TitleExamService = class TitleExamService {
    constructor(TitleExamRepository) {
        this.TitleExamRepository = TitleExamRepository;
    }
    getAll() {
        const query = this.TitleExamRepository.createQueryBuilder('title_exam')
            .select('title_exam.id, title_exam.name')
            .addSelect('count(title_exam.id)', 'count')
            .leftJoin('exams', 'exams', 'title_exam.id = exams.title_exam_id')
            .groupBy('title_exam.id');
        return query.getRawMany();
    }
    creatTitleExam(createRequest) {
        try {
            const newTitleExam = this.TitleExamRepository.create(Object.assign(Object.assign({}, createRequest), { created_at: new Date(), update_at: new Date() }));
            return this.TitleExamRepository.save(newTitleExam);
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async updateTitleExam(updateTitleExam) {
        try {
            await this.TitleExamRepository.update(updateTitleExam.id, Object.assign(Object.assign({}, updateTitleExam), { update_at: new Date() }));
            return await this.TitleExamRepository.findOne({
                where: {
                    id: updateTitleExam.id,
                },
            });
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    findIdTitleExam(id) {
        return this.TitleExamRepository.findOne({
            where: {
                id: id,
            },
        });
    }
    deleteTitleExam(id) {
        try {
            this.TitleExamRepository.delete(id);
            return id;
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
};
TitleExamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(title_exam_entity_1.TitleExam)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TitleExamService);
exports.TitleExamService = TitleExamService;
//# sourceMappingURL=title_exam.service.js.map