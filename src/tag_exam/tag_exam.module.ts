import { Module } from '@nestjs/common';
import { TagExamController } from './tag_exam.controller';
import { TagExamService } from './tag_exam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagExam } from 'src/entity/exams/tag_exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagExam])],
  controllers: [TagExamController],
  providers: [TagExamService]
})
export class TagExamModule {}
