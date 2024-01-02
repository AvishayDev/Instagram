import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Tables/User';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './helpers/consts';
import { AuthGuard } from './auth.guard';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
            UsersModule,
            JwtModule.register({
              global: true,
              secret: jwtConstants.AccessTokenSecret,
              signOptions: { expiresIn: '60s' },

            }),
          ],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],

})
export class AuthModule {}
