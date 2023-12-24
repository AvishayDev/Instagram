import { IsArray, IsNumber } from "class-validator";



export class PostsLikesDTO{
    @IsArray()
    @IsNumber({},{each:true})
    postIds:number[]
}