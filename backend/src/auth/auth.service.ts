import { GetUserDto } from './dto/get-user.dto';
import { GetTokenDto } from './dto/get-token.dto';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { of, catchError } from 'rxjs';
import { GetCodeDto } from './dto/get-code.dto';

/**
 * Авторизация пользователя через ЛК
 */
@Injectable()
export default class AuthService {
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService
    ) {}

  authorize(code: GetCodeDto) {
    return this.getToken(code)
      .pipe(
        switchMap(access_token => this.getUserInfo(access_token)),
        map(data => this.generateJwt(data))
      )
  }

  getToken(code: GetCodeDto) {
    Logger.error('getToken');
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
    Logger.error('getUserInfo', access_token);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    } 

    return this.httpService.post(process.env.AC_USER_INFO_URI, {}, { headers: headers })
      .pipe(
        map(response => response.data)
      )
  }

  generateJwt(user_data: GetUserDto) {
    const payload = Object.fromEntries(
      Object.entries(user_data)
      .filter(([key]) => ['id_tn', 'tn', 'dept', 'fio', 'tel', 'email', 'fio_initials', 'login'].includes(key))
    );

    return {
      token: this.jwtService.sign(payload)
    }
  }
  
}