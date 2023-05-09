import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LinkTagExam {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({ nullable: true })
    tag_exam_id: number

    @Column({ nullable: true })
    exam_id: number
}