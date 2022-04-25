import { UserService } from './../user/user.service';
import { GetUserDto } from './dto/get-user.dto';
import { GetTokenDto } from './dto/get-token.dto';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger, Post } from '@nestjs/common';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { of, catchError } from 'rxjs';
import { GetCodeDto } from './dto/get-code.dto';
import { throwError } from 'rxjs'

/**
 * Авторизация пользователя через ЛК
 */
@Injectable()
export default class AuthService {
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService,
    private userService: UserService
    ) {}

  authorize(code: GetCodeDto) {
    return this.getToken(code)
      .pipe(
        switchMap(access_token => this.getUserInfo(access_token)),
        switchMap(data => this.findUser(data)),
        map(data => this.generateJwt(data))
      )
  }

  getToken(code: GetCodeDto) {
    const params = {
      grant_type: 'authorization_code',
      client_id: process.env.AC_CLIENT_ID,
      client_secret: process.env.AC_CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.AC_REDIRECT_URI
    } 

    return this.httpService.post(process.env.AC_TOKEN_URI, params)
      .pipe(
        map(response => response.data.access_token )
      )
  }

  getUserInfo(access_token: GetTokenDto) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    } 

    return this.httpService.post(process.env.AC_USER_INFO_URI, {}, { headers: headers })
      .pipe(
        map(response => response.data)
      )
  }

  findUser(user_data: GetUserDto) {
    return this.userService.findUser(parseInt(user_data['tn']))
      .then((user) => {
        if (user[0]) {

          const payload = Object.fromEntries(
            Object.entries(user_data)
            .filter(([key]) => ['id_tn', 'tn', 'dept', 'fio', 'tel', 'email', 'fio_initials', 'login'].includes(key))
          );

          payload['role'] = user[0].role.name;
          payload['role_description'] = user[0].role.short_description;

          return payload;
        } else {
          throw `Пользователь с таб.номером ${user_data['tn']} не найден`;
        }
      })
  }

  generateJwt(user_data) {
    return {
      token: this.jwtService.sign(user_data)
    }
  }
  
}