import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TagBlog {
    @PrimaryColumn({})
    id: number;

    @Column({})
    name: string;

    @Column({
        nullable: true,
        default: '',
    })
    descript: string;

    @Column({
        nullable: true,
        default: '',
    })
    create_at: string;

    @Column({
        nullable: true,
        default: '',
    })
    update_at: string;
}