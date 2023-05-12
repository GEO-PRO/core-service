import { TitleExamService } from './title_exam.service';
export declare class TitleExamController {
    private readonly TitleExamService;
    constructor(TitleExamService: TitleExamService);
    findAll(): Promise<any[]>;
    findId(id: number): Promise<import("../entity/exams/title_exam.entity").TitleExam>;
    create(createRequest: any): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | import("../entity/exams/title_exam.entity").TitleExam[]>;
    updateTitleExam(updateRequest: any): Promise<import("../entity/exams/title_exam.entity").TitleExam | import("@nestjs/common").HttpStatus.NOT_FOUND>;
    deleteTitleExam(id: number): number;
}
