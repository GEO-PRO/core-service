import { HttpStatus } from '@nestjs/common';
import { Youtube } from 'src/entity/youtube/youtube.entity';
import { Repository } from 'typeorm';
import { YoutubeDto } from './youtube.dto';
export declare class YoutubeService {
    private readonly YoutubeRepository;
    constructor(YoutubeRepository: Repository<Youtube>);
    getAll(): Promise<Youtube[]>;
    findIdYoutube(idFind: any): Promise<any[]>;
    findLastById(): Promise<number>;
    creatYoutube(createYoutubeDto: YoutubeDto): Promise<HttpStatus.NOT_FOUND | "true">;
    updateYoutube(updateYoutube: any): Promise<Youtube | HttpStatus.NOT_FOUND>;
    deleteYoutube(idDelete: any): Promise<any>;
}
