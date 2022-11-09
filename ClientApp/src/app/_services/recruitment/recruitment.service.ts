import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/common/response';
import { ApplicantScheduleInterview, InterviewFeedBack, RedactDetail } from 'src/app/_models/recruitment/requisition-candidate';
import { RequisitionApplicantStatus } from 'src/app/_models/recruitment/requisition-candidate-filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  
  public getRequisitionCandidatesByStatusRM(event: any): Observable<Response> {
    
    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/GetRequisitionCandidatesByStatusRM`, event, this.httpOptions);
  }


  public getRequisitionCandidatesByStatusClient(event: any): Observable<Response> {
    
    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/GetRequisitionCandidatesByStatusClient`, event, this.httpOptions);
  }

  public getRequisitionCombinedDataRM(event: any): Observable<Response> {
    
    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/GetRequisitionCombinedDataRM`, event, this.httpOptions);
  }


  
  public getApplicantProfileData(event: any): Observable<Response> {

    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/GetApplicantProfileData`, event, this.httpOptions);
  }

  public getInterviewFeedback(interviewId: number): Observable<Response> {

    return this.http.get<Response>(`${environment.webApiUrl}Recruitment/GetInterviewFeedback/${interviewId}`);
  }
  public getApplicantInterViewDetails(applicantId: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruitment/GetApplicantInterViewDetails/${applicantId}`);
  }

  public getApplicantResumeDetails(applicantId: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruitment/GetApplicantResumeDetails/${applicantId}`);
  }

  public getCandidateDefaultRedact(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Threshold/GetCandidateDefaultRedact`);
  }

  public cancelApplicantInterview(payload:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/CancelApplicantInterview`,payload,this.httpOptions);
  }

  public sendOfferToApplicant(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/SendOfferToApplicant`, payload, this.httpOptions);
  }

  public inviteApplicantForInterview(payload:ApplicantScheduleInterview): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/InviteApplicantForInterview`, payload,this.httpOptions);
  }

  public getCandidateProfileData(event: any): Observable<Response> {

    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/GetCandidateProfileData`, event, this.httpOptions);
  }


  public getRequisitionCombinedDataClient(event: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/getRequisitionCombinedDataClient`, event, this.httpOptions);
  }

  public getRequisitionRecruitersRM(id: any): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruitment/GetRequisitionRecruitersRM/${id}`);
  }

  public getRequisitionCandidatesFilters(status: any): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruitment/GetRequisitionCandidatesFilters/${status}`);
  }

  public getApplicantOfferDetails(applicantId: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Recruitment/GetApplicantOfferDetails/${applicantId}`);
  }

  public updateRequisitionApplicantStatus(payload: RequisitionApplicantStatus): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/UpdateRequisitionApplicantStatus`, payload,this.httpOptions);
  }
  
  public qualifyApplicant(applicantId:number,redact: RedactDetail): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/QualifyApplicant/${applicantId}`, redact, this.httpOptions);
  }

  public setApplicantRating(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/SetApplicantRating`, payload, this.httpOptions);
  }

  public InterviewFeedback(payload: InterviewFeedBack): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Recruitment/InterviewFeedback`, payload, this.httpOptions);
  }

}
