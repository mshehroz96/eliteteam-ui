
import { candidateBasicInfofilter, userAvailablityFilter, userSlotFilter } from './../../_models/client/candidatefilter';
import { CandidateOfferInput } from './../../_models/candidate/candidate';
import { Event } from './../../_models/event/event';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/_models/common/response';
import { candidatefilter } from 'src/app/_models/client/candidatefilter';
import { OneWayInterviewUpdateStatusInput } from 'src/app/_models/one-way-interview/one-way-interview-answer';
import { ICandidateCVEducation, ICandidateCVProfile, ICandidateCVProfileAward, ICandidateCVProfileCertifications, ICandidateCVProfileLanguages, ICandidateCVProfilePublication, ICandidateCVProfileReferences, ICandidateCVProfileSkills, ICandidateCVWorkExperience } from 'src/app/_models/candidate/ICandidateCVProfile';


@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  

  selected: string | undefined;
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*'
    }),
  };

  public getCandidateDashboard(candidate: candidatefilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/GetCandidateDashboard`, candidate, this.httpOptions);
  }

  public updateCandidateOffer(candidate: CandidateOfferInput): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/UpdateCandidateOffer`, candidate, this.httpOptions);
  }

  public getUserAvailablity(userAvailablity: userAvailablityFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/GetUserAvailablity`, userAvailablity, this.httpOptions);
  }

  public saveUpdateCandidateCVInformation(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/SaveUpdateCandidateCVInformation`, payload, this.httpOptions);
  }

  public getUserSlotByDate(userSlotFilter: userSlotFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/GetUserSlotByDate`, userSlotFilter, this.httpOptions);
  }

  public createEvent(event: Event): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}Candidate/CreateEvent`, event, this.httpOptions);
  }

  public getCandidateRequisitionById(candidate: candidatefilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/GetCandidateRequisitionById`, candidate, this.httpOptions);
  }

  public saveInterViewQueestion(formdata:FormData): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}Candidate/SaveInterViewQuestionAnswer`,formdata, this.httpOptions);
  }

  public updateCandidateInterviewCanceledStatus(payload: OneWayInterviewUpdateStatusInput): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/UpdateCandidateInterviewCanceledStatus`, payload, this.httpOptions);
  }

  public getCandidateInterviewSlots(userSlotFilter: userSlotFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/GetCandidateInterviewSlots`, userSlotFilter, this.httpOptions);
  }

  public getCandidateAllRequisitions(candidate: candidatefilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/GetCandidateAllRequisitions`, candidate, this.httpOptions);
  }

  public getCandidateBasicInfo(candidate: candidateBasicInfofilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/GetCanidateBasicProfileData`, candidate, this.httpOptions);
  }
  public getCandidateCVDetailsById(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Candidate/GetCandidateCVDetailsById?id=${id}`);
  }

  public getCandidateRequisitionCount(candidate: candidatefilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/GetCandidateRequisitionCount`, candidate, this.httpOptions);
  }
  public addUpdateWorkExp(payload: ICandidateCVWorkExperience): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/AddUpdateWorkExp`, payload, this.httpOptions);
  }
  public deleteWorkExp(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/DeleteWorkExperience`, payload, this.httpOptions);
  }
  public addUpdateEducation(payload: ICandidateCVEducation): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/AddUpdateEducation`, payload, this.httpOptions);
  }
  public deleteEducation(payload: any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/DeleteEducation`, payload, this.httpOptions);
  }
  public updateCandidateCVProfileSkills(payload: (ICandidateCVProfileSkills | null)[] | undefined): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/UpdateCandidateCVProfileSkills`, payload, this.httpOptions);
  }
  public updateCandidateCVProfileLanguages(payload: (ICandidateCVProfileLanguages | null)[] | undefined): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/UpdateCandidateCVProfileLanguages`, payload, this.httpOptions);
  }
  public addUpdateCertifications(payload: ICandidateCVProfileCertifications): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/AddUpdateCertifications`, payload, this.httpOptions);
  }
  public deleteCertification(payload: ICandidateCVProfileCertifications): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/DeleteCertification`, payload, this.httpOptions);
  }
  public addUpdateAward(payload: ICandidateCVProfileAward): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/AddUpdateAward`, payload, this.httpOptions);
  }
  public deleteAward(payload: ICandidateCVProfileCertifications): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/DeleteAward`, payload, this.httpOptions);
  }
  public addUpdatePublications(payload: ICandidateCVProfilePublication): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/AddUpdatePublications`, payload, this.httpOptions);
  }
  public deletePublication(payload: ICandidateCVProfilePublication): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/DeletePublication`, payload, this.httpOptions);
  }
  public addUpdateReferences(payload: ICandidateCVProfileReferences): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/AddUpdateReferences`, payload, this.httpOptions);
  }
  public deleteReferences(payload: ICandidateCVProfileReferences): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Candidate/DeleteReferences`, payload, this.httpOptions);
  }
  


}
