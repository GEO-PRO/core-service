"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataEntity = void 0;
const blogs_entity_1 = require("./entity/blogs/blogs.entity");
const files_entity_1 = require("./entity/blogs/files.entity");
const link_files_blog_entity_1 = require("./entity/blogs/link_files_blog.entity");
const link_tag_blog_entity_1 = require("./entity/blogs/link_tag_blog.entity");
const tag_blog_entity_1 = require("./entity/blogs/tag_blog.entity");
const docs_entity_1 = require("./entity/docs/docs.entity");
const link_tag_doc_entity_1 = require("./entity/docs/link_tag_doc.entity");
const tag_doc_entity_1 = require("./entity/docs/tag_doc.entity");
const title_doc_entity_1 = require("./entity/docs/title_doc.entity");
const exams_entity_1 = require("./entity/exams/exams.entity");
const link_tag_exam_entity_1 = require("./entity/exams/link_tag_exam.entity");
const tag_exam_entity_1 = require("./entity/exams/tag_exam.entity");
const title_exam_entity_1 = require("./entity/exams/title_exam.entity");
const users_entity_1 = require("./entity/users/users.entity");
exports.dataEntity = [
    blogs_entity_1.Blogs,
    files_entity_1.Files,
    tag_blog_entity_1.TagBlog,
    link_tag_blog_entity_1.LinkTagBlog,
    link_files_blog_entity_1.LinkFilesBlog,
    docs_entity_1.Docs,
    link_tag_doc_entity_1.LinkTagDoc,
    tag_doc_entity_1.TagDoc,
    title_doc_entity_1.TitleDoc,
    title_exam_entity_1.TitleExam,
    tag_exam_entity_1.TagExam,
    exams_entity_1.Exams,
    link_tag_exam_entity_1.LinkTagExam,
    users_entity_1.Users
];
//# sourceMappingURL=app.entity.js.map