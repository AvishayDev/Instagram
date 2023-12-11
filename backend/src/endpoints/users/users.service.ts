import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Tables/User";
import { Repository } from "typeorm";
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


    async getUserByUsername(username:string){
        const user = await this.usersRepository.findOneBy({ username })

        if (!user){
            throw new NotFoundException('Username Doesnt Exists!')
        }

        return user;
    }

    async getUserById(userId:number){
        const user = await this.usersRepository.findOneBy({ id:userId })

        if (!user){
            throw new NotFoundException('userId Doesnt Exists!')
        }

        return user;
    }

    createUser(createUserDB: CreateUserDB){
        const newUser = this.usersRepository.create(createUserDB);

        return this.usersRepository.save(newUser)
    }

    async checkUsernamePassword(checkUsernamePasswordDB:CheckUsernamePasswordDB){
        const user = await this.usersRepository.findOneBy({
            username:checkUsernamePasswordDB.username,
            password:checkUsernamePasswordDB.password
        })

        if (!user){
            throw new NotFoundException('username or password incurrent')
        }

        return user;
    }
}