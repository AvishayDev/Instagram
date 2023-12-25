import { IsAlpha, IsAlphanumeric, IsOptional, IsString, IsStrongPassword, IsUrl, MaxLength, MinLength } from "class-validator";
import { MaxLengths, MinLengths } from "src/consts/MinMax";


export class addUserDTO {
    
    @IsAlpha()
    @MinLength(MinLengths.FIRSTNAME)
    @MaxLength(MaxLengths.FIRSTNAME)
    firstName:string;

    @IsAlpha()
    @MinLength(MinLengths.LASTNAME)
    @MaxLength(MaxLengths.LASTNAME)
    lastName:string;

    @IsAlphanumeric()
    @MinLength(MinLengths.USERNAME)
    @MaxLength(MaxLengths.USERNAME)
    username:string;

    @IsStrongPassword()
    @MaxLength(MaxLengths.PASSWORD)
    password:string;

    @IsString()
    rePassword:string;
    
    @IsUrl()
    @MaxLength(MaxLengths.IMAGE_URL)
    @IsOptional()
    profileImageUrl:string;

    @IsString()
    @MaxLength(MaxLengths.BIO)
    @IsOptional()
    bio:string;
}