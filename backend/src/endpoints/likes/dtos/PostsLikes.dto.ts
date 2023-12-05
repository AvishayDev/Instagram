import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";



export class PostsLikesDTO{
    @IsArray()
    @IsNumber({},{each:true})
    postIds:number[]
}