import { DocsService } from './docs.service';
import { DocsDto } from './docs.dto';
export declare class DocsController {
    private readonly DocsService;
    constructor(DocsService: DocsService);
    findAll(): Promise<any[]>;
    findIdTitle(inputFilter: any): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | {
        pageIn: any;
        totalPages: number;
        totalData: number;
        result: any[];
    }>;
    findId(id: number): Promise<any[]>;
    create(createDocsDto: DocsDto): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | "true">;
    updateTagBlog(updateDocsDto: DocsDto): Promise<import("../entity/docs/docs.entity").Docs | import("@nestjs/common").HttpStatus.NOT_FOUND>;
    delete(id: number): Promise<any>;
}
