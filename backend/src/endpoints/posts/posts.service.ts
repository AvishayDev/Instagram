import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/Tables/Post";
import { Repository } from "typeorm";
import { CreatePostDB } from "./dbtypes/CreatePost.db";
import { UsersService } from "../users/users.service";
import { Like } from "src/Tables/Like";



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

    // getPostsByPage(page:number){
    //     return this.postsRepository.find({
    //         relations:['user','likes'],
    //         order:{
    //             createdAt: 'DESC'
    //         },
    //         skip:this.pageSize*page,
    //         take:this.pageSize
    //     })
    // }

    async getPostsByPage(page:number, userId:number){

        return await this.postsRepository.createQueryBuilder('post')
            .select([
                'user.profileImageUrl AS user_profile_image_url',
                'user.firstName AS user_firstname',
                'user.lastName AS user_lastname',
                'post.createdAt AS upload_date',
                'post.imageUrl AS image_url',
                'post.text AS text',
                'post.id AS post_id',
                'COUNT(like.id)::integer AS likes',
                `COUNT(CASE WHEN like.user.id = :userId THEN 1 ELSE NULL END)::integer AS is_liked`,
            ])
            .leftJoin('post.user','user')
            .leftJoin('post.likes','like')
            .groupBy('post.id, user.id')
            .orderBy('post.createdAt','DESC')
            .offset(this.pageSize*page)
            .limit(this.pageSize)
            .setParameters({ userId })
            .getRawMany()
    }

    async createPost(createPostDB: CreatePostDB){
        
        const user = await this.usersService.getUserById(createPostDB.userId);

        const newPost = this.postsRepository.create({...createPostDB, user});

        return this.postsRepository.save(newPost);
    }


}