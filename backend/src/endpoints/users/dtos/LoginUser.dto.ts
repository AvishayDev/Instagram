import { IsAlphanumeric, IsDefined, IsNotEmpty, IsString } from "class-validator";


export class LoginUserDTO {
    @IsNotEmpty()
    @IsDefined()
    @IsAlphanumeric()
    username:string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    password:string;
}