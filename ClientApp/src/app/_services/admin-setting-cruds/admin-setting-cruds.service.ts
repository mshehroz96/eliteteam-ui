
import { userAvailablityFilter, userSlotFilter } from './../../_models/client/candidatefilter';
import { CandidateOfferInput } from './../../_models/candidate/candidate';
import { Event } from './../../_models/event/event';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/_models/common/response';
import { candidatefilter } from 'src/app/_models/client/candidatefilter';
import { OneWayInterviewUpdateStatusInput } from 'src/app/_models/one-way-interview/one-way-interview-answer';
import { IOWITFiters } from 'src/app/_models/AdminSettingCruds/IAdminSettingCruds';



@Injectable({
  providedIn: 'root'
})
export class AdminSettingCrudsService {
  selected: string | undefined;
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*'
    }),
  };
  
  public getAllOWIT(payload: IOWITFiters): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}AdminSettingsCruds/GetAllOWIT`, payload , this.httpOptions);
  }
  public saveUpdateOWIT(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}AdminSettingsCruds/SaveUpdateOWIT`, payload , this.httpOptions);
  }
  public deleteOWIT(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}AdminSettingsCruds/DeleteOWIT`, payload , this.httpOptions);
  }

  public getAllOfferLetters(payload: IOWITFiters): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}AdminSettingsCruds/GetAllOfferLetters`, payload , this.httpOptions);
  }
  public saveUpdateOfferLetters(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}AdminSettingsCruds/SaveUpdateOfferLetters`, payload , this.httpOptions);
  }
  public deleteOfferLetters(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}AdminSettingsCruds/DeleteOfferLetters`, payload , this.httpOptions);
  }
}
