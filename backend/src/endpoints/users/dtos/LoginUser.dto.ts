import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";


export class LoginUserDTO {
    @IsNotEmpty()
    @IsAlphanumeric()
    username:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}