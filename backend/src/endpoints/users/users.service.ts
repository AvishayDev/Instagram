import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Tables/User";
import { DataSource, Repository, getManager } from "typeorm";
import { CreateUserDB } from "./dbtypes/CreateUser.db";
import { CheckUsernamePasswordDB } from "./dbtypes/CheckUsernamePassword.db";
import { getSelectObject, removeKeys } from "../HelpFunctions";
import { Post } from "src/Tables/Post";




@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        //private readonly dataSource: DataSource
    ){}
    
    getAllUsers(){
        return this.usersRepository.find();
    }


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
            throw new NotFoundException('username or password incurrent')
        }

        return user;
    }

    async getUserPosts(userId:number){

        return await this.postsRepository.createQueryBuilder('post')
                        .select(['post.imageUrl', 'COUNT(like.id) AS likes'])
                        .leftJoin('post.likes','like')
                        .where('post.userId = :userId',{userId})
                        .groupBy('post.id')
                        .orderBy('post.createdAt','DESC')
                        .getRawMany();


    }
}