import { Module } from '@nestjs/common';
import { TitleExamService } from './title_exam.service';
import { TitleExamController } from './title_exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitleExam } from 'src/entity/exams/title_exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TitleExam])],
  providers: [TitleExamService],
  controllers: [TitleExamController]
})
export class TitleExamModule { }
