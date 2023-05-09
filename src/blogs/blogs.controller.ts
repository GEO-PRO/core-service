import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsDto } from './blogs.dto';

@Controller('blogs')
export class BlogsController {
    constructor(
        private readonly BlogsService: BlogsService) { }

    @Get('get-all')
    findAll() {
        return this.BlogsService.getAll()
    }

    @Get(':id')
    findId(@Param('id', ParseIntPipe) id: number) {
        return this.BlogsService.findIdBlogs(id)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createBlogsDto: BlogsDto) {
        createBlogsDto.id = (await this.BlogsService.findLastById()) + 1;
        return this.BlogsService.creatBlogs(createBlogsDto);
    }

    @Post('update')
    @UsePipes(ValidationPipe)
    updateTagBlog(@Body() updateBlogsDto: BlogsDto) {
        return this.BlogsService.updateBlogs(updateBlogsDto);
    }

    @Post('delete')
    delete(@Body() id: number) {
        return this.BlogsService.deleteBlogs(id);
    }

    @Post('filter')
    filterBlogs(@Body() inputFilter) {
        return this.BlogsService.filterBlogsWithTags(inputFilter)
    }
}
