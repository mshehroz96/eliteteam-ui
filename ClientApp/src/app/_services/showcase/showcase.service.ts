import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/_models/common/response';
import { AddJobCandidateDto, ExternalShowCaseInputDto, ShareCandidateToClientDto, ShowCaseDto, UserProfileInput } from 'src/app/_models/showcase/showcase';
import { ClientShowCaseFilter } from 'src/app/_models/client/clientshowcasefilter';

@Injectable({
  providedIn: 'root'
})
export class ShowcaseService {

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public createShowCase(payload: ShowCaseDto): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}ShowCase/CreateShowCase`, payload , this.httpOptions);
  }

  public getCandidateShowCaseDetail(payload: ClientShowCaseFilter): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}ShowCase/GetCandidateShowCaseDetail`, payload , this.httpOptions);
  }

  public addJobCandidates(payload: AddJobCandidateDto): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}ShowCase/AddJobCandidate`, payload , this.httpOptions);
  }

  public shareCandidateToClient(payload: ShareCandidateToClientDto): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}ShowCase/ShareCandidateToClient`, payload , this.httpOptions);
  }


  public getExternalShowCase(input: ExternalShowCaseInputDto): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}ShowCase/GetExternalShowCase`,input, this.httpOptions);
  }

  public getExternalUserProfile(input: UserProfileInput): Observable<Response> {

    return this.http.post<Response>(`${environment.webApiUrl}ShowCase/GetExternalUserProfile`,input, this.httpOptions);
  }

  public deleteShowCase(showCaseId: number): Observable<Response> {

    return this.http.get<Response>(`${environment.webApiUrl}ShowCase/DeleteShowcase?showCaseId=` +  showCaseId);
  }

}
