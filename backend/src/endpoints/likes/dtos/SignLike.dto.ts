import { IsNumber } from "class-validator"



export class SignLikeDTO{
    @IsNumber()
    postId:number
}