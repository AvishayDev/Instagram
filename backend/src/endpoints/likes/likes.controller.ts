import { Body, Controller, Delete, Get, Post, Request } from "@nestjs/common";
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
        @Body() likeSignDTO:SignLikeDTO,
        @Request() req,
    ){
        const {userId} = req;
        return this.likesService.signLike({...likeSignDTO,userId})
    }

    @Delete(LikesEndPoints.UNSIGN)
    unsignLike(
        @Body() likeSignDTO:SignLikeDTO,
        @Request() req,
    ){
        const {userId} = req;
        return this.likesService.unsignLike({...likeSignDTO,userId})
    }
}