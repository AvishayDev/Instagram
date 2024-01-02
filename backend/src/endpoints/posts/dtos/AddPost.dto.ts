import { IsNumber, IsOptional, IsString, IsUrl, Max, MaxLength } from "class-validator";
import { MaxLengths } from "src/consts/MinMax";



export class AddPostDTO{
    @IsUrl()
    @MaxLength(MaxLengths.IMAGE_URL)
    @IsOptional()
    imageUrl:string;

    @IsString()
    @MaxLength(MaxLengths.POST_TEXT)
    @IsOptional()
    text:string;
}