import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { jwtConstants } from './helpers/consts';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './helpers/auth.public';
import { JwtPayload } from './types/jwtPayload';
import { AuthErrors } from 'src/consts/errors/auth';
import { ForbiddenException403 } from './helpers/ForbiddenException';
import { extractTokenFromHeader } from './helpers/ExtractTokenFromHeader';
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
        ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException(AuthErrors.AccessDenied);
        }
        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(
                token, { secret: jwtConstants.AccessTokenSecret } 
            );
            request['userId'] = payload.sub;
        } catch (error){
            if (error instanceof TokenExpiredError) 
                throw new ForbiddenException403(AuthErrors.TokenExpired);
            
            if (error instanceof JsonWebTokenError) 
                throw new UnauthorizedException(AuthErrors.InvalidToken);
            
            
            throw new UnauthorizedException(AuthErrors.AccessDenied);
        }
        return true;
    }
}