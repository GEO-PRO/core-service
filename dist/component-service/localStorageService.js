"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let LocalStorageService = class LocalStorageService {
    constructor() {
        this.secretKey = process.env.SECRET_KEY;
    }
    encryptData(data) {
        const cipher = crypto.createCipher('aes-256-cbc', this.secretKey);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    decryptData(data) {
        const decipher = crypto.createDecipher('aes-256-cbc', this.secretKey);
        let decrypted = decipher.update(data, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
};
LocalStorageService = __decorate([
    (0, common_1.Injectable)()
], LocalStorageService);
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=localStorageService.js.map