import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "src/Tables/Like";
import { IsNull, Not, Repository } from "typeorm";
import { SignLikeDB } from "./dbtypes/SignLike.db";
import { UsersService } from "../users/users.service";
import { PostsService } from "../posts/posts.service";



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

        let newLike;
        if (!like){
            // like === null => create new like.
            newLike = this.likesRepository.create({...signLikeDB, user ,post});
            newLike = await this.likesRepository.save(newLike);
        } else if (like.deletedAt){
            // like && deteledAt => restore.
            newLike = await this.likesRepository.restore({id:like.id});
        } else {
            // like && !deletedAt => Exception.
            throw new BadRequestException('You have Already Liked This Post!');
        }

        return newLike;

    }


    async unsignLike(signLikeDB:SignLikeDB){
        await this.checkUserAndPost(signLikeDB.userId,signLikeDB.postId)

        const like = await this.getLike(signLikeDB, false);

        if (!like){
            throw new BadRequestException("You're dosen't Liked This Post!")
        }

        const affectedRows = await this.likesRepository.softDelete({id:like.id});

        return affectedRows;
    }
}