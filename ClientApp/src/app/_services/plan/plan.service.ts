import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/_models/common/response';
import { PlanFilters } from 'src/app/_models/Plan/IPlanFilters';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  public getAllPlans(payload: PlanFilters): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Plan/GetAllPlans`, payload , this.httpOptions);
  }
  public addUpdatePlan(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Plan/SaveUpdatePlan`, payload , this.httpOptions);
  }
  public deletePlan(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Plan/DeletePlan`, payload , this.httpOptions);
  }

}
