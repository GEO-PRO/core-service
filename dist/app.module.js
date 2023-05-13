"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_entity_1 = require("./app.entity");
const tag_blog_module_1 = require("./tag_blog/tag_blog.module");
const blogs_module_1 = require("./blogs/blogs.module");
const uploadfile_module_1 = require("./uploadfile/uploadfile.module");
const docs_module_1 = require("./docs/docs.module");
const tag_doc_module_1 = require("./tag_doc/tag_doc.module");
const title_doc_module_1 = require("./title_doc/title_doc.module");
const title_exam_module_1 = require("./title_exam/title_exam.module");
const tag_exam_module_1 = require("./tag_exam/tag_exam.module");
const exams_module_1 = require("./exams/exams.module");
const users_module_1 = require("./users/users.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const youtube_module_1 = require("./youtube/youtube.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: "210.245.96.134",
                    port: 5434,
                    username: "pgadmin",
                    password: "pgadmin",
                    database: "geo_pro",
                    entities: app_entity_1.dataEntity,
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)('images'),
                serveRoot: '/images',
            }),
            tag_blog_module_1.TagBlogModule,
            blogs_module_1.BlogsModule,
            uploadfile_module_1.UploadfileModule,
            docs_module_1.DocsModule,
            tag_doc_module_1.TagDocModule,
            title_doc_module_1.TitleDocModule,
            title_exam_module_1.TitleExamModule,
            tag_exam_module_1.TagExamModule,
            exams_module_1.ExamsModule,
            users_module_1.UsersModule,
            youtube_module_1.YoutubeModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map