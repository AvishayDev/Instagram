import { NotFoundException } from '@nestjs/common';
import { User } from 'src/Tables/User';
import { Repository } from 'typeorm';


export interface UsersRepository extends Repository<User> {
  this: Repository<User>;
  getUserByUsername(username:string): Promise<User[]>;
  getUserById(userId:number): Promise<User[]>;
}

export const customUsersRepository: Pick<UsersRepository, any> = {
    async getUserByUsername(this: Repository<User>, username:string){
        const user = await this.findOneBy({ username })

        if (!user){
            throw new NotFoundException('Username Doesnt Exists!')
        }

        return user;
    },

    async getUserById(this: Repository<User>, userId:number){
        const user = await this.findOneBy({ id:userId })

        if (!user){
            throw new NotFoundException('userId Doesnt Exists!')
        }

        return user;
    }
  };