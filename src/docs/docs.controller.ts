import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsDto } from './docs.dto';

@Controller('docs')
export class DocsController {
    constructor(
        private readonly DocsService: DocsService) { }

    @Get('get-all')
    findAll() {
        return this.DocsService.getAll()
    }

    @Post('title')
    findIdTitle(@Body() inputFilter) {
        return this.DocsService.findDocsIdTitle(inputFilter)
        // return inputFilter
    }

    @Get(':id')
    findId(@Param('id', ParseIntPipe) id: number) {
        return this.DocsService.findIdDocs(id)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createDocsDto: DocsDto) {
        createDocsDto.id = (await this.DocsService.findLastById()) + 1;
        return this.DocsService.creatDocs(createDocsDto);
    }

    @Post('update')
    @UsePipes(ValidationPipe)
    updateTagBlog(@Body() updateDocsDto: DocsDto) {
        return this.DocsService.updateDocs(updateDocsDto);
    }

    @Post('delete')
    delete(@Body() id: number) {
        return this.DocsService.deleteDocs(id);
    }
}
