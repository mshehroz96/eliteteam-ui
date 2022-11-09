import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisitionFeedback } from 'src/app/_models/requisition/feedback/requisition-feedback';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RequisitionFeedbackService {
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  public createRequisitionFeedback(feedback: RequisitionFeedback): Observable<Response> {
    
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/CreateRequisitionFeedback`, feedback, this.httpOptions);
  }
}
