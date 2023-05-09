import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TagExamService } from './tag_exam.service';

@Controller('tag-exam')
export class TagExamController {
    constructor(
        private readonly TagExamService: TagExamService,
    ) { }

    @Get('get-all')
    findAll(@Query('title_id') title_id: string) {
        return this.TagExamService.getAll(parseInt(title_id))
    }

    @Get(':id')
    findId(@Param('id', ParseIntPipe) id: number) {
        return this.TagExamService.findIdTagExam(id)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createRequest) {
        return this.TagExamService.creatTagExam(createRequest);
    }

    @Post('update')
    @UsePipes(ValidationPipe)
    updateTagExam(@Body() updateRequest) {
        return this.TagExamService.updateTagExam(updateRequest);
    }

    @Post('delete')
    deleteTagExam(@Body() id: number) {
        return this.TagExamService.deleteTagExam(id);
    }
}
