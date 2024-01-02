import { IsAlphanumeric, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { MaxLengths, MinLengths } from "src/consts/MinMax";


export class LoginUserDTO {
    @IsAlphanumeric()
    @MinLength(MinLengths.USERNAME)
    @MaxLength(MaxLengths.USERNAME)
    username:string;

    @IsStrongPassword()
    @MaxLength(MaxLengths.PASSWORD)
    password:string;
}