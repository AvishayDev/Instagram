import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CheckUserExistsDTO } from "./dtos/CheckUserExistence.dto";
import { addUserDTO } from "./dtos/AddUser.dto";
import { LoginUserDTO } from "./dtos/LoginUser.dto";
import { PasswordValidationPipe } from "./pips/PasswordMatch.pip";



@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers();
    }

    @Post('check')
    checkUserExists(
        @Body() checkUserExistsDTO:CheckUserExistsDTO
    ){
        return this.usersService.checkUsernameExists(checkUserExistsDTO.username)
    }

    @Post('register')
    addUser(
        @Body(new PasswordValidationPipe())addUserDTO:addUserDTO
    ){
        return this.usersService.createUser(addUserDTO)
    }

    @Post('login')
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