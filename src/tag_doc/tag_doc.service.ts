import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagDoc } from 'src/entity/docs/tag_doc.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagDocService {
    constructor(
        @InjectRepository(TagDoc)
        private readonly TagDocRepository: Repository<TagDoc>,
    ) { }

    getAll(title_id) {
        const query = this.TagDocRepository.createQueryBuilder('tag_doc')
            .select('tag_doc.*')
            .addSelect('count(tag_doc.id)', 'count')
            .leftJoin('link_tag_doc', 'link_tag', 'link_tag.tag_doc_id = tag_doc.id')
            .leftJoin('docs', 'docs', 'link_tag.doc_id = docs.id')
            .groupBy('tag_doc.id')
        if (title_id) {
            query.where('docs.title_doc_id = :title_doc_id', { title_doc_id: title_id })
        }
        return query.getRawMany()
    }

    creatTagDoc(createRequest) {
        try {
            const newTagDoc =
                this.TagDocRepository.create({ ...createRequest, created_at: new Date(), update_at: new Date() });
            return this.TagDocRepository.save(newTagDoc);
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async updateTagDoc(updateTagDoc) {
        try {
            await this.TagDocRepository.update(
                updateTagDoc.id,
                { ...updateTagDoc, update_at: new Date() },
            );
            return await this.TagDocRepository.findOne({
                where: {
                    id: updateTagDoc.id,
                },
            });
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    findIdTagDoc(id: number) {
        return this.TagDocRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    deleteTagDoc(id: number) {
        try {
            this.TagDocRepository.delete(id);
            return id;
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }
}
