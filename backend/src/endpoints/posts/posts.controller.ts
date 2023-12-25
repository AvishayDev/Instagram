import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AddPostDTO } from "./dtos/AddPost.dto";
import { EndPoints, PostsEndPoints } from "src/consts/EndPoints";




@Controller(EndPoints.POSTS)
export class PostsController {

    constructor(private readonly postsService: PostsService){}

    @Get()
    getAllPosts(
        @Query('page',new DefaultValuePipe(0),ParseIntPipe) page:number,
        @Query('userId',new DefaultValuePipe(1),ParseIntPipe) userId:number,
    ){
        return this.postsService.getPostsByPage(page,userId);
    }

    @Post(PostsEndPoints.ADD)
    addPost(
        @Body() addPostDTO : AddPostDTO
    ){
        return this.postsService.createPost(addPostDTO);
    }

}