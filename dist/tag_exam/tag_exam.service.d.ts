import { HttpStatus } from '@nestjs/common';
import { TagExam } from 'src/entity/exams/tag_exam.entity';
import { Repository } from 'typeorm';
export declare class TagExamService {
    private readonly TagExamRepository;
    constructor(TagExamRepository: Repository<TagExam>);
    getAll(title_id: any): Promise<any[]>;
    creatTagExam(createRequest: any): HttpStatus.NOT_FOUND | Promise<TagExam[]>;
    updateTagExam(updateTagExam: any): Promise<TagExam | HttpStatus.NOT_FOUND>;
    findIdTagExam(id: number): Promise<TagExam>;
    deleteTagExam(id: number): number;
}
