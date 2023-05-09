import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LinkTagDoc {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({ nullable: true })
    tag_doc_id: number

    @Column({ nullable: true })
    doc_id: number
}