import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Tables/User";
import { Repository } from "typeorm";
import { CreateUserDB } from "./dbtypes/CreateUser.db";
import { CheckUsernamePasswordDB } from "./dbtypes/CheckUsernamePassword.db";
import { getSelectObject } from "../HelpFunctions";
import { Post } from "src/Tables/Post";
import { UsersErrors } from "src/consts/errors/users";




@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Post) private postsRepository: Repository<Post>,
    ){}


    async checkUsernameExists(username: string){
        try {
            await this.getUserByUsername(username)
        } 
        catch {
            return { exists:false };
        }
        

        return { exists:true };
    }

    async getUserByUsername(username:string){
        const user = await this.usersRepository.findOneBy({ username })

        if (!user){
            throw new NotFoundException(UsersErrors.UsernameNotExists)
        }

        return user;
    }

    async getUserById(userId:number){
        const user = await this.usersRepository.findOneBy({ id:userId })

        if (!user){
            throw new NotFoundException(UsersErrors.UserIdNotExists)
        }

        return user;
    }

    createUser(createUserDB: CreateUserDB){
        const newUser = this.usersRepository.create(createUserDB);

        return this.usersRepository.save(newUser)
    }

    async checkUsernamePassword(checkUsernamePasswordDB:CheckUsernamePasswordDB){
        const user = await this.usersRepository.findOne({
            select: getSelectObject(['id','username',
                                     'profileImageUrl','firstName',
                                     'lastName','bio']),
            where: {
                username:checkUsernamePasswordDB.username,
                password:checkUsernamePasswordDB.password
            }
        })

        if (!user){
            throw new NotFoundException(UsersErrors.UsernameOrPasswordIncurrent)
        }

        return user;
    }

    async getUserPosts(userId:number){

        return await this.postsRepository.createQueryBuilder('post')
                        .select(['post.imageUrl as image_url', 'COUNT(like.id) AS likes'])
                        .leftJoin('post.likes','like')
                        .where('post.userId = :userId',{userId})
                        .groupBy('post.id')
                        .orderBy('post.createdAt','DESC')
                        .getRawMany();


    }
}