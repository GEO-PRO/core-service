import { HttpStatus } from '@nestjs/common';
import { TagDoc } from 'src/entity/docs/tag_doc.entity';
import { Repository } from 'typeorm';
export declare class TagDocService {
    private readonly TagDocRepository;
    constructor(TagDocRepository: Repository<TagDoc>);
    getAll(title_id: any): Promise<any[]>;
    creatTagDoc(createRequest: any): HttpStatus.NOT_FOUND | Promise<TagDoc[]>;
    updateTagDoc(updateTagDoc: any): Promise<TagDoc | HttpStatus.NOT_FOUND>;
    findIdTagDoc(id: number): Promise<TagDoc>;
    deleteTagDoc(id: number): number;
}
