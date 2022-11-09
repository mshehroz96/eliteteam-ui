import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserChangePassword } from 'src/app/_models/user/user';
import { Router } from '@angular/router';
import { Response } from 'src/app/_models/common/response';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUserSubject: BehaviorSubject<User>;
    public currentUser: Subject<User>;

    constructor(private http: HttpClient,
        private router: Router,
        ) {
        let currentUser = window.localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(currentUser!));
        this.currentUser = this.currentUserSubject;
    }
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf8',
            'Access-Control-Allow-Origin': '*',
        })
    };
    public get currentUserValue(): User {
        return this.currentUserSubject.value;

    }

    resetPassword(payload:any,token:string)
    {
        return this.http.post<Response>(`${environment.webApiUrl}auth/${token}/ResetPassword`, payload,
            this.httpOptions);
    }
    forgotPassword(email:string) {
        return this.http.post<Response>(`${environment.webApiUrl}auth/ForgotPassword`, { email: email }, this.httpOptions);
    }
    public changePassword(user: UserChangePassword): Observable<any> {
        return this.http.post<any>(`${environment.webApiUrl}auth/ChangePassword`, user, this.httpOptions);
    }
    verifyToken(token:string) {
        return this.http.get<Response>(`${environment.webApiUrl}auth/VerifyToken/${token}`);
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.webApiUrl}auth/AuthenticateUser`, { email, password }, 
        this.httpOptions)
            .pipe(map(res => {
                if (res.success && res.data && res.data.accessToken) {
                    console.log(res.data);
                   window.localStorage.setItem('currentUser', JSON.stringify(res.data));
                    this.currentUserSubject.next(res.data);
                    this.currentUser.next(res.data);
                }

                return res;
            }));
    }

    logout() {
        window.localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
        this.router.navigate(['/auth/login']);
    }




}
