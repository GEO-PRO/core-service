import { Module } from '@nestjs/common';
import { TitleDocService } from './title_doc.service';
import { TitleDocController } from './title_doc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitleDoc } from 'src/entity/docs/title_doc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TitleDoc])],
  providers: [TitleDocService],
  controllers: [TitleDocController]
})
export class TitleDocModule { }
