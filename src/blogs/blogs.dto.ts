import { IsNotEmpty } from "class-validator";

export class BlogsDto {
    id: number;

    link_tag_blog: number[];

    @IsNotEmpty({})
    title: string;

    @IsNotEmpty({})
    content: string;

    @IsNotEmpty({})
    summary: string;
}