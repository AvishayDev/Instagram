import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Tables/User";
import { Equal, Repository } from "typeorm";
import { CheckUserExistsDB } from "./dbtypes/CheckUserExists.db";




@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ){}
    

    checkUserExists(checkUserExistsDB : CheckUserExistsDB){
        return this.usersRepository.findBy({
            username:Equal(checkUserExistsDB.username)
        })
    }
}