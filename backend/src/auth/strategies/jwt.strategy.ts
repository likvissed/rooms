import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import AuthService from '../auth.service';

require('dotenv-expand').expand(require("dotenv").config({ path: '/app/.env' }));

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY
    });
  }  
  
  async validate(payload: any): Promise<any> {
    const user = await this.authService.validateUser(payload.tn);

    if (!user) {
      throw new UnauthorizedException(`Пользователь не найден с таб.№ ${payload.tn}`);
    }

    return user[0];
  }
}