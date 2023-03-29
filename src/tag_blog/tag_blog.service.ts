import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagBlog } from 'src/entity/tag_blog.entity';
import { Repository } from 'typeorm';
import { TagBlogDto } from './tag_blog.dto';

@Injectable()
export class TagBlogService {
    constructor(
        @InjectRepository(TagBlog)
        private readonly TagBlogRepository: Repository<TagBlog>,
    ) { }

    getAll() {
        return this.TagBlogRepository.find()
    }

    async findLastById() {
        const lastID = await this.TagBlogRepository.find({
            order: {
                id: 'DESC',
            },
            take: 1,
        });
        try {
            return lastID[0].id;
        } catch (error) {
            return 0;
        }
    }

    creatTagBlog(createTagBlogDto: TagBlogDto) {
        try {
            const newTagBlog =
                this.TagBlogRepository.create(createTagBlogDto);
            return this.TagBlogRepository.save(newTagBlog);
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async updateTagBlog(updateTagBlog) {
        try {
            await this.TagBlogRepository.update(
                updateTagBlog.id,
                updateTagBlog,
            );
            return await this.TagBlogRepository.findOne({
                where: {
                    id: updateTagBlog.id,
                },
            });
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    deleteTagBlog(id: number) {
        try {
          this.TagBlogRepository.delete(id);
          return HttpStatus.OK;
        } catch (error) {
          return HttpStatus.NOT_FOUND;
        }
      }
}
