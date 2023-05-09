import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './users.dto';
import { LocalStorageService } from 'src/component-service/localStorageService';

@Controller('users')
export class UsersController {
    constructor(
        private readonly UsersService: UsersService,
        private readonly localStorageService: LocalStorageService) { }

    @Get('get-all')
    findAll() {
        return this.UsersService.getAll()
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    async userRegister(@Body() createUserDto: UsersDto) {
        createUserDto.id = (await this.UsersService.findLastById()) + 1;
        return this.UsersService.userRegister(createUserDto)
    }

    @Post('update')
    @UsePipes(ValidationPipe)
    updateUser(@Body() updateUserDto: UsersDto) {
        return this.UsersService.updateUser(updateUserDto);
    }

    @Post('login')
    userLogin(@Body() userLogin) {
        // const encryptedUsername = this.localStorageService.encryptData(userLogin.name);

        // const decryptedUsername = this.localStorageService.decryptData(encryptedUsername);
        // return decryptedUsername
        return this.UsersService.userLogin(userLogin)
    }
}
