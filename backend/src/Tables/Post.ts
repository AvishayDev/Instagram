import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity({name:'posts'})
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default:IMAGES.defaultPostImage})
    imageUrl: string;

    @ManyToOne(()=> User,(user)=>user.posts)
    user:User;

    // @OneToMany(()=> Post, (post)=>post.user)
    // posts: Post[];

    @Column()
    text:string;

    @Column()
    createdAt:Date;
}