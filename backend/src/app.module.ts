import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './endpoints/users/users.module';
import { PostsModule } from './endpoints/posts/posts.module';
import { LikesModule } from './endpoints/likes/likes.module';
import { User } from './Tables/User';
import { Post } from './Tables/Post';
import { Like } from './Tables/Like';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './endpoints/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async (configService: ConfigService) =>({
      type:'postgres',
      host:configService.get<string>('DATABASE_HOST'),
      port:configService.get<number>('DATABASE_PORT'),
      username:configService.get<string>('DATABASE_USER_NAME'),
      password:configService.get<string>('DATABASE_PASSWORD'),
      database:configService.get<string>('DATABASE_NAME'),
      entities:[User,Post,Like],
      synchronize:true,
    }),
    inject:[ConfigService]
  }),
    ConfigModule.forRoot({isGlobal:true}),
    UsersModule, 
    PostsModule, 
    LikesModule, 
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


