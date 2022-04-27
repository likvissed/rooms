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
    const url = `${environment.apiUrl}/user/new`;

    return this.http.get<NewResponseInterface>(url);
  }

  create(data: any) { //: NewResponseInterface
    const params = new HttpParams()
      .set('user', data);

    const url = `${environment.apiUrl}/user/create`;

    return this.http.post(url, params); //post<NewResponseInterface>
  }

}
