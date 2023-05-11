import { IsNotEmpty } from "class-validator";

export class ExamsDto {
    id: number;

    link_tag_exam: number[];

    @IsNotEmpty({})
    name: string

    @IsNotEmpty({})
    title_exam_id: number;

    @IsNotEmpty({})
    file: string;

    descript: string;

    image_id: number;
}