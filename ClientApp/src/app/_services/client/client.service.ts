import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/_models/common/response';
import { clientRMUnassignedFilter } from 'src/app/_models/client/clientRMUnassignedFilter';
import { clientRMAssignedFilter } from 'src/app/_models/client/clientRMAssignedFilter';
import { ClientShowCaseFilter } from 'src/app/_models/client/clientshowcasefilter';
import { CompanyDetailsRequest } from 'src/app/_models/client/CompanyDetailsRequest';
import { BillingDetailsRequest } from 'src/app/_models/client/BillingDetailsRequest';
import { BillingDetails } from 'src/app/_models/client/BillingDetails';
import { ClientRequisition, IRecruitersAssignment } from 'src/app/_models/client/IRecruitersAssignment';
import { IOfferLetterFilters, IOfferLetterTemplates } from 'src/app/_models/client/IOfferLetterTemplates';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  selected: string | undefined;
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public getGetClientsRMUnassigned(event: clientRMUnassignedFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/GetClientsRMUnassigned`, event, this.httpOptions);
  }

  public getGetClientsRMAssigned(event: clientRMAssignedFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/GetClientsRMAssigned`, event, this.httpOptions);
  }

  public getClientShowCase(params: ClientShowCaseFilter): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/GetClientShowCase`, params, this.httpOptions);
  }

  public getSettingsPersonal(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}xxxxx/GetClientAcountDetails/${id}`);
  }

  public getCompanyDetails(event: CompanyDetailsRequest): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/GetCompanyDetails`, event, this.httpOptions);
  }

  public updateCompanyDetails(payload:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/UpdateCompanyDetails`, payload, this.httpOptions);
  }

  public getBillingDetails(event: BillingDetailsRequest): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/GetBillingDetails`, event, this.httpOptions);
  }

  public updateBillingDetails(payload:BillingDetails): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/UpdateBillingDetails`, payload, this.httpOptions);
  }


  public getGetClientsRMUnassignedById(id: any) {
    return this.http.get(`${environment.webApiUrl}Client/GetClientRMUnassignedById/${id}`, this.httpOptions);
  }
  public getGetClientsRMAssignedById(id: any) {
    return this.http.get(`${environment.webApiUrl}Client/GetClientRMAssignedById/${id}`, this.httpOptions);
  }
  public getClientRecruiter(id: any) {
    return this.http.get(`${environment.webApiUrl}Client/GetClientsRecruiter/${id}`, this.httpOptions);
  }

  public getClientRMRecruiterAssignment(id: any):Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Client/getClientRMRecruiterAssignment/${id}`, this.httpOptions);
  }


  getJobDetails() {
    return this.http.get<any>(`${environment.webApiUrl}Client/GetJobDetails`, this.httpOptions)
      .toPromise()
      .then(res => <any>res.data)
      .then(data => { return data; });
  }
  public saveRecruitersAssignment(data:IRecruitersAssignment): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/ClientRecruitersAssignment`, data, this.httpOptions);
  }

  public getRecruiterRMRecruiterAssignment(id: any):Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Client/GetRecruiterRMRecruiterAssignment/${id}`, this.httpOptions);
  }
  public saveRecruitersAssignmentJobs(data:ClientRequisition[]): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/ClientRecruitersAssignmentJobs`, data, this.httpOptions);
  }

  public getAllOfferTemplates(payload: IOfferLetterFilters): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/GetAllClientOfferTemplates`, payload , this.httpOptions); 
  }
  public saveUpdateTemplate(payload:IOfferLetterTemplates): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/SaveUpdateOfferLetterTemplates`, payload , this.httpOptions); 
  }
  
  public deleteOfferLetterTemplates(payload:IOfferLetterTemplates): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/DeleteOfferLetterTemplates`, payload , this.httpOptions); 
  }
  public changeCompanyPlan(data:any): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Client/ChangeCompanyPlan`, data, this.httpOptions);
  }

  public getCompanyDetailById(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Client/GetCompanyDetailById?id=${id}`);
  }


}
