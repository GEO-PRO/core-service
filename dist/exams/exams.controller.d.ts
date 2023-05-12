import { ExamsService } from './exams.service';
import { ExamsDto } from './exams.dto';
export declare class ExamsController {
    private readonly ExamsService;
    constructor(ExamsService: ExamsService);
    findAll(): Promise<any[]>;
    findIdTitle(inputFilter: any): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | {
        pageIn: any;
        totalPages: number;
        totalData: number;
        result: any[];
    }>;
    findId(id: number): Promise<any[]>;
    create(createExamsDto: ExamsDto): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | "true">;
    updateTagBlog(updateExamsDto: ExamsDto): Promise<import("../entity/exams/exams.entity").Exams | import("@nestjs/common").HttpStatus.NOT_FOUND>;
    delete(id: number): Promise<any>;
}
