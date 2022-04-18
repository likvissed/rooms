import { Controller, Get, Logger, Post, Req, Body, Param, UnauthorizedException, Response, HttpStatus } from '@nestjs/common';
import AuthService from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { catchError, Observable, throwError } from 'rxjs';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
    ) {}

  @Post('authorize')
  async authorize(@Body() body, @Response() res) {

    // TODO: Добавить сообщение об ошибке пользователю
    // TODO: Переделать на `try catch`
    await this.authService.authorize(body.code)
      .subscribe(data => res.send(data),
        (error) => {
          error.response;
        })
  }
}
