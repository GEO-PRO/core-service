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

    creatTagBlog(createTagBlogDto: TagBlogDto) {
        try {
            const newTagBlog =
                this.TagBlogRepository.create({ ...createTagBlogDto, created_at: new Date(), update_at: new Date() });
            return this.TagBlogRepository.save(newTagBlog);
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async updateTagBlog(updateTagBlog) {
        try {
            await this.TagBlogRepository.update(
                updateTagBlog.id,
                { ...updateTagBlog, update_at: new Date() },
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

    findIdTagBlog(id: number) {
        return this.TagBlogRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    deleteTagBlog(id: number) {
        try {
            this.TagBlogRepository.delete(id);
            return id;
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }
}
