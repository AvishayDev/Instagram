import { IsAlphanumeric, IsDefined, IsNotEmpty } from "class-validator";




export class CheckUserExistsDTO {
    @IsAlphanumeric()
    username:string
}