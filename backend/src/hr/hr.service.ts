import { switchMap, catchError } from 'rxjs/operators';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable, of, repeat } from 'rxjs';

@Injectable()
export class HrService {
  constructor(
    private httpService: HttpService
  ) {}

  findByTn(tn: number): any {
    return this.findEmpTn(tn)
      .pipe(
        map(response => {
          return response.data
        }),
        catchError(error=> {
          console.log('error', error.response.status);
          if (error.response.status == 401) {
            return of('401')
          }
        }),
        map(data => {
          if (data == '401') {
            this.getNewToken();

            return this.findEmpTn(tn)
                    .pipe(
                      switchMap((response:any) => of(response.data))
                  )
          }

          return data
        })
      )
      // .toPromise()
      // .subscribe((response) => {
      //   console.log('HRRR:', response[0])

      //   return response[0]
      // })
  }

  getNewToken() {
    const headersRequest = {
      'X-Auth-Username': process.env.NAME_USER_HR,
      'X-Auth-Password': process.env.PASSWORD_USER_HR
    };

    return this.httpService.post(process.env.USERS_REFERENCE_URI_LOGIN, {}, { headers: headersRequest })
      .pipe(
        map(response => {
          console.log('token', response.data.token);
          return response.data.token
        } )
      )
  }

  findEmpTn(tn: number) {
    const headersRequest = {
      'X-Auth-Token': '62df0772-b5fe-4ab2-934c-81884cedcd97'
    };

    return this.httpService.get(`${process.env.USERS_REFERENCE_URI}/emp?search=personnelNo==${tn}`, { headers: headersRequest })
      .pipe(
        map(response => response.data )
      )
  }
}
