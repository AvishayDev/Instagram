import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from 'src/Tables/Post';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { User } from 'src/Tables/User';


@Module({
  imports:[TypeOrmModule.forFeature([Post,User]),UsersModule],
  controllers: [PostsController],
  providers: [PostsService,UsersService]
})
export class PostsModule {}
