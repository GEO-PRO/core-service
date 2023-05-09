import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({})
    @Index({ unique: true })
    name: string;

    @Column({})
    password: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    birdthday: Date;

    @Column({ nullable: true })
    image_id: number;

    @Column({})
    active: boolean


    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: Date;
}