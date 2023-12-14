import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Tables/User";
import { Repository } from "typeorm";
import { CreateUserDB } from "./dbtypes/CreateUser.db";
import { CheckUsernamePasswordDB } from "./dbtypes/CheckUsernamePassword.db";
import { getSelectObject, removeKeys } from "../HelpFunctions";
import { Post } from "src/Tables/Post";




@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Post) private postsRepository: Repository<Post>,

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
        return await this.postsRepository.query(`
                    SELECT
                        "post"."imageUrl",
                        COUNT("like"."id") AS "likes"
                    FROM
                        "posts" "post"
                    LEFT JOIN
                        "likes" "like" ON "like"."postId" = "post"."id" AND "like"."deletedAt" IS NULL
                    WHERE
                        "post"."userId" = $1
                    GROUP BY
                        "post"."id"
                    ORDER BY
                        "post"."createdAt" DESC
        `,[userId])


    }
}