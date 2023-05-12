import { HttpStatus } from '@nestjs/common';
import { Files } from 'src/entity/blogs/files.entity';
import { LinkFilesBlog } from 'src/entity/blogs/link_files_blog.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class UploadfilesService {
    private readonly FilesRepository;
    private readonly LinkFilesBlogRepository;
    private entityManager;
    constructor(FilesRepository: Repository<Files>, LinkFilesBlogRepository: Repository<LinkFilesBlog>, entityManager: EntityManager);
    creatFiles(createFile: any): Promise<HttpStatus.NOT_FOUND | Files[]>;
}
