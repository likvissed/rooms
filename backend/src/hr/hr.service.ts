import { RedisCacheService } from '../shared/redis-cache-service';
import { switchMap, catchError } from 'rxjs/operators';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable, of, repeat } from 'rxjs';

@Injectable()
export class HrService {
  constructor(
    private httpService: HttpService,
    private redis: RedisCacheService
  ) {}

  async findByTn(tn: number): Promise<any> {
    let user = await this.findEmpTn(tn);

    return user.data.data[0];
  }

  async getValidToken() {
    let token = await this.redis.get('token_hr');

    if (token == null) { 
      let new_token = await this.getNewToken();

      // TODO: Изменить срок действия (1000)
      await this.redis.set('token_hr', new_token.data.token, 1000);
    }

    return await this.redis.get('token_hr');
  }

  async getNewToken() {
    const headersRequest = {
      'X-Auth-Username': process.env.NAME_USER_HR,
      'X-Auth-Password': process.env.PASSWORD_USER_HR
    };

    const response = this.httpService.post(process.env.USERS_REFERENCE_URI_LOGIN, {}, { headers: headersRequest })
      .toPromise();

    return response;
  }

  async findEmpTn(tn: number) {
    let token = await this.getValidToken();

    const headersRequest = {
      'X-Auth-Token': `${token}`
    };

    const response = this.httpService.get(`${process.env.USERS_REFERENCE_URI}/emp?search=personnelNo==${tn}`, { headers: headersRequest })
      .toPromise();

    return response;
  }

}
