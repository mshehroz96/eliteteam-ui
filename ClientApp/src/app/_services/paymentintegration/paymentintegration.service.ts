import { Purchase } from './../../_models/purchase/purchase';
import { PaymentMethod, paymentMethodInputDto } from 'src/app/_models/client/BillingDetails';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/common/response';


@Injectable({
  providedIn: 'root'
})

export class PaymentintegrationService {

  selected: string | undefined;
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*'
    }),
  };

  public getPaymentMethods(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Payment/GetPaymentMethods`, this.httpOptions);
  }

  public deletePaymentMethod(request: paymentMethodInputDto): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Payment/DeletePaymentMethod`, request, this.httpOptions);
  }

  public savePaymentMethod(request: PaymentMethod): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Payment/SavePaymentMethod`, request, this.httpOptions);
  }

  public markAsPrimary(request: paymentMethodInputDto): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Payment/MarkedPaymentMethodAsPrimary`, request, this.httpOptions);
  }

  public getPrimaryPaymentMethod(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Payment/GetPrimaryPaymentMethod`, this.httpOptions);
  }

  public stripCheckOut(request: Purchase): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}Payment/StripCheckOut`, request, this.httpOptions);
  }

}
