import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/_models/common/response';
import { CommunicationFilters, ICommunicationTemplate } from 'src/app/_models/communication-templates/ICommunicationTemplate';
@Injectable({
  providedIn: 'root'
})
export class CommunicationTemplatesService {

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  public getAllCommunicationTemplates(payload: CommunicationFilters): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}CommunicationTemplates/GetAllTemplates`, payload , this.httpOptions); 
  }
  public getCommunicationPageData(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}CommunicationTemplates/GetCommunicationPageData`, this.httpOptions);
  }
  
  public saveUpdateTemplate(payload:ICommunicationTemplate): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}CommunicationTemplates/SaveUpdateCommunicationTemplates`, payload , this.httpOptions); 
  }
  
  public deleteCommunicationTemplates(payload:ICommunicationTemplate): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}CommunicationTemplates/DeleteCommunicationTemplates`, payload , this.httpOptions); 
  }
  public copyTemplate(payload:ICommunicationTemplate): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}CommunicationTemplates/CopyCommunicationTemplates`, payload , this.httpOptions); 
  }
}
