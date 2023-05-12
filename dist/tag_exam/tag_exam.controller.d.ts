import { TagExamService } from './tag_exam.service';
export declare class TagExamController {
    private readonly TagExamService;
    constructor(TagExamService: TagExamService);
    findAll(title_id: string): Promise<any[]>;
    findId(id: number): Promise<import("../entity/exams/tag_exam.entity").TagExam>;
    create(createRequest: any): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | import("../entity/exams/tag_exam.entity").TagExam[]>;
    updateTagExam(updateRequest: any): Promise<import("../entity/exams/tag_exam.entity").TagExam | import("@nestjs/common").HttpStatus.NOT_FOUND>;
    deleteTagExam(id: number): number;
}
