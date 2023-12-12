import { Injectable, NotFoundException } from "@nestjs/common";
import { Post } from "src/Tables/Post";
import { Repository } from "typeorm";

@Injectable()
export class PostsRepository extends Repository<Post> {

    getPostById(postId:number){
        const post = this.findOneBy({ id:postId });

        if (!post){
            throw new NotFoundException(`Post with postId ${postId} Doesn't Exists!`)
        }

        return post;
    }

}