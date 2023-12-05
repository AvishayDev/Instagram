import { IsNumber, IsOptional, IsString, IsUrl } from "class-validator";



export class AddPostDTO{
    @IsUrl()
    @IsOptional()
    imageUrl:string;

    @IsNumber()
    userId:number;

    @IsString()
    @IsOptional()
    text:string;
}