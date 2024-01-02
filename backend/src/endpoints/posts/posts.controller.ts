import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query, Request } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AddPostDTO } from "./dtos/AddPost.dto";
import { EndPoints, PostsEndPoints } from "src/consts/EndPoints";




@Controller(EndPoints.POSTS)
export class PostsController {

    constructor(private readonly postsService: PostsService){}

    @Get()
    getAllPosts(
        @Query('page',new DefaultValuePipe(0),ParseIntPipe) page:number,
        @Request() req,
    ){
        const {userId} = req;
        return this.postsService.getPostsByPage(page,userId);
    }

    @Post(PostsEndPoints.ADD)
    addPost(
        @Body() addPostDTO : AddPostDTO,
        @Request() req,
    ){
        const {userId} = req;
        return this.postsService.createPost({...addPostDTO, userId});
    }

    // @Get('test')
    // test(){
    //     return this.postsService.getPostsLikes([58,57,56,55,54,53,52,51,50])
    // }

}