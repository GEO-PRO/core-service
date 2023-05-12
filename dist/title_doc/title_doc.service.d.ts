import { HttpStatus } from '@nestjs/common';
import { TitleDoc } from 'src/entity/docs/title_doc.entity';
import { Repository } from 'typeorm';
export declare class TitleDocService {
    private readonly TitleDocRepository;
    constructor(TitleDocRepository: Repository<TitleDoc>);
    getAll(): Promise<TitleDoc[]>;
    creatTitleDoc(createRequest: any): HttpStatus.NOT_FOUND | Promise<TitleDoc[]>;
    updateTitleDoc(updateTitleDoc: any): Promise<TitleDoc | HttpStatus.NOT_FOUND>;
    findIdTitleDoc(id: number): Promise<TitleDoc>;
    deleteTitleDoc(id: number): number;
}
