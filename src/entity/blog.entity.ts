import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Blog {
    @PrimaryColumn({})
    id: number;

    @Column({})
    tag_blog_id: number;

    @Column('integer', { array: true })
    file_id_arr: number[];

    @Column({})
    title: string;

    @Column({})
    content: string;
}