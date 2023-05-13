import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Youtube {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({})
    title: string;

    @Column({})
    link: string;

    @Column({})
    iframe: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: Date;
}