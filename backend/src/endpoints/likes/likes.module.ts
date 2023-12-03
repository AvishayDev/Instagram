import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like } from 'src/Tables/Like';


@Module({
  imports:[TypeOrmModule.forFeature([Like])],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule {}
