import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TitleExam } from 'src/entity/exams/title_exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TitleExamService {
    constructor(
        @InjectRepository(TitleExam)
        private readonly TitleExamRepository: Repository<TitleExam>,
    ) { }

    getAll() {
        const query = this.TitleExamRepository.createQueryBuilder('title_exam')
            .select('title_exam.id, title_exam.name')
            .addSelect('count(title_exam.id)', 'count')
            .leftJoin('exams', 'exams', 'title_exam.id = exams.title_exam_id')
            .groupBy('title_exam.id')

        return query.getRawMany()
    }

    creatTitleExam(createRequest) {
        try {
            const newTitleExam =
                this.TitleExamRepository.create({ ...createRequest, created_at: new Date(), update_at: new Date() });
            return this.TitleExamRepository.save(newTitleExam);
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async updateTitleExam(updateTitleExam) {
        try {
            await this.TitleExamRepository.update(
                updateTitleExam.id,
                { ...updateTitleExam, update_at: new Date() },
            );
            return await this.TitleExamRepository.findOne({
                where: {
                    id: updateTitleExam.id,
                },
            });
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    findIdTitleExam(id: number) {
        return this.TitleExamRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    deleteTitleExam(id: number) {
        try {
            this.TitleExamRepository.delete(id);
            return id;
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }
}
