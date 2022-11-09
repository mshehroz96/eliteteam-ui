import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/_models/common/response';
import { CheckUserAvailablity, Event, SearchEventInput } from 'src/app/_models/event/event';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public getEvenTypes(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}Event/GetEventTypes`);
  }

  public getAllUserEvents(searchInput: SearchEventInput): Observable<Response> {
    return this.http.post<any>(`${environment.webApiUrl}Event/GetAllUserEvent`, searchInput, this.httpOptions);
  }

  public createEvent(event: Event): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}Event/CreateEvent`, event, this.httpOptions);
  }
  public createRecruiterScheduleEvent(event: Event): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}Event/CreateScheduleEvent`, event, this.httpOptions);
  }

  public deleteEvent(eventId: number): Observable<Response> {
    return this.http.delete<any>(`${environment.webApiUrl}Event/DeleteEventById?EventId=${eventId}`);
  }

  public deleteAllEvent(seriesId: string): Observable<Response> {
    return this.http.delete<any>(`${environment.webApiUrl}Event/DeleteEventSeries?seriesId=${seriesId}`);
  }

  public checkUserAvailablity(checkAvailbilty: CheckUserAvailablity): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}Event/CheckUserAvailablity`, checkAvailbilty, this.httpOptions);
  }

  public checkClientAvailablity(checkAvailbilty: CheckUserAvailablity): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}Event/CheckClientAvailablity`, checkAvailbilty, this.httpOptions);
  }

  public getEventById(eventId: number): Observable<Response> {
    return this.http.get<any>(`${environment.webApiUrl}Event/GetEvent?id=${eventId}`);
  }

  public cancelledEvent(eventId: number): Observable<Response> {
    return this.http.get<any>(`${environment.webApiUrl}Event/CancelledEventById?EventId=${eventId}`);
  }
}
