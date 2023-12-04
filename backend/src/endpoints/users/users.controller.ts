import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CheckUserExistsDTO } from "./dtos/CheckUserExistence.dto";



@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}


    @Post()
    checkUserExists(
        @Body() checkUserExistsDTO:CheckUserExistsDTO
    ){
        return this.usersService.checkUserExists(checkUserExistsDTO)
    }
}