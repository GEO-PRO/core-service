import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeNow } from 'src/component-service/time_now.service';
import { TagBlog } from 'src/entity/tag_blog.entity';
import { TagBlogController } from './tag_blog.controller';
import { TagBlogService } from './tag_blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagBlog])],
  controllers: [TagBlogController],
  providers: [TagBlogService, TimeNow]
})
export class TagBlogModule { }
