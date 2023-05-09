import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogs } from 'src/entity/blogs/blogs.entity';
import { LinkTagBlog } from 'src/entity/blogs/link_tag_blog.entity';
import { LinkFilesBlog } from 'src/entity/blogs/link_files_blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blogs, LinkTagBlog, LinkFilesBlog])],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule { }
