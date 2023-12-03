import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({default:IMAGES.defaultUserProfileImage})
    profileImageUrl: string;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    bio:string;

    @OneToMany(()=> Post, (post)=>post.user)
    posts: Post[];

    @OneToMany(()=>Like,like=>like.user)
    likes:Like[];

}