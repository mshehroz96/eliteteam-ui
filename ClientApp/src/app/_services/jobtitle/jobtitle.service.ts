import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Response } from 'src/app/_models/common/response';
import { environment } from 'src/environments/environment';
import { createOrUpdateJobTitleRequest } from 'src/app/_models/jobtitle/createOrUpdateJobTitleRequest';

@Injectable({
  providedIn: 'root',
})
export class JobTitleService {
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public getJobTitleDetailsById(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}JobTitle/GetJobTitleDetailsById/${id}`);
  }
  public createOrUpdateJobTitle(payload:createOrUpdateJobTitleRequest): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}JobTitle/CreateOrUpdateJobTitle`, payload,this.httpOptions);
  }
  public updateJobDescription(payload:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}JobTitle/UpdateJobDescription`, payload,this.httpOptions);
  }
  public updateJOneWayInterviewTemplate(payload:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}JobTitle/UpdateJOneWayInterviewTemplate`, payload,this.httpOptions);
  }
  public saveJobTitleCategories(payload:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}JobTitle/SaveJobTitleCategories`, payload,this.httpOptions);
  }
  public saveJobTitle(payload:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}JobTitle/SaveJobTitle`, payload,this.httpOptions);
  }
  public getJPMJobTitleScreeningQuestions(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}JobTitle/GetJPMJobTitleScreeningQuestions/${id}`);
  }
  public getAllJobTitleCategories(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}JobTitle/GetAllJobTitleCategories`);
  }
  public saveAssociatedJobs(payload:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}JobTitle/SaveAssociatedJobs`, payload,this.httpOptions);
  }
  
}
