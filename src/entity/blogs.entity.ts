import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blogs {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({ type: 'jsonb', nullable: true, })
    file_id_arr: number[];

    @Column({})
    title: string;

    @Column({})
    content: string;

    @Column({})
    summary: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: Date;
}
