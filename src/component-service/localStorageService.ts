import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class LocalStorageService {
  private readonly secretKey = process.env.SECRET_KEY;

  // Hàm mã hóa dữ liệu
  public encryptData(data: string): string {
    const cipher = crypto.createCipher('aes-256-cbc', this.secretKey);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  // Hàm giải mã dữ liệu
  public decryptData(data: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', this.secretKey);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
