import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/Tables/Post";
import { Repository } from "typeorm";
import { CreatePostDB } from "./dbtypes/CreatePost.db";
import { UserPostsDB } from "./dbtypes/UserPosts.db";
import { UsersService } from "../users/users.service";



@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        private readonly usersService: UsersService
        ){}
    
    pageSize=10;

    getPostById(postId:number){
        return this.postsRepository.findOneBy({ id:postId })
    }

    async checkUserExists(userId:number){
        const user = await this.usersService.getUserById(userId);

        if (!user){
            throw new NotFoundException('userId Doesnt Exists!')
        }

        return user;
    }

    getPostsByPage(page:number){
        return this.postsRepository.find({
            relations:['user'],
            order:{
                createdAt: 'DESC'
            },
            skip:this.pageSize*page,
            take:this.pageSize
        })
    }

    async createPost(createPostDB: CreatePostDB){
        
        const user = await this.checkUserExists(createPostDB.userId);

        const newPost = this.postsRepository.create({...createPostDB, user});

        return this.postsRepository.save(newPost);
    }

    async getUserPosts(userPostsDB:UserPostsDB){
        
        await this.checkUserExists(userPostsDB.userId);


        return this.postsRepository.find({
            select:{
                imageUrl:true,
                id:true
            },
            where:{
                user:{
                    id:userPostsDB.userId
                }
            },
            order:{
                id: "DESC"
            }
        })
    }

}