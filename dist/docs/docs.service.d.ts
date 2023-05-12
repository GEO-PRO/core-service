import { HttpStatus } from '@nestjs/common';
import { Docs } from 'src/entity/docs/docs.entity';
import { LinkTagDoc } from 'src/entity/docs/link_tag_doc.entity';
import { TagDoc } from 'src/entity/docs/tag_doc.entity';
import { TitleDoc } from 'src/entity/docs/title_doc.entity';
import { Repository } from 'typeorm';
import { DocsDto } from './docs.dto';
export declare class DocsService {
    private readonly DocsRepository;
    private readonly TagDocRepository;
    private readonly LinkTagDocRepository;
    private readonly TitleDocRepository;
    constructor(DocsRepository: Repository<Docs>, TagDocRepository: Repository<TagDoc>, LinkTagDocRepository: Repository<LinkTagDoc>, TitleDocRepository: Repository<TitleDoc>);
    getAll(): Promise<any[]>;
    findIdDocs(idFind: any): Promise<any[]>;
    findLastById(): Promise<number>;
    creatDocs(createDocsDto: DocsDto): Promise<HttpStatus.NOT_FOUND | "true">;
    updateDocs(updateDocs: any): Promise<Docs | HttpStatus.NOT_FOUND>;
    deleteDocs(idDelete: any): Promise<any>;
    findDocsIdTitle(inputFilter: any): Promise<HttpStatus.NOT_FOUND | {
        pageIn: any;
        totalPages: number;
        totalData: number;
        result: any[];
    }>;
}
