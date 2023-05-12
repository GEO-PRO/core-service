import { HttpStatus } from '@nestjs/common';
import { TagBlog } from 'src/entity/blogs/tag_blog.entity';
import { Repository } from 'typeorm';
import { TagBlogDto } from './tag_blog.dto';
export declare class TagBlogService {
    private readonly TagBlogRepository;
    constructor(TagBlogRepository: Repository<TagBlog>);
    getAll(): Promise<any[]>;
    creatTagBlog(createTagBlogDto: TagBlogDto): Promise<TagBlog> | HttpStatus.NOT_FOUND;
    updateTagBlog(updateTagBlog: any): Promise<TagBlog | HttpStatus.NOT_FOUND>;
    findIdTagBlog(id: number): Promise<TagBlog>;
    deleteTagBlog(id: number): number;
}
