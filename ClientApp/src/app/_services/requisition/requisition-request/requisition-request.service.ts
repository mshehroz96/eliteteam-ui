import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Response } from 'src/app/_models/common/response';
import { PostJob, RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { RequisitionStatus } from 'src/app/_models/requisition/requisition-status';
import { RequisitionScreeningQuestionsStatus, ScreeningQuestion } from 'src/app/_models/requisition/screening-question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RequisitionRequestService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  
  activeStepIndex = new BehaviorSubject<number>(0);
  requisitionRequest = new RequisitionRequest;
  requisitionRequest$ = new BehaviorSubject<RequisitionRequest>(new RequisitionRequest());

  constructor(private http: HttpClient) { 
    this.requisitionRequest = new RequisitionRequest();
    this.requisitionRequest$.subscribe((data: RequisitionRequest)=>{
      this.requisitionRequest=data;
    });
  }

  
  public createOrUpdateRequisition(payload: RequisitionRequest): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/CreateOrUpdateRequisition`, payload, this.httpOptions);
  }

  public getRequisition(id: string): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Requisition/GetRequisitionById/${id}`);
  }

  public getCampaignTypesThreshold(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Requisition/getCampaignTypesThreshold`);
  }

  public getScreeningQuestion(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Requisition/GetRequisitionScreeningQuestion/${id}`);
  }
  public updateRequisitionScreenQuestion(payload: ScreeningQuestion): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/updateRequisitionScreenQuestion`, payload, this.httpOptions);
  }
  
  public updateRequisitionScreeningQuestionsStatus(payload: RequisitionScreeningQuestionsStatus): Observable<Response>
  {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/UpdateRequisitionScreeningQuestionsStatus`, payload, this.httpOptions);
  }

  public updateRequisitionJpmStatus(payload: RequisitionStatus): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/UpdateRequisitionJpmStatus`, payload, this.httpOptions);
  }

  public postJob(payload: PostJob): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/PostJob`, payload, this.httpOptions);
  }

  public updateRequisitionStatus(payload: RequisitionStatus): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Requisition/UpdateRequisitionStatus`, payload, this.httpOptions);
  }

  public destroy()
  {
    this.activeStepIndex= new BehaviorSubject<number>(0);
    this.requisitionRequest=new RequisitionRequest();
  }

  public fetchCompanyIdByJobUUID(uuid:string): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Requisition/FetchCompanyIdByJobUUID?uuid=${uuid}`);
  }

}
