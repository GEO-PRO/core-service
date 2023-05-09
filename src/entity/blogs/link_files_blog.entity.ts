import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LinkFilesBlog {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({nullable: true})
    file_id: number
   
    @Column({nullable: true})
    blog_id: number
}