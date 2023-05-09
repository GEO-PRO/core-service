import { IsNotEmpty } from "class-validator";

export class DocsDto {
    id: number;

    link_tag_doc: number[];

    @IsNotEmpty({})
    name: string

    @IsNotEmpty({})
    title_doc_id: number;

    @IsNotEmpty({})
    file: string;

    descript: string
}