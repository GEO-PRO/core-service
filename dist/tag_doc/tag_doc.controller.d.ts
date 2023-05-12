import { TagDocService } from './tag_doc.service';
export declare class TagDocController {
    private readonly TagDocService;
    constructor(TagDocService: TagDocService);
    findAll(title_id: string): Promise<any[]>;
    findId(id: number): Promise<import("../entity/docs/tag_doc.entity").TagDoc>;
    create(createRequest: any): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | import("../entity/docs/tag_doc.entity").TagDoc[]>;
    updateTagDoc(updateRequest: any): Promise<import("../entity/docs/tag_doc.entity").TagDoc | import("@nestjs/common").HttpStatus.NOT_FOUND>;
    deleteTagDoc(id: number): number;
}
