import { Like } from "src/Tables/Like";
import { Repository } from "typeorm";
import { SignLikeDB } from "./dbtypes/SignLike.db";
import { NotFoundException } from "@nestjs/common";





export class LikesRepository extends Repository<Like> {


    getLike(signLikeDB:SignLikeDB,withDeleted:boolean){
        const like =  this.findOne({
            withDeleted,
            where: {
                post:{
                    id:signLikeDB.postId
                },
                user:{
                    id:signLikeDB.userId
                }}
        })

        if (!like){
            throw new NotFoundException(`Like with postId ${signLikeDB.postId} and userId ${signLikeDB.userId} Doesn't Exists!`)
        }

        return like;
    }
}