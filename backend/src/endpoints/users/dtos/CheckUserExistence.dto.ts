import { IsAlphanumeric, IsDefined, IsNotEmpty } from "class-validator";




export class CheckUserExistsDTO {
    @IsNotEmpty()
    @IsAlphanumeric()
    username:string
}