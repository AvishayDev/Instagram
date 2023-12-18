import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AddPostDTO } from "./dtos/AddPost.dto";




@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService){}

    @Get()
    getAllPosts(
        @Query('page',new DefaultValuePipe(0),ParseIntPipe) page:number,
        @Query('userId',new DefaultValuePipe(1),ParseIntPipe) userId:number,
    ){
        return this.postsService.getPostsByPage(page,userId);
    }

    @Post('add')
    addPost(
        @Body() addPostDTO : AddPostDTO
    ){
        return this.postsService.createPost(addPostDTO);
    }
    
    @Get('test')
    runTest(){
        return this.postsService.testEp();
    }

}