import { Body, Controller, Get, Param, ParseIntPipe, Post, Request } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CheckUserExistsDTO } from "./dtos/CheckUserExistence.dto";
import { addUserDTO } from "../auth/dtos/AddUser.dto";
import { LoginUserDTO } from "../auth/dtos/LoginUser.dto";
import { PasswordValidationPipe } from "./pips/PasswordMatch.pip";
import { EndPoints, UsersEndPoints } from "src/consts/EndPoints";
import { Public } from "../auth/helpers/auth.public";



@Controller(EndPoints.USERS)
export class UsersController {

    constructor(private readonly usersService: UsersService){}
    

    @Public()
    @Get('test')
    test(){
        return this.usersService.test();
    }


    @Public()
    @Post(UsersEndPoints.CHECK)
    checkUserExists(
        @Body() checkUserExistsDTO:CheckUserExistsDTO
    ){
        return this.usersService.checkUsernameExists(checkUserExistsDTO.username)
    }

    // @Public()
    // @Post(UsersEndPoints.REGISTER)
    // addUser(
    //     @Body(new PasswordValidationPipe())addUserDTO:addUserDTO
    // ){
    //     return this.usersService.createUser(addUserDTO)
    // }

    // @Public()
    // @Post(UsersEndPoints.LOGIN)
    // loginUser(
    //     @Body()loginUserDTO:LoginUserDTO
    // ){
    //     return this.usersService.checkUsernamePassword(loginUserDTO);
    // }

    @Get(UsersEndPoints.POSTS)
    getUserPosts(
        @Request() req,
    ){
        const {userId} = req
        return this.usersService.getUserPosts(userId);
    }
}