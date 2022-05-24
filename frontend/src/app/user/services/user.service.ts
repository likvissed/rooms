import { UserInterface } from './../types/user.interface';
import { EditResponseInterface } from './../types/edit-response.interface';
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

  getUsers() {
    const url = `${environment.apiUrl}/users`;

    return this.http.get(url);
  }

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

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}/delete`)
  }

  edit(id: number) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.get<EditResponseInterface>(`${environment.apiUrl}/users/${id}/edit`, { headers })
  }

  update(id: number, user: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.put(`${environment.apiUrl}/users/${id}/update`, user , { headers })
  }

}
