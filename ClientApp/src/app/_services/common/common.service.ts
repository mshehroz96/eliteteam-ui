import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/_models/common/response';
import { ActivityDto } from 'src/app/_models/common/common';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public uploadFile(file: any, path:string):Observable<Response> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('path', path);

    return this.http.post<Response>(`${environment.webApiUrl}Storage/Upload`, formData);
  }

  public downloadFile(fileName: string): any {

    return this.http.get(`${environment.webApiUrl}Storage/Download?filename=${fileName}`, { responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  public uploadFileWithFileName(file: any, path:string,fileName:string):Observable<Response> {
    let formData: FormData = new FormData();
    formData.append('file', file, fileName);
    formData.append('path', path);

    return this.http.post<Response>(`${environment.webApiUrl}Storage/Upload`, formData);
  }

  public uploadFileWithProgress(file: any, path: string): Observable<HttpEvent<Response>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('path', path);

    return this.http.post<Response>(`${environment.webApiUrl}Storage/Upload`, formData,{reportProgress:true,observe:'events'});
  }

  public getListItems(keyCode:string): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetListItems/${keyCode}`);
  }

  public getUserType(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetUserType`);
  }

  public getUserStatus(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetUserStatus`);
  }

  public searchJobTitles(payload:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Common/SearchJobTitles`, payload,this.httpOptions);
  }

  public getJobTitleCategories(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetJobTitleCategories/${id}`);
  }
  public getFilters(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetFilters`);
  }

  public getAllJobTitles(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetAllJobTitles`);
  }

  public getCandidateDropDownItems(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetCandidateDropDownItems`);
  }

  public searchFilterForCandidate(payload:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Common/SearchFilterForCandidate`, payload,this.httpOptions);
  }

  public searchCompanies(payload:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Common/SearchCompanies`, payload,this.httpOptions);
  }

  public getCompanyUsers(): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Common/GetCompanyAndUsers`,this.httpOptions);
  }

  public getClientsByRecruiter(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetClientsByRecruiter/${id}`);
  }

  public searchClientUsers(payload:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Common/SearchClientUsers`, payload,this.httpOptions);
  }

  public getAllCompaniesUsers(): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Common/GetAllCompaniesUsers`,this.httpOptions);
  }

  public getRequisitionForCalendar(): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Common/GetRequisitionForCalendar`,this.httpOptions);
  }

  public getUsersByType(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetUsersByType/${id}`);
  }

  public addActivity(activity: ActivityDto): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Common/AddActivity`,activity,this.httpOptions);
  }

  public getAllCategories(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetAllCategories`);
  }

  public getJobTitleDomains(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetAllDomains`);
  }

  public getOneWayInterviewTemplates(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetOneWayInterviewTemplates`);
  }
  public getAllPlans(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetAllPlans`);
  }

  public getOfferTemplates(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Common/GetOfferTemplates`);
  }
}
