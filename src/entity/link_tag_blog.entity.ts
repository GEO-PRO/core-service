import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LinkTagBlog{
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({nullable: true})
    tag_blog_id: number
   
    @Column({nullable: true})
    blog_id: number
}