import { BlogsService } from './blogs.service';
import { BlogsDto } from './blogs.dto';
export declare class BlogsController {
    private readonly BlogsService;
    constructor(BlogsService: BlogsService);
    findAll(): Promise<any[]>;
    findId(id: number): Promise<any[]>;
    create(createBlogsDto: BlogsDto): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | "true">;
    updateTagBlog(updateBlogsDto: BlogsDto): Promise<import("../entity/blogs/blogs.entity").Blogs | import("@nestjs/common").HttpStatus.NOT_FOUND>;
    delete(id: number): Promise<any>;
    filterBlogs(inputFilter: any): Promise<{
        pageIn: any;
        totalPages: number;
        totalData: number;
        result: any[];
    }>;
}
