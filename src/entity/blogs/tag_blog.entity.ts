import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TagBlog {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({})
    name: string;

    @Column({
        nullable: true,
        default: '',
    })
    descript: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: Date;
}