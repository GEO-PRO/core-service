import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TitleDoc } from 'src/entity/docs/title_doc.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TitleDocService {
    constructor(
        @InjectRepository(TitleDoc)
        private readonly TitleDocRepository: Repository<TitleDoc>,
    ) { }

    getAll() {
        return this.TitleDocRepository.find()
    }

    creatTitleDoc(createRequest) {
        try {
            const newTitleDoc =
                this.TitleDocRepository.create({ ...createRequest, created_at: new Date(), update_at: new Date() });
            return this.TitleDocRepository.save(newTitleDoc);
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async updateTitleDoc(updateTitleDoc) {
        try {
            await this.TitleDocRepository.update(
                updateTitleDoc.id,
                { ...updateTitleDoc, update_at: new Date() },
            );
            return await this.TitleDocRepository.findOne({
                where: {
                    id: updateTitleDoc.id,
                },
            });
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    findIdTitleDoc(id: number) {
        return this.TitleDocRepository.findOne({
            where: {
                id: id,
            },
        });
    }

    deleteTitleDoc(id: number) {
        try {
            this.TitleDocRepository.delete(id);
            return id;
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }
}
