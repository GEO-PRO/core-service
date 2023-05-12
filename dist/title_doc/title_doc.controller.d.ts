import { TitleDocService } from './title_doc.service';
export declare class TitleDocController {
    private readonly TitleDocService;
    constructor(TitleDocService: TitleDocService);
    findAll(): Promise<import("../entity/docs/title_doc.entity").TitleDoc[]>;
    findId(id: number): Promise<import("../entity/docs/title_doc.entity").TitleDoc>;
    create(createRequest: any): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | import("../entity/docs/title_doc.entity").TitleDoc[]>;
    updateTitleDoc(updateRequest: any): Promise<import("../entity/docs/title_doc.entity").TitleDoc | import("@nestjs/common").HttpStatus.NOT_FOUND>;
    deleteTitleDoc(id: number): number;
}
