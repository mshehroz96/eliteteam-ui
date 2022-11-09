import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/common/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatUsersService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public getUsers(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}chatUser/GetUsers`);
  }

}
