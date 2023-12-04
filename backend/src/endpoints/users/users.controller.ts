import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CheckUserExistsDTO } from "./dtos/CheckUserExistence.dto";
import { addUserDTO } from "./dtos/AddUser.dto";



@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}


    @Post('check')
    checkUserExists(
        @Body() checkUserExistsDTO:CheckUserExistsDTO
    ){
        return this.usersService.checkUserExists(checkUserExistsDTO)
    }

    @Post('add')
    addUser(
        @Body()addUserDTO:addUserDTO
    ){
        return this.usersService.createUser(addUserDTO)
    }
}