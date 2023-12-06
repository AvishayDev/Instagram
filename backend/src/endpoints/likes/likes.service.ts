import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "src/Tables/Like";
import { IsNull, Not, Repository } from "typeorm";
import { SignLikeDB } from "./dbtypes/SignLike.db";
import { UsersService } from "../users/users.service";
import { PostsService } from "../posts/posts.service";
import { PostsLikesDB } from "./dbtypes/PostsLikes.db";



@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(Like) private likesRepository: Repository<Like>,
        private readonly usersService: UsersService,
        private readonly postsService: PostsService
    ){}

    getAllLikes(){
        return this.likesRepository.find({
            withDeleted:true,
            relations:['user','post']
        });
    }

    async checkUserAndPost(userId:number,postId:number){
        const user = await this.usersService.getUserById(userId);

        if (!user){
            throw new NotFoundException('userId Doesnt Exists!')
        }

        const post = await this.postsService.getPostById(postId);

        if (!post){
            throw new NotFoundException('postId Doesnt Exists!')
        }

        return {user,post}
    }

    getLike(signLikeDB:SignLikeDB,withDeleted:boolean){
        return this.likesRepository.findOne({
            withDeleted,
            where: {
                post:{
                    id:signLikeDB.postId
                },
                user:{
                    id:signLikeDB.userId
                }}
        })
    }

    async signLike(signLikeDB:SignLikeDB){

        const {user,post} = await this.checkUserAndPost(signLikeDB.userId,signLikeDB.postId)
        
        const like = await this.getLike(signLikeDB, true);

        if (!like){
            const newLike = this.likesRepository.create({...signLikeDB, user ,post});
            return await this.likesRepository.save(newLike);
        } else if (like.deletedAt){
            return await this.likesRepository.restore({id:like.id});
        } else {
            throw new BadRequestException('You have Already Liked This Post!');
        }
    }


    async unsignLike(signLikeDB:SignLikeDB){
        await this.checkUserAndPost(signLikeDB.userId,signLikeDB.postId)

        const like = await this.getLike(signLikeDB, false);

        if (!like){
            throw new BadRequestException("You're dosen't Liked This Post!")
        }

        return await this.likesRepository.softDelete({id:like.id});
    }

    alignPostsLikes(postIds:number[],postLikes:{likesCount:number,postid:number}[]){

        if (postIds.length === postLikes.length) return postLikes

        let postIdsIndex = 0;
        let postLikesIndex = 0;
        while (postIdsIndex < postIds.length){
            if (postIds[postIdsIndex] !== postLikes[postLikesIndex].postid){
                postLikes.splice(postLikesIndex,0,{likesCount:0,postid:postIds[postIdsIndex]})
            }
            postIdsIndex++;
            postLikesIndex++;        
        }

        return postLikes
    }

    async getPostsLikes(postsLikesDB:PostsLikesDB){
        const postLikes = await this.likesRepository.createQueryBuilder('like')
                                              .select('COUNT(*) AS likesCount, like.postId AS postId')
                                              .where('like.postId IN (:...posts)',{posts:postsLikesDB.postIds})
                                              .groupBy('like.postId')
                                              .orderBy('like.postId','DESC')
                                              .getRawMany();
        return this.alignPostsLikes(postsLikesDB.postIds,postLikes);
        
        
    }
}