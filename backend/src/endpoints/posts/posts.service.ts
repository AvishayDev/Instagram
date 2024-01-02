import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/Tables/Post";
import { DataSource, Repository } from "typeorm";
import { CreatePostDB } from "./dbtypes/CreatePost.db";
import { UsersService } from "../users/users.service";
import { PostsErrors } from "src/consts/errors/posts";
import { Like } from "src/Tables/Like";



@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        @InjectRepository(Like) private likesRepository: Repository<Like>,
        private readonly usersService: UsersService,
        ){}
    
    pageSize=10;

    getPostLikes(postId:number){

        return this.likesRepository.createQueryBuilder('like')
                                    .select(['like.user.id AS userId'])
                                    .where('like.post.id = :postId',{postId})
                                    .getRawMany()

    }


    async getPostsLikes(postIds:number[]){

        const postLikes = postIds.map((postId) => this.getPostLikes(postId))

        return await Promise.all(postLikes)
    }

    async getPostById(postId:number){
        const post = await this.postsRepository.findOneBy({ id:postId })

        if (!post){
            throw new NotFoundException(PostsErrors.PostIdNotExists)
        }

        return post
    }

    async getPostsByPageOptimised(page:number, userId:number){

        const posts = await this.postsRepository.createQueryBuilder('post')
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
                    .getRawMany();
        
         return {posts, hasNext:posts.length === this.pageSize}
    }

    async getPostsByPage(page:number, userId:number){

        const posts = await this.postsRepository.createQueryBuilder('post')
                                .select([
                                    'user.profileImageUrl AS user_profile_image_url',
                                    'user.firstName AS user_firstname',
                                    'user.lastName AS user_lastname',
                                    'post.createdAt AS upload_date',
                                    'post.imageUrl AS image_url',
                                    'post.text AS text',
                                    'post.id AS post_id',
                                ])
                                .leftJoin('post.user','user')
                                .orderBy('post.createdAt','DESC')
                                .offset(this.pageSize*page)
                                .limit(this.pageSize)
                                .getRawMany();
        
        
        const postsLikes = await this.getPostsLikes(posts.map(({post_id})=>post_id));

        return {hasNext:posts.length === this.pageSize,
                posts: posts.map((post,index)=>({
                    ...post,
                    likes:postsLikes[index].length,
                    is_liked: postsLikes[index].some((postLikes)=>postLikes.userid === userId)
                }))}
    }

    async createPost(createPostDB: CreatePostDB){
        
        const user = await this.usersService.getUserById(createPostDB.userId);

        const newPost = this.postsRepository.create({...createPostDB, user});

        await this.postsRepository.save(newPost);

        return
    }
}