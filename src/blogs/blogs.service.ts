import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blogs } from 'src/entity/blogs/blogs.entity';
import { Repository } from 'typeorm';
import { BlogsDto } from './blogs.dto';
import { LinkTagBlog } from 'src/entity/blogs/link_tag_blog.entity';
import { LinkFilesBlog } from 'src/entity/blogs/link_files_blog.entity';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blogs)
        private readonly BlogsRepository: Repository<Blogs>,

        @InjectRepository(LinkTagBlog)
        private readonly LinkTagBlogRepository: Repository<LinkTagBlog>,

        @InjectRepository(LinkFilesBlog)
        private readonly LinkFilesBlogRepository: Repository<LinkFilesBlog>,
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
            .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(DISTINCT files.name, \', \')', 'files_name')
            .addSelect('STRING_AGG(DISTINCT tag.id::text, \', \')', 'link_tag_blog')
            .leftJoin('link_tag_blog', 'link_tag', 'link_tag.blog_id = blogs.id')
            .leftJoin('tag_blog', 'tag', 'link_tag.tag_blog_id = tag.id')
            .leftJoin('link_files_blog', 'link_file', 'link_file.blog_id = blogs.id')
            .leftJoin('files', 'files', 'link_file.file_id = files.id')
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
            /* Create link tag blog */
            createBlogsDto.link_tag_blog.forEach((value) => {
                const newLinkTagBlog = this.LinkTagBlogRepository.create({
                    blog_id: createBlogsDto.id,
                    tag_blog_id: value
                })
                this.LinkTagBlogRepository.save(newLinkTagBlog);
            });

            /* Create Blog */
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
            // Delete all value have blog_id and create new data in link_tag_blog
            await this.LinkTagBlogRepository.delete({ blog_id: updateBlogs.id });
            await updateBlogs.link_tag_blog.forEach((value) => {
                const newLinkTagBlog = this.LinkTagBlogRepository.create({
                    blog_id: updateBlogs.id,
                    tag_blog_id: value
                })
                this.LinkTagBlogRepository.save(newLinkTagBlog);
            });

            // Delete all value have blog_id and create new data in link_file_blog
            if (updateBlogs.link_file_blog.length > 0) {
                await this.LinkFilesBlogRepository.delete({ blog_id: updateBlogs.id });
                await updateBlogs.link_file_blog.forEach((value) => {
                    const newLinkFilesBlog = this.LinkFilesBlogRepository.create({
                        blog_id: updateBlogs.id,
                        file_id: value
                    })
                    this.LinkFilesBlogRepository.save(newLinkFilesBlog);
                });
            }

            // Create new blog
            const newData = { ...updateBlogs }
            const { link_tag_blog, link_file_blog, ...dataUpdate } = newData;
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
            await this.LinkFilesBlogRepository.delete({ blog_id: idDelete.id });
            await this.LinkTagBlogRepository.delete({ blog_id: idDelete.id });
            await this.BlogsRepository.delete(idDelete);
            return idDelete.id;
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async filterBlogsWithTags(inputFilter) {
        const page = inputFilter.page;
        const limit = 10;
        const skip = (page - 1) * limit;

        const query = this.BlogsRepository.createQueryBuilder('blogs')
            .select('blogs.*')
            .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(DISTINCT files.name, \', \')', 'files_name')
            .addSelect('STRING_AGG(DISTINCT tag.id::text, \', \')', 'link_tag_blog')
            .leftJoin('link_tag_blog', 'link_tag', 'link_tag.blog_id = blogs.id')
            .leftJoin('tag_blog', 'tag', 'link_tag.tag_blog_id = tag.id')
            .leftJoin('link_files_blog', 'link_file', 'link_file.blog_id = blogs.id')
            .leftJoin('files', 'files', 'link_file.file_id = files.id')
            .groupBy('blogs.id')

        if (inputFilter.tag_blogs_id.length > 0) {
            query.where('link_tag.tag_blog_id IN (:...ids)', { ids: inputFilter.tag_blogs_id })
        }

        if (inputFilter.searchParam) {
            query.where('to_tsvector(unaccent(title) || unaccent(summary)) @@ to_tsquery(:keyword)', { keyword: inputFilter.searchParam })
        }


        const getTotalData = await query.getCount();
        const totalPages = Math.ceil(getTotalData / limit);

        const result = await query.offset(skip).limit(limit).getRawMany();
        return {
            pageIn: page,
            totalPages: totalPages,
            totalData: getTotalData,
            result: result
        };
    }
}
