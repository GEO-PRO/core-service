import { Module } from '@nestjs/common';
import { FilesController } from './uploadfile.controller';
import { UploadfilesService } from './uploadfile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from 'src/entity/blogs/files.entity';
import { LinkFilesBlog } from 'src/entity/blogs/link_files_blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Files, LinkFilesBlog])],
  controllers: [FilesController],
  providers: [UploadfilesService]
})
export class UploadfileModule { }
