import { IsNotEmpty } from "class-validator";

export class LinkTagBlogDto {
    id: number;

    @IsNotEmpty({})
    tag_blog_id: number
   
    @IsNotEmpty({})
    blog_id: number
}