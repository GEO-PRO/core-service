import { YoutubeService } from './youtube.service';
import { YoutubeDto } from './youtube.dto';
export declare class YoutubeController {
    private readonly YoutubeService;
    constructor(YoutubeService: YoutubeService);
    findAll(): Promise<import("../entity/youtube/youtube.entity").Youtube[]>;
    findId(id: number): Promise<any[]>;
    create(createYoutubeDto: YoutubeDto): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | "true">;
    updateTagBlog(updateYoutubeDto: YoutubeDto): Promise<import("../entity/youtube/youtube.entity").Youtube | import("@nestjs/common").HttpStatus.NOT_FOUND>;
    delete(id: number): Promise<any>;
}
