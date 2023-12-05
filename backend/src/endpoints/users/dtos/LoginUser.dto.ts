import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";


export class LoginUserDTO {
    @IsAlphanumeric()
    username:string;

    @IsString()
    password:string;
}