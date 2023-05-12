import { UsersService } from './users.service';
import { UsersDto } from './users.dto';
import { LocalStorageService } from 'src/component-service/localStorageService';
export declare class UsersController {
    private readonly UsersService;
    private readonly localStorageService;
    constructor(UsersService: UsersService, localStorageService: LocalStorageService);
    findAll(): Promise<import("../entity/users/users.entity").Users[]>;
    userRegister(createUserDto: UsersDto): Promise<import("@nestjs/common").HttpStatus.NOT_FOUND | "Tên đã tồn tại" | "Đăng ký thành công">;
    updateUser(updateUserDto: UsersDto): Promise<import("../entity/users/users.entity").Users | import("@nestjs/common").HttpStatus.NOT_FOUND>;
    userLogin(userLogin: any): Promise<"Đăng nhập thất bại" | {
        message: string;
        token: string;
    }>;
}
