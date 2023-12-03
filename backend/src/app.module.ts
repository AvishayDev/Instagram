import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './endpoints/users/users.module';
import { PostsModule } from './endpoints/posts/posts.module';
import { LikesModule } from './endpoints/likes/likes.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'AvishayDEV19',
    database:'instagram',
    entities:[],
    synchronize:true,
  }),UsersModule,PostsModule,LikesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
