import { IsNumber } from "class-validator"
import { IsNull } from "typeorm"



export class SignLikeDTO{
    @IsNumber()
    userId:number;
    @IsNumber()
    postId:number
}