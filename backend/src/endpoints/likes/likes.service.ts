import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "src/Tables/Like";
import { Repository } from "typeorm";
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

    getLike(signLikeDB:SignLikeDB){
        return this.likesRepository.findOneBy({
            post:{
                id:signLikeDB.postId
            },
            user:{
                id:signLikeDB.userId
            }
        })
    }

    async signLike(signLikeDB:SignLikeDB){

        const {user,post} = await this.checkUserAndPost(signLikeDB.userId,signLikeDB.postId)
        
        const like = await this.getLike(signLikeDB);
        
        if (like){
            throw new BadRequestException('You have Already Liked This Post!')
        }

        // add soft delete
        //deletedAt, IsNull(), restore
        const newLike = this.likesRepository.create({...signLikeDB, user ,post});

        return this.likesRepository.save(newLike);
    }


    unsignLike(){

    }
}