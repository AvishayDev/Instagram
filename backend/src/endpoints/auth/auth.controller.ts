import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dtos/LoginUser.dto';
import { Public } from './helpers/auth.public';
import { PasswordValidationPipe } from '../users/pips/PasswordMatch.pip';
import { addUserDTO } from './dtos/AddUser.dto';
import { AuthEndPoints, EndPoints } from 'src/consts/EndPoints';
import { RefreshTokenGuard } from './refreshToken.guard';

@Controller(EndPoints.AUTH)
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}
    
    @Public()
    @Post(AuthEndPoints.LOGIN)
    @HttpCode(HttpStatus.OK)
    signin(
        @Body()loginUserDTO:LoginUserDTO
    ){
        return this.authService.signin(loginUserDTO);
    }

    @Public()
    @Post(AuthEndPoints.REGISTER)
    @HttpCode(HttpStatus.CREATED)
    register(
        @Body(new PasswordValidationPipe())addUserDTO:addUserDTO
    ){
        return this.authService.register(addUserDTO);
    }


    @Post(AuthEndPoints.LOGOUT)
    @HttpCode(HttpStatus.OK)
    logout(
        @Request() req
    ){
        return this.authService.logout(req.userId);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post(AuthEndPoints.REFRESH)
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @Request() req,
    ){
        return this.authService.getRefreshToken(req.userId,req.refreshToken);
    }




}
