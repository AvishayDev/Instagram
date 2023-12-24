import { IsAlphanumeric } from "class-validator";




export class CheckUserExistsDTO {
    @IsAlphanumeric()
    username:string
}