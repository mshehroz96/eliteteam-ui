import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/_models/common/response';
import { RequisitionFilter } from 'src/app/_models/requisition/requisition-filter';
import { UpdateNotificationSetting } from 'src/app/_models/notification/notification';
import { RequisitionJPMPendingFilter } from 'src/app/_models/requisition/requisitionJPMPendingFilter';
import { RequisitionJPMActiveFilter } from 'src/app/_models/requisition/requisitionJPMActiveFilter';
import { RequisitionJPMInactiveFilter } from 'src/app/_models/requisition/requisitionJPMInactiveFilter';
import { JobTitleJPMDefaultFilter } from 'src/app/_models/requisition/jobTitleJPMDefaultFilter';
import { RequisitionRecruiterActiveFilter } from 'src/app/_models/requisition/requisitionRecruiterActiveFilter';

@Injectable({
  providedIn: 'root',
})
export class RequisitionService {
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };


  public getRequisitions(event: RequisitionFilter): Observable<Response> {
    
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/GetRequisitions`, event, this.httpOptions);
  }

  public getRequisitionsJPMPending(event: RequisitionJPMPendingFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/GetRequisitionsJPMPending`, event, this.httpOptions);
  }

  public getJobTitlesJPMDefault(event: JobTitleJPMDefaultFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/GetJobTitlesJPMDefault`, event, this.httpOptions);
  }

  public getRequisitionsJPMActive(event: RequisitionJPMActiveFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/GetRequisitionsJPMActive`, event, this.httpOptions);
  }

  public getRequisitionsJPMInactive(event: RequisitionJPMInactiveFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/GetRequisitionsJPMInactive`, event, this.httpOptions);
  }

  public getRequisitionsRecruiterActive(event: RequisitionRecruiterActiveFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/GetRequisitionsRecruiterActive`, event, this.httpOptions);
  }

  // Shared Routes
  public getLoggedInUserDetail() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  // Notification Routes
  public getNotifications(userType: number, userId: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}User/GetNotifications?userType=${userType}`);
  }
  public updateNotificationSetting(notificationObj: UpdateNotificationSetting): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}User/UpdateNotificationSetting`, notificationObj, this.httpOptions);
  }
  public getNotificationSettings(userId: number): Observable<Response> {
    return this.http.get<any>(`${environment.webApiUrl}User/GetNotificationSettings?userId=${userId}`);
  }
}
