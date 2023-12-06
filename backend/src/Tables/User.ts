import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from './Post'
import { Like } from "./Like";

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username:string;

    @Column({nullable:false})
    password: string;

    @Column({nullable:true})
    profileImageUrl: string;

    @Column({nullable:false})
    firstName:string;

    @Column({nullable:false})
    lastName:string;

    @Column({nullable:true})
    bio:string;

    @OneToMany(()=> Post, (post)=>post.user)
    posts: Post[];

    @OneToMany(()=>Like,like=>like.user)
    likes:Like[];

}