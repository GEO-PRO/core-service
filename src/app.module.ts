import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataEntity } from './app.entity';
import { BlogModule } from './blog/blog.module';
import { TagBlogModule } from './tag_blog/tag_blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: dataEntity,
        // Production: set to true
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BlogModule,
    TagBlogModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
