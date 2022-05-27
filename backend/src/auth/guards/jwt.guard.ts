import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from "@nestjs/common";

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
    return user;

    // if (err || !user) {
    //   throw err || new UnauthorizedException();
    // }
    // return user;
  }
}