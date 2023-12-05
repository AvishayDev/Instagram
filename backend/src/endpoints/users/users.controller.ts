import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CheckUserExistsDTO } from "./dtos/CheckUserExistence.dto";
import { addUserDTO } from "./dtos/AddUser.dto";
import { LoginUserDTO } from "./dtos/LoginUser.dto";



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
        return this.usersService.getUserByUsername(checkUserExistsDTO.username)
    }

    @Post('register')
    addUser(
        @Body()addUserDTO:addUserDTO
    ){
        return this.usersService.createUser(addUserDTO)
    }

    @Post('login')
    loginUser(
        @Body()loginUserDTO:LoginUserDTO
    ){
        return this.usersService.checkUsernamePassword(loginUserDTO);
    }
}