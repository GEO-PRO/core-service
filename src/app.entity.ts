import { Blogs } from "./entity/blogs.entity";
import { Files } from "./entity/files.entity";
import { LinkFilesBlog } from "./entity/link_files_blog.entity";
import { LinkTagBlog } from "./entity/link_tag_blog.entity";
import { TagBlog } from "./entity/tag_blog.entity";

export const dataEntity = [Blogs, Files, TagBlog, LinkTagBlog, LinkFilesBlog]
