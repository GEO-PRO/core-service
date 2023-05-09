import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exams } from 'src/entity/exams/exams.entity';
import { LinkTagExam } from 'src/entity/exams/link_tag_exam.entity';
import { TagExam } from 'src/entity/exams/tag_exam.entity';
import { TitleExam } from 'src/entity/exams/title_exam.entity';
import { Repository } from 'typeorm';
import { ExamsDto } from './exams.dto';

@Injectable()
export class ExamsService {
    constructor(
        @InjectRepository(Exams)
        private readonly ExamsRepository: Repository<Exams>,

        @InjectRepository(TagExam)
        private readonly TagExamRepository: Repository<TagExam>,

        @InjectRepository(LinkTagExam)
        private readonly LinkTagExamRepository: Repository<LinkTagExam>,

        @InjectRepository(TitleExam)
        private readonly TitleExamRepository: Repository<TitleExam>,
    ) { }

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
            .addGroupBy('title.name')
        return await query.getRawMany();
    }

    async findIdExams(idFind) {
        const query = this.ExamsRepository.createQueryBuilder('exams')
            .select('exams.*')
            .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(DISTINCT tag.id::text, \', \')', 'link_tag_exam')
            .addSelect('title.name', 'title_name')
            .leftJoin('link_tag_exam', 'link_tag', 'link_tag.exam_id = exams.id')
            .leftJoin('tag_exam', 'tag', 'link_tag.tag_exam_id = tag.id')
            .leftJoin('title_exam', 'title', 'title.id = exams.title_exam_id')
            .where('exams.id = :id', { id: idFind })
            .groupBy('exams.id')
            .addGroupBy('title.name')
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
        } catch (error) {
            return 0;
        }
    }

    async creatExams(createExamsDto: ExamsDto) {
        try {
            /* Create link tag exam */
            createExamsDto.link_tag_exam.forEach((value) => {
                const newLinkTagExam = this.LinkTagExamRepository.create({
                    exam_id: createExamsDto.id,
                    tag_exam_id: value
                })
                this.LinkTagExamRepository.save(newLinkTagExam);
            });

            /* Create Exam */
            const newExams =
                this.ExamsRepository.create({ ...createExamsDto, created_at: new Date(), update_at: new Date() });
            this.ExamsRepository.save(newExams);
            return "true"
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async updateExams(updateExams) {
        try {
            // Delete all value have exam_id and create new data in link_tag_exam
            await this.LinkTagExamRepository.delete({ exam_id: updateExams.id });
            await updateExams.link_tag_exam.forEach((value) => {
                const newLinkTagExam = this.LinkTagExamRepository.create({
                    exam_id: updateExams.id,
                    tag_exam_id: value
                })
                this.LinkTagExamRepository.save(newLinkTagExam);
            });

            // Create new exam
            const newData = { ...updateExams }
            const { link_tag_exam, ...dataUpdate } = newData;
            await this.ExamsRepository.update(
                updateExams.id,
                dataUpdate,
            );
            return await this.ExamsRepository.findOne({
                where: {
                    id: updateExams.id,
                },
            });
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async deleteExams(idDelete) {
        try {
            await this.LinkTagExamRepository.delete({ exam_id: idDelete.id });
            await this.ExamsRepository.delete(idDelete);
            return idDelete.id;
        } catch (error) {
            return HttpStatus.NOT_FOUND;
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
                .groupBy('exams.id')
            if (inputFilter.title_id) {
                query.where('exams.title_exam_id = :title_exam_id', { title_exam_id: inputFilter.title_id })
            }

            if (inputFilter.tag_id.length > 0) {
                query.andWhere('link_tag.tag_exam_id IN (:...ids)', { ids: inputFilter.tag_id })
            }
            if (inputFilter.search_key) {
                query.where('to_tsvector(unaccent(exams.name)) @@ to_tsquery(:keyword)', { keyword: inputFilter.search_key })
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
            // return query.getRawMany()
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }
}
