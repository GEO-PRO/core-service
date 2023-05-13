import { Blogs } from "./entity/blogs/blogs.entity";
import { Files } from "./entity/blogs/files.entity";
import { LinkFilesBlog } from "./entity/blogs/link_files_blog.entity";
import { LinkTagBlog } from "./entity/blogs/link_tag_blog.entity";
import { TagBlog } from "./entity/blogs/tag_blog.entity";
import { Docs } from "./entity/docs/docs.entity";
import { LinkTagDoc } from "./entity/docs/link_tag_doc.entity";
import { TagDoc } from "./entity/docs/tag_doc.entity";
import { TitleDoc } from "./entity/docs/title_doc.entity";
import { Exams } from "./entity/exams/exams.entity";
import { LinkTagExam } from "./entity/exams/link_tag_exam.entity";
import { TagExam } from "./entity/exams/tag_exam.entity";
import { TitleExam } from "./entity/exams/title_exam.entity";
import { Users } from "./entity/users/users.entity";
import { Youtube } from "./entity/youtube/youtube.entity";

export const dataEntity = [
    Blogs,
    Files,
    TagBlog,
    LinkTagBlog,
    LinkFilesBlog,
    Docs,
    LinkTagDoc,
    TagDoc,
    TitleDoc,
    TitleExam,
    TagExam,
    Exams,
    LinkTagExam,
    Users,
    Youtube
]
