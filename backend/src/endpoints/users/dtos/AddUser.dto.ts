import { IsAlpha, IsAlphanumeric, IsOptional, IsString, IsStrongPassword, IsUrl } from "class-validator";


export class addUserDTO {
    
    @IsAlpha()
    firstName:string;

    @IsAlpha()
    lastName:string;

    @IsAlphanumeric()
    username:string;

    @IsStrongPassword()
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