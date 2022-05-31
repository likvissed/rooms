import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    // TODO: Разобраться почему в 1 раз user возвращает false
    if (user === false) {
      return;
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}