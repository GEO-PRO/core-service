import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TagDocService } from './tag_doc.service';

@Controller('tag-doc')
export class TagDocController {
    constructor(
        private readonly TagDocService: TagDocService,
    ) { }

    @Get('get-all')
    findAll(@Query('title_id') title_id: string) {
        return this.TagDocService.getAll(parseInt(title_id))
    }

    @Get(':id')
    findId(@Param('id', ParseIntPipe) id: number) {
        return this.TagDocService.findIdTagDoc(id)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createRequest) {
        return this.TagDocService.creatTagDoc(createRequest);
    }

    @Post('update')
    @UsePipes(ValidationPipe)
    updateTagDoc(@Body() updateRequest) {
        return this.TagDocService.updateTagDoc(updateRequest);
    }

    @Post('delete')
    deleteTagDoc(@Body() id: number) {
        return this.TagDocService.deleteTagDoc(id);
    }
}
