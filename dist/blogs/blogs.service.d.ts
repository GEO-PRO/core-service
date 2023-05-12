import { HttpStatus } from '@nestjs/common';
import { Blogs } from 'src/entity/blogs/blogs.entity';
import { Repository } from 'typeorm';
import { BlogsDto } from './blogs.dto';
import { LinkTagBlog } from 'src/entity/blogs/link_tag_blog.entity';
import { LinkFilesBlog } from 'src/entity/blogs/link_files_blog.entity';
export declare class BlogsService {
    private readonly BlogsRepository;
    private readonly LinkTagBlogRepository;
    private readonly LinkFilesBlogRepository;
    constructor(BlogsRepository: Repository<Blogs>, LinkTagBlogRepository: Repository<LinkTagBlog>, LinkFilesBlogRepository: Repository<LinkFilesBlog>);
    getAll(): Promise<any[]>;
    findIdBlogs(idFind: any): Promise<any[]>;
    findLastById(): Promise<number>;
    creatBlogs(createBlogsDto: BlogsDto): Promise<HttpStatus.NOT_FOUND | "true">;
    updateBlogs(updateBlogs: any): Promise<Blogs | HttpStatus.NOT_FOUND>;
    deleteBlogs(idDelete: any): Promise<any>;
    filterBlogsWithTags(inputFilter: any): Promise<{
        pageIn: any;
        totalPages: number;
        totalData: number;
        result: any[];
    }>;
}
