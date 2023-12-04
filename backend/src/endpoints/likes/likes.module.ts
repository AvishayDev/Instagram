import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from 'src/Tables/Like';
import { User } from 'src/Tables/User';
import { UsersService } from '../users/users.service';
import { Post } from 'src/Tables/Post';
import { PostsService } from '../posts/posts.service';


@Module({
  imports:[TypeOrmModule.forFeature([Like,User,Post])],
  controllers: [LikesController],
  providers: [LikesService,UsersService,PostsService]
})
export class LikesModule {}
