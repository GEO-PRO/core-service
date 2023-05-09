import { Module } from '@nestjs/common';
import { TagDocController } from './tag_doc.controller';
import { TagDocService } from './tag_doc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagDoc } from 'src/entity/docs/tag_doc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagDoc])],
  controllers: [TagDocController],
  providers: [TagDocService]
})
export class TagDocModule {}
