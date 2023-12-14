import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/Tables/User';
import { Post } from 'src/Tables/Post';


@Module({
  imports:[TypeOrmModule.forFeature([User,Post])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
