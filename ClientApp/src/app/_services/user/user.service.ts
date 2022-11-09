import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserChangePassword } from 'src/app/_models/user/user';
import { Event } from 'src/app/_models/event/event';
import { Response } from 'src/app/_models/common/response';
import { UpdateNotificationSetting } from 'src/app/_models/notification/notification';
import { Register } from 'src/app/_models/user/register';
import { UserFilter } from 'src/app/_models/user/userFilter';
import { UserDetails } from 'src/app/_models/user/UserDetails';
import { UserDetailsRequest } from 'src/app/_models/user/UserDetailsRequest';
import { ClientDetail } from 'src/app/_models/client/client';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  public getUsers(params: UserFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}User/GetUsers`, params, this.httpOptions);
  }

  public getUsersForDropdown(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/GetUsersForDropdown`);
  }

  public getUsersOverView(): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}User/GetUsersOverView`, { userType: 1 }, this.httpOptions);
  }
  public createUser(user: User): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}User/CreateUser`, user, this.httpOptions);
  }
  public selfRegister(inputDto:ClientDetail): Observable<Response> {
    return this.http.post<any>(`${environment.webApiUrl}User/SelfRegister`, inputDto, this.httpOptions);
  }
  public getRegisterPageData(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/GetRegisterPageData`, this.httpOptions);
  }
  public updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${environment.webApiUrl}User/UpdateUser`, user, this.httpOptions);
  }
  public getUser(userId: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/GetUser/${userId}`);
  }
  public deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${environment.webApiUrl}User/DeleteUser/${userId}`);
  }
  public getUserDetail(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.webApiUrl}User/GetUserDetail/${userId}`);
  }
  public getUserTimeline(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.webApiUrl}User/GetUserTimeline/${userId}`);
  }
  public approveUser(user: User): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}User/ApproveUser`, user, this.httpOptions);
  }
  public getUserTypeList(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/GetUserTypeList`);
  }

  public getLanguages(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/GetLanguageList`);
  }

  public updateUserDetails(payload:UserDetails): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}User/UpdateUserDetails`, payload, this.httpOptions);
  }

  public getAllUserEvents(eventId: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Event/GetAllUserEvent/?userId=${1}`);
  }
  public getEvent(eventId: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Event/GetEvent/?id=${eventId}`);
  }

  public createEvent(event: Event): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}Event/CreateEvent`, event, this.httpOptions);
  }

  public deleteEvent(eventId: number): Observable<any> {
    return this.http.delete<any>(`${environment.webApiUrl}Event/DeleteEventById?EventId=${eventId}`);
  }

  // Shared Routes
  public getLoggedInUserDetail() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');

  }

  // Notification Routes
  public getNotifications(userType: number, userId: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/GetNotifications?userType=${userType}`);
  }
  public updateNotificationSetting(notificationObj:UpdateNotificationSetting): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}User/UpdateNotificationSetting`, notificationObj, this.httpOptions);
  }

  public getNotificationSettings(userId: number): Observable<Response> {
    return this.http.get<any>(`${environment.webApiUrl}User/GetNotificationSettings?userId=${userId}`);
  }
  public getUserActivities(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/GetUserActivities?id=${id}`);
  }

  public getUserLoginActivities(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/GetUserLoginActivities/${id}`);
  }

  public getCurrentUserDetail(payload:UserDetails): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}User/GetCurrentUserDetail`, payload, this.httpOptions);
  }
  public deactivateUserAccount(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/DeactivateUserAccount?id=${id}`, this.httpOptions);
  }
  // public blockUser(user: User): Observable<any> {
  //   return this.http.post<any>(`${environment.webApiUrl}User/BlockUser`, user, this.httpOptions);
  // }
  public blockUser(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/BlockUser?id=${id}`, this.httpOptions);
  }
  public getCurrentUserDetailByEmail(email:string): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/GetCurrentUserDetailByEmail?email=${email}`, this.httpOptions);
  }

  public getCompanyPrimaryRecruiterDetail(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/GetCompanyPrimaryRecruiterDetail`, this.httpOptions);
  }

  public getUserActivties(first: number,rows:number,userId:number): Observable<Response> {
    return this.http.get<any>(`${environment.webApiUrl}User/GetUserActivitiesById?first=${first}&rows=${rows}&userId=${userId}`);
  }

}
