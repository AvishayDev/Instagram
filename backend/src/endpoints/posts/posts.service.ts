import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/Tables/Post";
import { DataSource, Repository } from "typeorm";
import { CreatePostDB } from "./dbtypes/CreatePost.db";
import { UsersService } from "../users/users.service";



@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        private readonly usersService: UsersService,
        @InjectDataSource() private readonly dataSource: DataSource
        ){}
    
    pageSize=10;


    async testEp(){
        return await this.dataSource.createQueryBuilder()
                                    .select('*')
                                    .from((qb)=>{
                                        return qb.select('*')
                                                .from(Post,'post')
                                                .where('post.userId = 1')
                                    },'post')
                                    .getRawMany();
    }

    async getPostById(postId:number){
        const post = await this.postsRepository.findOneBy({ id:postId })

        if (!post){
            throw new NotFoundException('postId Doesnt Exists!')
        }

        return post
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

    async createPost(createPostDB: CreatePostDB){
        
        const user = await this.usersService.getUserById(createPostDB.userId);

        const newPost = this.postsRepository.create({...createPostDB, user});

        return this.postsRepository.save(newPost);
    }


}