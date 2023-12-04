import { Body, Controller, Get, Post } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { SignLikeDTO } from "./dtos/SignLike.dto";



@Controller('likes')
export class LikesController {

    constructor(private likesService: LikesService){}

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

}