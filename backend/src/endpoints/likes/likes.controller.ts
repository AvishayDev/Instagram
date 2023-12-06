import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { SignLikeDTO } from "./dtos/SignLike.dto";
import { PostsLikesDTO } from "./dtos/PostsLikes.dto";



@Controller('likes')
export class LikesController {

    constructor(
        private likesService: LikesService,
    ){}

    @Get()
    getAllLikes(){
        return this.likesService.getAllLikes();
    }


    @Post('sign')
    signLike(
        @Body() likeSignDTO:SignLikeDTO
    ){
        return this.likesService.signLike(likeSignDTO)
    }

    @Delete('unsign')
    unsignLike(
        @Body() likeSignDTO:SignLikeDTO
    ){
        return this.likesService.unsignLike(likeSignDTO)
    }

    @Post('posts')
    getPostsLikes(
        @Body() postsLikesDTO:PostsLikesDTO
    ){
        return this.likesService.getPostsLikes(postsLikesDTO)
    }
}