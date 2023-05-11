import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Docs {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({})
    name: string

    @Column({})
    title_doc_id: number;

    @Column({})
    file: string;

    @Column({nullable: true })
    descript: string

    @Column({nullable: true })
    image_id: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: Date;
}