import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { jwtConstants } from './helpers/consts';
import { JwtPayload } from './types/jwtPayload';
import { AuthErrors } from 'src/consts/errors/auth';
import { ForbiddenException403 } from './helpers/ForbiddenException';
import {extractTokenFromHeader} from './helpers/ExtractTokenFromHeader'
  
@Injectable()
export class RefreshTokenGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const refreshToken = extractTokenFromHeader(request);
        if (!refreshToken) {
            throw new UnauthorizedException(AuthErrors.AccessDenied);
        }
        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(
                refreshToken, { secret: jwtConstants.RefreshTokenSecret } 
            );
            request['userId'] = payload.sub;
            request['refreshToken'] = refreshToken;
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