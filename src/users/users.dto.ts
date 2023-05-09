import { IsNotEmpty } from "class-validator"

export class UsersDto {
    id: number

    @IsNotEmpty({})
    name: string

    @IsNotEmpty({})
    password: string

    @IsNotEmpty({})
    active: boolean
}