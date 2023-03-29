import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class File {
    @PrimaryColumn({})
    id: number;

    @Column({})
    name: string;

    @Column({})
    type: string;

    @Column({})
    link_file: string;
}