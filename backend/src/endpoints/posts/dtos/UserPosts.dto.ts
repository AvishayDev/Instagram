import { IsNumber } from "class-validator";


export class UserPostsDTO {
    @IsNumber()
    userId:number
}