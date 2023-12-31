import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "src/Tables/Like";
import { Repository } from "typeorm";
import { SignLikeDB } from "./dbtypes/SignLike.db";
import { UsersService } from "../users/users.service";
import { PostsService } from "../posts/posts.service";
import { LikesErrors } from "src/consts/errors/likes";



@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(Like) private likesRepository: Repository<Like>,
        private readonly usersService: UsersService,
        private readonly postsService: PostsService
    ){}

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
            await this.likesRepository.save(newLike);
        } else if (like.deletedAt){
            await this.likesRepository.restore({id:like.id});
        } else {
            throw new BadRequestException(LikesErrors.PostLikedError);
        }

        return { signed:true }
    }


    async unsignLike(signLikeDB:SignLikeDB){
        await this.checkUserAndPost(signLikeDB.userId,signLikeDB.postId)

        const like = await this.getLike(signLikeDB, false);

        if (!like){
            throw new BadRequestException(LikesErrors.PostUnlikeError)
        }

        await this.likesRepository.softDelete({id:like.id});

        return { signed:false }
    }



}