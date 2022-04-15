import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { of, catchError } from 'rxjs';

@Injectable()
export default class AuthService {
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService
    ) {}

  getToken(code) {
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

  getUserInfo(access_token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    } 

    return this.httpService.post(process.env.AC_USER_INFO_URI, {}, { headers: headers })
      .pipe(
        map(response => response.data)
      )
  }

  generateJwt(user_data) {
    const payload = {
      id_tn: user_data['id_tn'],
      tn: user_data['tn'],
      dept: user_data['dept'],
      fio: user_data['fio'],
      tel: user_data['tel'],
      email: user_data['email'],
      fio_initials: user_data['fio_initials'],
      login: user_data['login']
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }
  
}