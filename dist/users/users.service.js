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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entity/users/users.entity");
const typeorm_2 = require("typeorm");
const localStorageService_1 = require("../component-service/localStorageService");
let UsersService = class UsersService {
    constructor(UsersRepository, localStorageService) {
        this.UsersRepository = UsersRepository;
        this.localStorageService = localStorageService;
    }
    async getAll() {
        return this.UsersRepository.find();
    }
    async findLastById() {
        const lastID = await this.UsersRepository.find({
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
    async userRegister(createUserDto) {
        try {
            const checkName = await this.UsersRepository.findOne({
                where: { name: createUserDto.name }
            });
            if (checkName) {
                return "Tên đã tồn tại";
            }
            const newUser = this.UsersRepository.create(Object.assign(Object.assign({}, createUserDto), { created_at: new Date(), update_at: new Date() }));
            this.UsersRepository.save(newUser);
            return "Đăng ký thành công";
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async updateUser(updateUsers) {
        try {
            await this.UsersRepository.update(updateUsers.id, updateUsers);
            return await this.UsersRepository.findOne({
                where: {
                    id: updateUsers.id,
                },
            });
        }
        catch (error) {
            return common_1.HttpStatus.NOT_FOUND;
        }
    }
    async userLogin(userLogin) {
        const checkUserLogin = await this.UsersRepository.findOne({
            where: {
                name: userLogin.name,
                password: userLogin.password
            }
        });
        if (checkUserLogin) {
            const encryptedUsername = this.localStorageService.encryptData(userLogin.name);
            return {
                message: "Đăng nhập thành công",
                token: encryptedUsername
            };
        }
        else {
            return "Đăng nhập thất bại";
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        localStorageService_1.LocalStorageService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map