import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { SignLikeDTO } from "./dtos/SignLike.dto";
import { EndPoints, LikesEndPoints } from "src/consts/EndPoints";



@Controller(EndPoints.LIKES)
export class LikesController {

    constructor(
        private likesService: LikesService,
    ){}


    @Post(LikesEndPoints.SIGN)
    signLike(
        @Body() likeSignDTO:SignLikeDTO
    ){
        return this.likesService.signLike(likeSignDTO)
    }

    @Delete(LikesEndPoints.UNSIGN)
    unsignLike(
        @Body() likeSignDTO:SignLikeDTO
    ){
        return this.likesService.unsignLike(likeSignDTO)
    }
}