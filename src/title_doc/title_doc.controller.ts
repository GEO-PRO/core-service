import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TitleDocService } from './title_doc.service';

@Controller('title-doc')
export class TitleDocController {
    constructor(
        private readonly TitleDocService: TitleDocService,
    ) { }

    @Get('get-all')
    findAll() {
        return this.TitleDocService.getAll()
    }

    @Get(':id')
    findId(@Param('id', ParseIntPipe) id: number) {
        return this.TitleDocService.findIdTitleDoc(id)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createRequest) {
        return this.TitleDocService.creatTitleDoc(createRequest);
    }

    @Post('update')
    @UsePipes(ValidationPipe)
    updateTitleDoc(@Body() updateRequest) {
        return this.TitleDocService.updateTitleDoc(updateRequest);
    }

    @Post('delete')
    deleteTitleDoc(@Body() id: number) {
        return this.TitleDocService.deleteTitleDoc(id);
    }
}
