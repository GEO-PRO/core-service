import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Youtube } from 'src/entity/youtube/youtube.entity';
import { Repository } from 'typeorm';
import { YoutubeDto } from './youtube.dto';

@Injectable()
export class YoutubeService {
    constructor(
        @InjectRepository(Youtube)
        private readonly YoutubeRepository: Repository<Youtube>,
    ) { }

    async getAll() {
        return this.YoutubeRepository.find()
    }

    async findIdYoutube(idFind) {
        const query = this.YoutubeRepository.createQueryBuilder('youtube')
            .select('youtube.*')
            .where('id = :id', { id: idFind })
        return await query.getRawMany();
    }

    async findLastById() {
        const lastID = await this.YoutubeRepository.find({
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

    async creatYoutube(createYoutubeDto: YoutubeDto) {
        try {
            /* Create Youtube */
            const newYoutube =
                this.YoutubeRepository.create({ ...createYoutubeDto, created_at: new Date(), update_at: new Date() });
            this.YoutubeRepository.save(newYoutube);
            return "true"
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async updateYoutube(updateYoutube) {
        try {
            // update new youtube
            await this.YoutubeRepository.update(
                updateYoutube.id,
                updateYoutube,
            );
            return await this.YoutubeRepository.findOne({
                where: {
                    id: updateYoutube.id,
                },
            });
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async deleteYoutube(idDelete) {
        try {
            await this.YoutubeRepository.delete(idDelete);
            return idDelete.id;
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }
}
