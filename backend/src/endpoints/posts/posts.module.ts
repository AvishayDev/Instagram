import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from 'src/Tables/Post';


@Module({
  imports:[TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
