import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TimeNow } from 'src/component-service/time_now.service';
import { TagBlogDto } from './tag_blog.dto';
import { TagBlogService } from './tag_blog.service';

@Controller('tag-blog')
export class TagBlogController {
    constructor(
        private readonly TagBlogService: TagBlogService,
        private readonly NowService: TimeNow) { }

    @Get('get-all')
    findAll() {
        return this.TagBlogService.getAll()
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createTagBlogDto: TagBlogDto) {
        createTagBlogDto.id = (await this.TagBlogService.findLastById()) + 1;
        return this.TagBlogService.creatTagBlog(createTagBlogDto);
    }

    @Post('update')
    @UsePipes(ValidationPipe)
    updateTagBlog(@Body() updateTagBlogDto: TagBlogDto) {
        return this.TagBlogService.updateTagBlog(updateTagBlogDto);
    }

    @Post('delete')
    deleteTagBlog(@Body() id: number) {
        return this.TagBlogService.deleteTagBlog(id);
    }

    @Get('time')
    time() {
        return this.NowService.now()
    }

}
