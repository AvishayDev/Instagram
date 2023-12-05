import { IsAlpha, IsAlphanumeric, IsDefined, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateBy } from "class-validator";


export class addUserDTO {
    
    @IsNotEmpty()
    @IsAlpha()
    firstName:string;

    @IsNotEmpty()
    @IsAlpha()
    lastName:string;

    @IsNotEmpty()
    @IsAlphanumeric()
    username:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsNotEmpty()
    @IsString()
    rePassword:string;
    
    @IsUrl()
    @IsOptional()
    profileImageUrl:string;

    @IsString()
    @IsOptional()
    bio:string;
}