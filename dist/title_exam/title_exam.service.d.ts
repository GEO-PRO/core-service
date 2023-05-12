import { HttpStatus } from '@nestjs/common';
import { TitleExam } from 'src/entity/exams/title_exam.entity';
import { Repository } from 'typeorm';
export declare class TitleExamService {
    private readonly TitleExamRepository;
    constructor(TitleExamRepository: Repository<TitleExam>);
    getAll(): Promise<any[]>;
    creatTitleExam(createRequest: any): HttpStatus.NOT_FOUND | Promise<TitleExam[]>;
    updateTitleExam(updateTitleExam: any): Promise<TitleExam | HttpStatus.NOT_FOUND>;
    findIdTitleExam(id: number): Promise<TitleExam>;
    deleteTitleExam(id: number): number;
}
