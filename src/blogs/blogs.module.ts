import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogs } from 'src/entity/blogs.entity';
import { LinkTagBlog } from 'src/entity/link_tag_blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blogs, LinkTagBlog])],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule { }
