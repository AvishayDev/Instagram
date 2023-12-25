import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CheckUserExistsDTO } from "./dtos/CheckUserExistence.dto";
import { addUserDTO } from "./dtos/AddUser.dto";
import { LoginUserDTO } from "./dtos/LoginUser.dto";
import { PasswordValidationPipe } from "./pips/PasswordMatch.pip";
import { EndPoints, UsersEndPoints } from "src/consts/EndPoints";



@Controller(EndPoints.USERS)
export class UsersController {

    constructor(private readonly usersService: UsersService){}
    

    @Post(UsersEndPoints.CHECK)
    checkUserExists(
        @Body() checkUserExistsDTO:CheckUserExistsDTO
    ){
        return this.usersService.checkUsernameExists(checkUserExistsDTO.username)
    }

    @Post(UsersEndPoints.REGISTER)
    addUser(
        @Body(new PasswordValidationPipe())addUserDTO:addUserDTO
    ){
        return this.usersService.createUser(addUserDTO)
    }

    @Post(UsersEndPoints.LOGIN)
    loginUser(
        @Body()loginUserDTO:LoginUserDTO
    ){
        return this.usersService.checkUsernamePassword(loginUserDTO);
    }

    @Get(':id/posts')
    getUserPosts(
        @Param('id',ParseIntPipe) userId: number
    ){
        return this.usersService.getUserPosts(userId);
    }
}