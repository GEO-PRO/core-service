import { Module } from '@nestjs/common';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docs } from 'src/entity/docs/docs.entity';
import { LinkTagDoc } from 'src/entity/docs/link_tag_doc.entity';
import { TagDoc } from 'src/entity/docs/tag_doc.entity';
import { TitleDoc } from 'src/entity/docs/title_doc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docs, LinkTagDoc, TagDoc, TitleDoc, LinkTagDoc])],
  controllers: [DocsController],
  providers: [DocsService]
})
export class DocsModule { }
