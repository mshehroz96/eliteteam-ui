import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/_models/common/response';
import { RecuriterFilter } from 'src/app/_models/recutiter/recutiter-filter';
import { AddJobCandidateDto, ShareCandidateToClientDto, ShowCaseDto } from 'src/app/_models/showcase/showcase';
import { ClientShowCaseFilter } from 'src/app/_models/client/clientshowcasefilter';
import { ThresholdsFilters } from 'src/app/_models/threshold/thresholdsFilters';

@Injectable({
  providedIn: 'root'
})
export class ThresholdService {

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  
  public getAllThresholds(payload: ThresholdsFilters): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Threshold/GetAllThresholds`, payload , this.httpOptions); 
  }
  
  public saveThreshold(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Threshold/SaveThreshold`, payload , this.httpOptions); 
  }
}
