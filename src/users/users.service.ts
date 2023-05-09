import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/users/users.entity';
import { Repository } from 'typeorm';
import { UsersDto } from './users.dto';
import { LocalStorageService } from 'src/component-service/localStorageService';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly UsersRepository: Repository<Users>,
        private readonly localStorageService: LocalStorageService
    ) { }

    async getAll() {
        return this.UsersRepository.find()
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
        } catch (error) {
            return 0;
        }
    }

    async userRegister(createUserDto: UsersDto) {
        try {
            const checkName = await this.UsersRepository.findOne({
                where: { name: createUserDto.name }
            })
            if (checkName) { return "Tên đã tồn tại" }

            const newUser = this.UsersRepository.create({ ...createUserDto, created_at: new Date(), update_at: new Date() })
            this.UsersRepository.save(newUser)
            return "Đăng ký thành công"
        } catch (error) {
            return HttpStatus.NOT_FOUND
        }
    }

    async updateUser(updateUsers) {
        try {
            await this.UsersRepository.update(
                updateUsers.id,
                updateUsers,
            );
            return await this.UsersRepository.findOne({
                where: {
                    id: updateUsers.id,
                },
            });
        } catch (error) {
            return HttpStatus.NOT_FOUND;
        }
    }

    async userLogin(userLogin) {
        const checkUserLogin = await this.UsersRepository.findOne({
            where: {
                name: userLogin.name,
                password: userLogin.password
            }
        })

        if (checkUserLogin) {
            const encryptedUsername = this.localStorageService.encryptData(userLogin.name);
            return {
                message: "Đăng nhập thành công",
                token: encryptedUsername
            }
        } else {
            return "Đăng nhập thất bại"
        }
    }
}
