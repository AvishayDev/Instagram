import { IsAlpha, IsAlphanumeric, IsDefined, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateBy } from "class-validator";


export class addUserDTO {
    
    @IsAlpha()
    firstName:string;

    @IsAlpha()
    lastName:string;

    @IsAlphanumeric()
    username:string;

    @IsString()
    password:string;

    @IsString()
    rePassword:string;
    
    @IsUrl()
    @IsOptional()
    profileImageUrl:string;

    @IsString()
    @IsOptional()
    bio:string;
}