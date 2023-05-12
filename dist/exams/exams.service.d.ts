import { HttpStatus } from '@nestjs/common';
import { Exams } from 'src/entity/exams/exams.entity';
import { LinkTagExam } from 'src/entity/exams/link_tag_exam.entity';
import { TagExam } from 'src/entity/exams/tag_exam.entity';
import { TitleExam } from 'src/entity/exams/title_exam.entity';
import { Repository } from 'typeorm';
import { ExamsDto } from './exams.dto';
export declare class ExamsService {
    private readonly ExamsRepository;
    private readonly TagExamRepository;
    private readonly LinkTagExamRepository;
    private readonly TitleExamRepository;
    constructor(ExamsRepository: Repository<Exams>, TagExamRepository: Repository<TagExam>, LinkTagExamRepository: Repository<LinkTagExam>, TitleExamRepository: Repository<TitleExam>);
    getAll(): Promise<any[]>;
    findIdExams(idFind: any): Promise<any[]>;
    findLastById(): Promise<number>;
    creatExams(createExamsDto: ExamsDto): Promise<HttpStatus.NOT_FOUND | "true">;
    updateExams(updateExams: any): Promise<Exams | HttpStatus.NOT_FOUND>;
    deleteExams(idDelete: any): Promise<any>;
    findExamsIdTitle(inputFilter: any): Promise<HttpStatus.NOT_FOUND | {
        pageIn: any;
        totalPages: number;
        totalData: number;
        result: any[];
    }>;
}
