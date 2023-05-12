import { HttpStatus } from '@nestjs/common';
import { Users } from 'src/entity/users/users.entity';
import { Repository } from 'typeorm';
import { UsersDto } from './users.dto';
import { LocalStorageService } from 'src/component-service/localStorageService';
export declare class UsersService {
    private readonly UsersRepository;
    private readonly localStorageService;
    constructor(UsersRepository: Repository<Users>, localStorageService: LocalStorageService);
    getAll(): Promise<Users[]>;
    findLastById(): Promise<number>;
    userRegister(createUserDto: UsersDto): Promise<HttpStatus.NOT_FOUND | "Tên đã tồn tại" | "Đăng ký thành công">;
    updateUser(updateUsers: any): Promise<Users | HttpStatus.NOT_FOUND>;
    userLogin(userLogin: any): Promise<"Đăng nhập thất bại" | {
        message: string;
        token: string;
    }>;
}
