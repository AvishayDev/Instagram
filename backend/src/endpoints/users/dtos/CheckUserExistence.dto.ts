import { IsAlphanumeric, MaxLength, MinLength } from "class-validator";
import { MaxLengths, MinLengths } from "src/consts/MinMax";




export class CheckUserExistsDTO {
    @IsAlphanumeric()
    @MinLength(MinLengths.USERNAME)
    @MaxLength(MaxLengths.USERNAME)
    username:string
}