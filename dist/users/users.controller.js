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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_dto_1 = require("./users.dto");
const localStorageService_1 = require("../component-service/localStorageService");
let UsersController = class UsersController {
    constructor(UsersService, localStorageService) {
        this.UsersService = UsersService;
        this.localStorageService = localStorageService;
    }
    findAll() {
        return this.UsersService.getAll();
    }
    async userRegister(createUserDto) {
        createUserDto.id = (await this.UsersService.findLastById()) + 1;
        return this.UsersService.userRegister(createUserDto);
    }
    updateUser(updateUserDto) {
        return this.UsersService.updateUser(updateUserDto);
    }
    userLogin(userLogin) {
        return this.UsersService.userLogin(userLogin);
    }
};
__decorate([
    (0, common_1.Get)('get-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UsersDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userRegister", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UsersDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "userLogin", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        localStorageService_1.LocalStorageService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map