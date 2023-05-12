import { TagBlogDto } from './tag_blog.dto';
import { TagBlogService } from './tag_blog.service';
export declare class TagBlogController {
    private readonly TagBlogService;
    constructor(TagBlogService: TagBlogService);
    findAll(): Promise<any[]>;
    findId(id: number): Promise<import("../entity/blogs/tag_blog.entity").TagBlog>;
    create(createTagBlogDto: TagBlogDto): Promise<import("../entity/blogs/tag_blog.entity").TagBlog | import("@nestjs/common").HttpStatus.NOT_FOUND>;
    updateTagBlog(updateTagBlogDto: TagBlogDto): Promise<import("../entity/blogs/tag_blog.entity").TagBlog | import("@nestjs/common").HttpStatus.NOT_FOUND>;
    deleteTagBlog(id: number): number;
}
