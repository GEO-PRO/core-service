import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exams {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({})
    name: string

    @Column({})
    title_exam_id: number;

    @Column({})
    file: string;

    @Column({nullable: true })
    descript: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: Date;
}