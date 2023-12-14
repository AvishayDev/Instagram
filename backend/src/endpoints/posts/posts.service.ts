import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/Tables/Post";
import { Repository } from "typeorm";
import { CreatePostDB } from "./dbtypes/CreatePost.db";
import { UsersService } from "../users/users.service";



@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        private readonly usersService: UsersService
        ){}
    
    pageSize=10;

    getPostById(postId:number){
        const post = this.postsRepository.findOneBy({ id:postId })

        if (!post){
            throw new NotFoundException('postId Doesnt Exists!')
        }

        return post
    }

    getPostsByPage(page:number){
        return this.postsRepository.find({
            relations:['user','likes'],
            order:{
                createdAt: 'DESC'
            },
            skip:this.pageSize*page,
            take:this.pageSize
        })
    }

    async createPost(createPostDB: CreatePostDB){
        
        const user = await this.usersService.getUserById(createPostDB.userId);

        const newPost = this.postsRepository.create({...createPostDB, user});

        return this.postsRepository.save(newPost);
    }


}