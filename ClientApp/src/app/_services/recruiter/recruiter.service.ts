import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/_models/common/response';
import { RecruiterExperties, RecuriterFilter } from 'src/app/_models/recutiter/recutiter-filter';
import { recruiterRMFilter } from 'src/app/_models/recutiter/recruiterRMList';
import { RecruiterActiveJobsFilter } from 'src/app/_models/recutiter/recruiterActiveJobsFilter';
import { RequisitionRecruiter } from 'src/app/_models/client/IRecruitersAssignment';
import { IRecruiterClientAssignment } from 'src/app/_models/recutiter/IRecruiterClientAssignment';
import { RecruiterShowcasefilter } from 'src/app/_models/recutiter/recruiterhowcasefilter';
import { IRecruiterSchedule, IRecruiterScheduleDay } from 'src/app/_models/recutiter/IRecruiterSchedule';

@Injectable({
  providedIn: 'root',
})
export class RecruiterService {
  selected: string | undefined;
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public getCandidates(payload: RecuriterFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruiter/GetCandidates`, payload , this.httpOptions);
  }

  public getRecruiters(startDate: string,endDate:string,recruiterId:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruiter/GetRecruiters?startDate=${startDate}&endDate=${endDate}&recruiterId=${recruiterId}`);
  }
  public searchRecruiter(query:string): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruiter/SearchRecruiter?Query=${query}`);
  }

  public getRecruiterProfileDetails(id?:number,startDate?:string,endDate?:string,filter?:string): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruiter/GetRecruiterProfileDetails?id=${id}&startDate=${startDate}&endDate=${endDate}&filter=${filter}`);
  }
  public searchExperties(query:string): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruiter/SearchExperties?Query=${query}`);
  }
  public addExperties(payload: RecruiterExperties): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruiter/AddExperties`, payload , this.httpOptions);
  }
  public getExperties(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruiter/GetExperties?id=${id}`);
  }
  public getUserActivitySummary(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruiter/GetUserActivitySummary?id=${id}`);
  }
  public deleteExperties(id?:number): Observable<Response> {
    return this.http.delete<Response>(`${environment.webApiUrl}Recruiter/DeleteExperties?id=${id}`);
  }
  public getUserActivities(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruiter/GetUserActivities?id=${id}`);
  }
  public getRecruitersJobs(event: RecruiterActiveJobsFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruiter/GetRecruitersJobs`, event, this.httpOptions);
  }
  public getRecruiterCompanies(id?:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruiter/GetRecruiterCompanies?id=${id}`);
  }

  public SaveReassignment(payload: IRecruiterClientAssignment[]): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruiter/SaveReassignment`, payload , this.httpOptions);
  }
  // public getUserSchedules(id:number,start:string,end:string): Observable<Response> {
  //   return this.http.get<Response>(`${environment.webApiUrl}Recruiter/GetUserSchedules?id=${id}&start=${start}&end=${end}`);
  // }
  public getRequisitionDetails(requisitionId?:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruiter/GetRequisitionDetails?requisitionId=${requisitionId}`);
  }

  public getRecruiterShowCase(params: RecruiterShowcasefilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruiter/GetRecruiterShowCase`, params, this.httpOptions);
  }
  public saveUpdateSchedule(payload: IRecruiterSchedule): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruiter/SaveUpdateSchedule`, payload,this.httpOptions);
  }
  public getRecruiterSchedules(userId?:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruiter/GetRecruiterSchedules?userId=${userId}`);
  }
  public saveUpdateDailySchedules(payload?: IRecruiterScheduleDay[]): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruiter/SaveUpdateDailySchedules`, payload , this.httpOptions);
  }
  public getUserSchedules(params: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruiter/GetUserSchedules`, params, this.httpOptions);
  }

  public getActiveJobs(obj:any) : Observable<Response>
  {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/GetRequisitionsRecruiterActive`,obj, this.httpOptions);
  } 

  public getClients() : Observable<Response>
  {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetClientsByRecruiter/6`, this.httpOptions);
  }

  public getJobDetails(requestObj : any) : Observable<Response>
  {
     return this.http.post<Response>(`${environment.webApiUrl}Recruitment/GetRequisitionCombinedDataRM`,requestObj, this.httpOptions); 
  }
  
}
