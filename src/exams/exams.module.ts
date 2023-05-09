import { Module } from '@nestjs/common';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exams } from 'src/entity/exams/exams.entity';
import { LinkTagExam } from 'src/entity/exams/link_tag_exam.entity';
import { TagExam } from 'src/entity/exams/tag_exam.entity';
import { TitleExam } from 'src/entity/exams/title_exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exams, LinkTagExam, TagExam, TitleExam, LinkTagExam])],
  controllers: [ExamsController],
  providers: [ExamsService]
})
export class ExamsModule { }
