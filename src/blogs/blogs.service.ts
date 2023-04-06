import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blogs } from 'src/entity/blogs.entity';
import { Repository } from 'typeorm';
import { BlogsDto } from './blogs.dto';
import { LinkTagBlog } from 'src/entity/link_tag_blog.entity';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blogs)
        private readonly BlogsRepository: Repository<Blogs>,

        @InjectRepository(LinkTagBlog)
        private readonly LinkTagBlogRepository: Repository<LinkTagBlog>,
    ) { }

    async getAll() {
        const query = this.BlogsRepository.createQueryBuilder('blogs')
            .select('blogs.*')
            .addSelect('STRING_AGG(tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(tag.id::text, \', \')', 'link_tag_blog')
            .leftJoin('link_tag_blog', 'link', 'link.blog_id = blogs.id')
            .leftJoin('tag_blog', 'tag', 'link.tag_blog_id = tag.id')
            .groupBy('blogs.id');
        return await query.getRawMany();
        // return this.BlogsRepository.find()
    }

    async findIdBlogs(idFind) {
        const query = this.BlogsRepository.createQueryBuilder('blogs')
            .select('blogs.*')
            .addSelect('STRING_AGG(tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(tag.id::text, \', \')', 'link_tag_blog')
            .leftJoin('link_tag_blog', 'link', 'link.blog_id = blogs.id')
            .leftJoin('tag_blog', 'tag', 'link.tag_blog_id = tag.id')
            .where('blogs.id = :id', { id: idFind })
            .groupBy('blogs.id');
        return await query.getRawMany();
    }

    async findLastById() {
        const lastID = await this.BlogsRepository.find({
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

    async creatBlogs(createBlogsDto: BlogsDto) {
        try {
            createBlogsDto.link_tag_blog.forEach((value) => {
                const newLinkTagBlog = this.LinkTagBlogRepository.create({
                    blog_id: createBlogsDto.id,
                    tag_blog_id: value
                })
                this.LinkTagBlogRepository.save(newLinkTagBlog);
            });
            const newBlogs =
                this.BlogsRepository.create({ ...createBlogsDto, created_at: new Date(), update_at: new Date() });
            this.BlogsRepository.save(newBlogs);
            return "true"
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async updateBlogs(updateBlogs) {
        try {
            // Delete all value have blog_id and create new data
            await this.LinkTagBlogRepository.delete({ blog_id: updateBlogs.id });
            await updateBlogs.link_tag_blog.forEach((value) => {
                const newLinkTagBlog = this.LinkTagBlogRepository.create({
                    blog_id: updateBlogs.id,
                    tag_blog_id: value
                })
                this.LinkTagBlogRepository.save(newLinkTagBlog);
            });

            const newData = { ...updateBlogs, update_at: new Date() }
            const { link_tag_blog, ...dataUpdate } = newData;
            await this.BlogsRepository.update(
                updateBlogs.id,
                dataUpdate,
            );
            return await this.BlogsRepository.findOne({
                where: {
                    id: updateBlogs.id,
                },
            });
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async deleteBlogs(idDelete) {
        try {
            await this.LinkTagBlogRepository.delete({ blog_id: idDelete.id });
            await this.BlogsRepository.delete(idDelete);
            return idDelete.id;
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async filterBlogsWithTags(tag_blogs_id) {
        if (tag_blogs_id.length > 0) {
            const query = this.BlogsRepository.createQueryBuilder('blogs')
                .leftJoin('link_tag_blog', 'link', 'link.blog_id = blogs.id')
                .leftJoin('tag_blog', 'tag', 'link.tag_blog_id = tag.id')
                .where('link.tag_blog_id IN (:...ids)', { ids: tag_blogs_id })
                .select(['blogs.*', 'link.*', 'tag.name as tag_name']);
            return await query.getRawMany();
        } else {
            return await this.BlogsRepository.find()
        }
    }
}
