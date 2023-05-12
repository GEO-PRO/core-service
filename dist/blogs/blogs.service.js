"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blogs_entity_1 = require("../entity/blogs/blogs.entity");
const typeorm_2 = require("typeorm");
const link_tag_blog_entity_1 = require("../entity/blogs/link_tag_blog.entity");
const link_files_blog_entity_1 = require("../entity/blogs/link_files_blog.entity");
let BlogsService = class BlogsService {
    constructor(BlogsRepository, LinkTagBlogRepository, LinkFilesBlogRepository) {
        this.BlogsRepository = BlogsRepository;
        this.LinkTagBlogRepository = LinkTagBlogRepository;
        this.LinkFilesBlogRepository = LinkFilesBlogRepository;
    }
    async getAll() {
        const query = this.BlogsRepository.createQueryBuilder('blogs')
            .select('blogs.*')
            .addSelect('STRING_AGG(tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(tag.id::text, \', \')', 'link_tag_blog')
            .leftJoin('link_tag_blog', 'link', 'link.blog_id = blogs.id')
            .leftJoin('tag_blog', 'tag', 'link.tag_blog_id = tag.id')
            .groupBy('blogs.id');
        return await query.getRawMany();
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
        }
        catch (error) {
            return 0;
        }
    }
    async creatBlogs(createBlogsDto) {
        try {
            createBlogsDto.link_tag_blog.forEach((value) => {
                const newLinkTagBlog = this.LinkTagBlogRepository.create({
                    blog_id: createBlogsDto.id,
                    tag_blog_id: value
                });
                this.LinkTagBlogRepository.save(newLinkTagBlog);
            });
            const newBlogs = this.BlogsRepository.create(Object.assign(Object.assign({}, createBlogsDto), { created_at: new Date(), update_at: new Date() }));
            this.BlogsRepository.save(newBlogs);
            return "true";
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async updateBlogs(updateBlogs) {
        try {
            await this.LinkTagBlogRepository.delete({ blog_id: updateBlogs.id });
            await updateBlogs.link_tag_blog.forEach((value) => {
                const newLinkTagBlog = this.LinkTagBlogRepository.create({
                    blog_id: updateBlogs.id,
                    tag_blog_id: value
                });
                this.LinkTagBlogRepository.save(newLinkTagBlog);
            });
            if (updateBlogs.link_file_blog.length > 0) {
                await this.LinkFilesBlogRepository.delete({ blog_id: updateBlogs.id });
                await updateBlogs.link_file_blog.forEach((value) => {
                    const newLinkFilesBlog = this.LinkFilesBlogRepository.create({
                        blog_id: updateBlogs.id,
                        file_id: value
                    });
                    this.LinkFilesBlogRepository.save(newLinkFilesBlog);
                });
            }
            const newData = Object.assign({}, updateBlogs);
            const { link_tag_blog, link_file_blog } = newData, dataUpdate = __rest(newData, ["link_tag_blog", "link_file_blog"]);
            await this.BlogsRepository.update(updateBlogs.id, dataUpdate);
            return await this.BlogsRepository.findOne({
                where: {
                    id: updateBlogs.id,
                },
            });
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async deleteBlogs(idDelete) {
        try {
            await this.LinkFilesBlogRepository.delete({ blog_id: idDelete.id });
            await this.LinkTagBlogRepository.delete({ blog_id: idDelete.id });
            await this.BlogsRepository.delete(idDelete);
            return idDelete.id;
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
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
            .groupBy('blogs.id');
        if (inputFilter.tag_blogs_id.length > 0) {
            query.where('link_tag.tag_blog_id IN (:...ids)', { ids: inputFilter.tag_blogs_id });
        }
        if (inputFilter.searchParam) {
            query.where('to_tsvector(unaccent(title) || unaccent(summary)) @@ to_tsquery(:keyword)', { keyword: inputFilter.searchParam });
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
};
BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blogs_entity_1.Blogs)),
    __param(1, (0, typeorm_1.InjectRepository)(link_tag_blog_entity_1.LinkTagBlog)),
    __param(2, (0, typeorm_1.InjectRepository)(link_files_blog_entity_1.LinkFilesBlog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BlogsService);
exports.BlogsService = BlogsService;
//# sourceMappingURL=blogs.service.js.map