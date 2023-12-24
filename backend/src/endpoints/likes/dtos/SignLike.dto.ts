import { IsNumber } from "class-validator"



export class SignLikeDTO{
    @IsNumber()
    userId:number;
    @IsNumber()
    postId:number
}