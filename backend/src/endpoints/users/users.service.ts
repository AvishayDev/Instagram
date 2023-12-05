import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Tables/User";
import { Equal, Repository } from "typeorm";
import { CheckUserExistsDB } from "./dbtypes/CheckUserExists.db";
import { CreateUserDB } from "./dbtypes/CreateUser.db";
import { CheckUsernamePasswordDB } from "./dbtypes/CheckUsernamePassword.db";




@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ){}
    
    getAllUsers(){
        return this.usersRepository.find();
    }


    getUserByUsername(username:string){
        return this.usersRepository.findOneBy({ username })
    }

    getUserById(userId:number){
        return this.usersRepository.findOneBy({ id:userId })
    }

    createUser(createUserDB: CreateUserDB){
        const newUser = this.usersRepository.create(createUserDB);

        return this.usersRepository.save(newUser)
    }

    checkUsernamePassword(checkUsernamePasswordDB:CheckUsernamePasswordDB){
        return this.usersRepository.findOneBy({
            username:checkUsernamePasswordDB.username,
            password:checkUsernamePasswordDB.password
        })
    }
}