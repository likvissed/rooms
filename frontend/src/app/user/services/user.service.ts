import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewResponseInterface } from './../types/new-response.interfece';
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient
  ) {}

  new() {
    const url = `${environment.apiUrl}/users/new`;

    return this.http.get(url); // <NewResponseInterface>
  }

  create(data: any) { //: NewResponseInterface
    // const params = new HttpParams()
    //   .set('user', data);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const url = `${environment.apiUrl}/users/create`;

    return this.http.post(url, data , { headers }); // post<NewResponseInterface>
  }

}
