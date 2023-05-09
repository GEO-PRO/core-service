import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsDto } from './exams.dto';

@Controller('exams')
export class ExamsController {
    constructor(
        private readonly ExamsService: ExamsService) { }

    @Get('get-all')
    findAll() {
        return this.ExamsService.getAll()
    }

    @Post('title')
    findIdTitle(@Body() inputFilter) {
        return this.ExamsService.findExamsIdTitle(inputFilter)
        // return inputFilter
    }

    @Get(':id')
    findId(@Param('id', ParseIntPipe) id: number) {
        return this.ExamsService.findIdExams(id)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createExamsDto: ExamsDto) {
        createExamsDto.id = (await this.ExamsService.findLastById()) + 1;
        return this.ExamsService.creatExams(createExamsDto);
    }

    @Post('update')
    @UsePipes(ValidationPipe)
    updateTagBlog(@Body() updateExamsDto: ExamsDto) {
        return this.ExamsService.updateExams(updateExamsDto);
    }

    @Post('delete')
    delete(@Body() id: number) {
        return this.ExamsService.deleteExams(id);
    }
}
