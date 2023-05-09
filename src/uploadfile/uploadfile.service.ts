import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from 'src/entity/blogs/files.entity';
import { LinkFilesBlog } from 'src/entity/blogs/link_files_blog.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UploadfilesService {
    constructor(
        @InjectRepository(Files)
        private readonly FilesRepository: Repository<Files>,

        @InjectRepository(LinkFilesBlog)
        private readonly LinkFilesBlogRepository: Repository<LinkFilesBlog>,

        private entityManager: EntityManager,
    ) { }

    async creatFiles(createFile) {
        try {
            // Create a new file
            const newFile = this.FilesRepository.create(createFile);
            const saveFile = await this.FilesRepository.save(newFile);
            return saveFile
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }
}
