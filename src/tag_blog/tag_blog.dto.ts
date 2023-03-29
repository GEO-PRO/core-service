import { IsNotEmpty } from "class-validator";

export class TagBlogDto {
    id: number;

    @IsNotEmpty()
    name: string;
}