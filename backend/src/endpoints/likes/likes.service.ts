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
        try {
            
            const user = await this.usersService.getUserById(userId);
            const post = await this.postsService.getPostById(postId);
            return {user,post}
        
        } catch (error){
            throw error;
        }

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

        return { signed:true }
    }


    async unsignLike(signLikeDB:SignLikeDB){
        await this.checkUserAndPost(signLikeDB.userId,signLikeDB.postId)

        const like = await this.getLike(signLikeDB, false);

        if (!like){
            throw new BadRequestException("You're dosen't Liked This Post!")
        }

        await this.likesRepository.softDelete({id:like.id});

        return { unsigned:true }
    }



}