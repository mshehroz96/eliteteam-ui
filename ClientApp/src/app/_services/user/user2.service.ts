import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class User2Service {
  
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf8',
        'Access-Control-Allow-Origin': '*',
      }),
    };

  apiURL = environment.webApiUrl;
  constructor(private http : HttpClient, private authService : AuthenticationService ) { }


  public getUserDetail() : Observable<any> {
     return this.http.get(`${this.apiURL}User/GetUserDetail/${this.authService.currentUserValue.userId}`,this.httpOptions);
  }

  public saveUserDetail(userDetail : any) : Observable<any> {
    return this.http.post(`${this.apiURL}User/UpdateUserDetails`,userDetail,this.httpOptions);
  }

  public getTitles() : Observable<any>
  {
    return this.http.get(`${this.apiURL}User/GetRegisterPageData`,this.httpOptions);
  }

}
