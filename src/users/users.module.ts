import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/users/users.entity';
import { LocalStorageService } from 'src/component-service/localStorageService';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, LocalStorageService],
  controllers: [UsersController]
})
export class UsersModule { }
