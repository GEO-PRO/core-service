import { Module } from '@nestjs/common';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';
import { Youtube } from 'src/entity/youtube/youtube.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Youtube])],
  controllers: [YoutubeController],
  providers: [YoutubeService]
})
export class YoutubeModule { }
