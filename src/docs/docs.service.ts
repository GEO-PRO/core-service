import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Docs } from 'src/entity/docs/docs.entity';
import { LinkTagDoc } from 'src/entity/docs/link_tag_doc.entity';
import { TagDoc } from 'src/entity/docs/tag_doc.entity';
import { TitleDoc } from 'src/entity/docs/title_doc.entity';
import { Repository } from 'typeorm';
import { DocsDto } from './docs.dto';

@Injectable()
export class DocsService {
    constructor(
        @InjectRepository(Docs)
        private readonly DocsRepository: Repository<Docs>,

        @InjectRepository(TagDoc)
        private readonly TagDocRepository: Repository<TagDoc>,

        @InjectRepository(LinkTagDoc)
        private readonly LinkTagDocRepository: Repository<LinkTagDoc>,

        @InjectRepository(TitleDoc)
        private readonly TitleDocRepository: Repository<TitleDoc>,
    ) { }

    async getAll() {
        const query = this.DocsRepository.createQueryBuilder('docs')
            .select('docs.*')
            .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(DISTINCT tag.id::text, \', \')', 'link_tag_doc')
            .addSelect('title.name', 'title_name')
            .leftJoin('link_tag_doc', 'link_tag', 'link_tag.doc_id = docs.id')
            .leftJoin('tag_doc', 'tag', 'link_tag.tag_doc_id = tag.id')
            .leftJoin('title_doc', 'title', 'title.id = docs.title_doc_id')
            .groupBy('docs.id')
            .addGroupBy('title.name')
        return await query.getRawMany();
    }

    async findIdDocs(idFind) {
        const query = this.DocsRepository.createQueryBuilder('docs')
            .select('docs.*')
            .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
            .addSelect('STRING_AGG(DISTINCT tag.id::text, \', \')', 'link_tag_doc')
            .addSelect('title.name', 'title_name')
            .leftJoin('link_tag_doc', 'link_tag', 'link_tag.doc_id = docs.id')
            .leftJoin('tag_doc', 'tag', 'link_tag.tag_doc_id = tag.id')
            .leftJoin('title_doc', 'title', 'title.id = docs.title_doc_id')
            .where('docs.id = :id', { id: idFind })
            .groupBy('docs.id')
            .addGroupBy('title.name')
        return await query.getRawMany();
    }

    async findLastById() {
        const lastID = await this.DocsRepository.find({
            order: {
                id: 'DESC',
            },
            take: 1,
        });
        try {
            return lastID[0].id;
        } catch (error) {
            return 0;
        }
    }

    async creatDocs(createDocsDto: DocsDto) {
        try {
            /* Create link tag doc */
            createDocsDto.link_tag_doc.forEach((value) => {
                const newLinkTagDoc = this.LinkTagDocRepository.create({
                    doc_id: createDocsDto.id,
                    tag_doc_id: value
                })
                this.LinkTagDocRepository.save(newLinkTagDoc);
            });

            /* Create Doc */
            const newDocs =
                this.DocsRepository.create({ ...createDocsDto, created_at: new Date(), update_at: new Date() });
            this.DocsRepository.save(newDocs);
            return "true"
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async updateDocs(updateDocs) {
        try {
            // Delete all value have doc_id and create new data in link_tag_doc
            await this.LinkTagDocRepository.delete({ doc_id: updateDocs.id });
            await updateDocs.link_tag_doc.forEach((value) => {
                const newLinkTagDoc = this.LinkTagDocRepository.create({
                    doc_id: updateDocs.id,
                    tag_doc_id: value
                })
                this.LinkTagDocRepository.save(newLinkTagDoc);
            });

            // Create new doc
            const newData = { ...updateDocs }
            const { link_tag_doc, ...dataUpdate } = newData;
            await this.DocsRepository.update(
                updateDocs.id,
                dataUpdate,
            );
            return await this.DocsRepository.findOne({
                where: {
                    id: updateDocs.id,
                },
            });
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async deleteDocs(idDelete) {
        try {
            await this.LinkTagDocRepository.delete({ doc_id: idDelete.id });
            await this.DocsRepository.delete(idDelete);
            return idDelete.id;
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async findDocsIdTitle(inputFilter) {
        const page = inputFilter.page;
        const limit = 10;
        const skip = (page - 1) * limit;

        try {
            const query = await this.DocsRepository.createQueryBuilder('docs')
                .select('docs.*')
                .addSelect('STRING_AGG(DISTINCT tag.name, \', \')', 'tag_name')
                .leftJoin('link_tag_doc', 'link_tag', 'link_tag.doc_id = docs.id')
                .leftJoin('tag_doc', 'tag', 'tag.id = link_tag.tag_doc_id')
                .where('docs.title_doc_id = :title_doc_id', { title_doc_id: inputFilter.title_id })
                .groupBy('docs.id')

            if (inputFilter.tag_id.length > 0) {
                query.andWhere('link_tag.tag_doc_id IN (:...ids)', { ids: inputFilter.tag_id })
            }
            if (inputFilter.search_key) {
                query.where('to_tsvector(unaccent(docs.name)) @@ to_tsquery(:keyword)', { keyword: inputFilter.search_key })
            }

            const getTotalData = await query.getCount();
            const totalPages = Math.ceil(getTotalData / limit);
            const result = await query.offset(skip).limit(limit).getRawMany();
            return {
                pageIn: page,
                totalPages: totalPages,
                totalData: getTotalData,
                result: result
            };
            // return query.getRawMany()
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }
}
