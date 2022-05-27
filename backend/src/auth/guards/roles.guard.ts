import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException, Logger } from "@nestjs/common";


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;
    console.log('user!!!!', user);

    if (user && user.role && roles.includes(user.role.name)) {
      return true;
    }

    return false;
  }
}
