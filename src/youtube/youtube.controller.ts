import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeDto } from './youtube.dto';

@Controller('youtube')
export class YoutubeController {
    constructor(
        private readonly YoutubeService: YoutubeService) { }

    @Get('get-all')
    findAll() {
        return this.YoutubeService.getAll()
    }

    @Get(':id')
    findId(@Param('id', ParseIntPipe) id: number) {
        return this.YoutubeService.findIdYoutube(id)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createYoutubeDto: YoutubeDto) {
        createYoutubeDto.id = (await this.YoutubeService.findLastById()) + 1;
        return this.YoutubeService.creatYoutube(createYoutubeDto);
    }

    @Post('update')
    @UsePipes(ValidationPipe)
    updateTagBlog(@Body() updateYoutubeDto: YoutubeDto) {
        return this.YoutubeService.updateYoutube(updateYoutubeDto);
    }

    @Post('delete')
    delete(@Body() id: number) {
        return this.YoutubeService.deleteYoutube(id);
    }
}
