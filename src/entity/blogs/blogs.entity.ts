import { AfterInsert, AfterUpdate, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blogs {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({})
    title: string;

    @Column({})
    content: string;

    @Column({})
    summary: string;

    @Column({ type: 'tsvector', nullable: true })
    @Index('tsvector_column_index', { synchronize: false })
    tsvector_column: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    @AfterInsert()
    @AfterUpdate()
    formatContent() {
        const content = [this.title, this.summary].join(' ');
        const slug = content
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, '')
            .replace(/\s+/g, ' ');
        this.tsvector_column = slug;
    }
}
