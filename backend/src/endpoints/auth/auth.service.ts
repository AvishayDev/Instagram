import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/endpoints/users/users.service';
import { LoginUserDTO } from './dtos/LoginUser.dto';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './helpers/consts';
import * as bcrypt from 'bcrypt';
import { User } from 'src/Tables/User';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthErrors } from 'src/consts/errors/auth';
import { addUserDTO } from './dtos/AddUser.dto';
import { CreateUserDB } from '../users/dbtypes/CreateUser.db';
import { Tokens } from './types/Tokens';
import { ClientUser } from './dtos/clientUser.dto';
import { JwtPayload } from './types/jwtPayload';
import { UserData } from './types/UserData';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
      private usersService: UsersService,
      private jwtService: JwtService,
    ) {}


  saltRounds = 10;
  hashData(data:string){
    return bcrypt.hash(data,this.saltRounds)
  }

  
  async getTokens(userId:number, userData:UserData):Promise<Tokens>{

    const payload: JwtPayload = { sub:userId, userData };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload,{ expiresIn:'7d', secret:jwtConstants.RefreshTokenSecret}),
    }
  }
  
  async updateRefreshToken(userId:number, refreshToken:string){

    const hashedRefreshToken = refreshToken && await this.hashData(refreshToken);
    return await this.usersRepository.update({id:userId},{refreshToken:hashedRefreshToken})

  }

  async compareHashedData(candidateData:string, hashedData:string){
    return await bcrypt.compare(candidateData, hashedData)
  }

  getUserData(user:User):UserData{
    const {
      password, 
      posts,
      likes, 
      refreshToken,
      id,
      ...userData} = user;

      return userData;
  }

  async signin(loginUserDTO:LoginUserDTO){
    const {username,password} = loginUserDTO;

    const user = await this.usersService.getUserByUsername(username);

    if (!user || !await this.compareHashedData(password, user.password)) 
      throw new UnauthorizedException(AuthErrors.UsernameOrPasswordIncurrent);

    const userData = this.getUserData(user)
    const userTokens = await this.getTokens(user.id,userData);   
    await this.updateRefreshToken(user.id,userTokens.refresh_token);

    return userTokens;
  }  
    
  async register(createUserDB: CreateUserDB){

    const hashedPassword = await this.hashData(createUserDB.password);
    let user = this.usersRepository.create({...createUserDB,password:hashedPassword});

    const userData = this.getUserData(user)
    const userTokens = await this.getTokens(user.id,userData);
    const hashedRefreshToken = await this.hashData(userTokens.refresh_token);

    user = await this.usersRepository.save({...user,refreshToken:hashedRefreshToken});

    return userTokens;

  }


  async logout(userId:number){
    await this.updateRefreshToken(userId, null);
  }


  async getRefreshToken(userId:number, refreshToken:string){
    const user = await this.usersService.getUserById(userId);

    const isRefreshTokensMatch = await this.compareHashedData(refreshToken, user.refreshToken);
    if (!isRefreshTokensMatch) throw new UnauthorizedException(AuthErrors.AccessDenied);

    const userData = this.getUserData(user)
    const userTokens = await this.getTokens(user.id,userData);
    await this.updateRefreshToken(user.id,userTokens.refresh_token);
    
    return userTokens;

  }
}
