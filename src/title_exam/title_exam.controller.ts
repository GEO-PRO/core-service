import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TitleExamService } from './title_exam.service';

@Controller('title-exam')
export class TitleExamController {
    constructor(
        private readonly TitleExamService: TitleExamService,
    ) { }

    @Get('get-all')
    findAll() {
        return this.TitleExamService.getAll()
    }

    @Get(':id')
    findId(@Param('id', ParseIntPipe) id: number) {
        return this.TitleExamService.findIdTitleExam(id)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createRequest) {
        return this.TitleExamService.creatTitleExam(createRequest);
    }

    @Post('update')
    @UsePipes(ValidationPipe)
    updateTitleExam(@Body() updateRequest) {
        return this.TitleExamService.updateTitleExam(updateRequest);
    }

    @Post('delete')
    deleteTitleExam(@Body() id: number) {
        return this.TitleExamService.deleteTitleExam(id);
    }
}
