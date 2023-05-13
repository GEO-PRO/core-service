import { IsNotEmpty } from "class-validator";

export class YoutubeDto {
    id: number;

    @IsNotEmpty({})
    title: string

    @IsNotEmpty({})
    link: string;

    @IsNotEmpty({})
    iframe: string;
}