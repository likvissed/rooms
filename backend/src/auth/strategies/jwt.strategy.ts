import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Strategy } from 'passport-local';
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
      secretOrKey: process.env.JWT_KEY,
    });
  }  
  
  async validate(payload: any): Promise<any> {
    const user = await this.authService.validateUser(payload.tn);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user[0];
  }
}