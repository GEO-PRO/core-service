import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Files {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({})
    name: string;
}