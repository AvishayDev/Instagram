import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Like } from "./Like";


@Entity({name:'posts'})
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    imageUrl: string;

    @ManyToOne(()=> User,(user)=>user.posts)
    user:User;

    @OneToMany(()=> Like, (like)=>like.post)
    likes: Like[];

    @Column({nullable:true})
    text:string;

    @CreateDateColumn()
    createdAt:Date;
}