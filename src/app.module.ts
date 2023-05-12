import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataEntity } from './app.entity';
import { TagBlogModule } from './tag_blog/tag_blog.module';
import { BlogsModule } from './blogs/blogs.module';
import { UploadfileModule } from './uploadfile/uploadfile.module';
import { DocsModule } from './docs/docs.module';
import { TagDocModule } from './tag_doc/tag_doc.module';
import { TitleDocModule } from './title_doc/title_doc.module';
import { TitleExamModule } from './title_exam/title_exam.module';
import { TagExamModule } from './tag_exam/tag_exam.module';
import { ExamsModule } from './exams/exams.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // host: configService.get('POSTGRES_HOST'),
        // port: +configService.get<number>('POSTGRES_PORT'),
        // username: configService.get('POSTGRES_USER'),
        // password: configService.get('POSTGRES_PASSWORD'),
        // database: configService.get('POSTGRES_DB'),
        host: "210.245.96.134",
        port: 5434,
        username: "pgadmin",
        password: "pgadmin",
        database: "geo_pro",
        entities: dataEntity,
        // Production: set to true
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join('src', 'uploadfile', 'images'),
      serveRoot: '/images',
    }),
    TagBlogModule,
    BlogsModule,
    UploadfileModule,
    DocsModule,
    TagDocModule,
    TitleDocModule,
    TitleExamModule,
    TagExamModule,
    ExamsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
