"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const youtube_entity_1 = require("../entity/youtube/youtube.entity");
const typeorm_2 = require("typeorm");
let YoutubeService = class YoutubeService {
    constructor(YoutubeRepository) {
        this.YoutubeRepository = YoutubeRepository;
    }
    async getAll() {
        return this.YoutubeRepository.find();
    }
    async findIdYoutube(idFind) {
        const query = this.YoutubeRepository.createQueryBuilder('youtube')
            .select('youtube.*')
            .where('id = :id', { id: idFind });
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
        }
        catch (error) {
            return 0;
        }
    }
    async creatYoutube(createYoutubeDto) {
        try {
            const newYoutube = this.YoutubeRepository.create(Object.assign(Object.assign({}, createYoutubeDto), { created_at: new Date(), update_at: new Date() }));
            this.YoutubeRepository.save(newYoutube);
            return "true";
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async updateYoutube(updateYoutube) {
        try {
            await this.YoutubeRepository.update(updateYoutube.id, updateYoutube);
            return await this.YoutubeRepository.findOne({
                where: {
                    id: updateYoutube.id,
                },
            });
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async deleteYoutube(idDelete) {
        try {
            await this.YoutubeRepository.delete(idDelete);
            return idDelete.id;
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
};
YoutubeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(youtube_entity_1.Youtube)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], YoutubeService);
exports.YoutubeService = YoutubeService;
//# sourceMappingURL=youtube.service.js.map