import { Controller, Get, Logger, Post, Req, Body, Param, UnauthorizedException, Response } from '@nestjs/common';
import AuthService from './auth.service';
import { map, switchMap } from 'rxjs/operators';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
    ) {}

  @Post('authorize')
  authorize(@Body() body, @Response() res) {

    return this.authService.getToken(body.code)
          .pipe(
            switchMap(access_token => this.authService.getUserInfo(access_token)),
            map(data => {
              res.send(this.authService.generateJwt(data));
            })
          )
  }
}
