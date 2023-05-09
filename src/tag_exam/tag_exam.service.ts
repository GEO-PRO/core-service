import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagExam } from 'src/entity/exams/tag_exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagExamService {
    constructor(
        @InjectRepository(TagExam)
        private readonly TagExamRepository: Repository<TagExam>,
    ) { }

    getAll(title_id) {
        const query = this.TagExamRepository.createQueryBuilder('tag_exam')
            .select('tag_exam.*')
            .addSelect('count(tag_exam.id)', 'count')
            .leftJoin('link_tag_exam', 'link_tag', 'link_tag.tag_exam_id = tag_exam.id')
            .leftJoin('exams', 'exams', 'link_tag.exam_id = exams.id')
            .groupBy('tag_exam.id')
        if (title_id) {
            query.where('exams.title_exam_id = :title_exam_id', { title_exam_id: title_id })
        }
        return query.getRawMany()
    }

    creatTagExam(createRequest) {
        try {
            const newTagExam =
                this.TagExamRepository.create({ ...createRequest, created_at: new Date(), update_at: new Date() });
            return this.TagExamRepository.save(newTagExam);
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async updateTagExam(updateTagExam) {
        try {
            await this.TagExamRepository.update(
                updateTagExam.id,
                { ...updateTagExam, update_at: new Date() },
            );
            return await this.TagExamRepository.findOne({
                where: {
                    id: updateTagExam.id,
                },
            });
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    findIdTagExam(id: number) {
        return this.TagExamRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    deleteTagExam(id: number) {
        try {
            this.TagExamRepository.delete(id);
            return id;
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }
}
