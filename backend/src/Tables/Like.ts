import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";



@Entity('likes')
export class Like {

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>User,user=>user.likes)
    user:User;

    @ManyToOne(()=>Post,post=>post.likes)
    post:Post;


}