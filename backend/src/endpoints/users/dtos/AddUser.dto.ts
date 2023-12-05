import { IsAlpha, IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";


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
    //@IsEquals('password')
    rePassword:string;
    
    profileImageUrl:string;
    bio:string;
}