import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/common/response';
import { ScreeningQuestion, ScreeningQuestionCategory } from 'src/app/_models/requisition/screening-question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScreeningQuestionService {

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public getScreeningQuestionCategories(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}ScreeningQuestion/GetScreeningQuestionCategories`);
    
  }
  public getScreeningQuestionCategoriesByJobTitleId(id: number = 0): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}ScreeningQuestion/GetScreeningQuestionCategoriesByJobTitleId/${id}`);
  }

  public getScreeningQuestionsByCategoryId(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}ScreeningQuestion/GetScreeningQuestionsByCategoryId/${id}`);
  }

  public getScreeningQuestionById(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}ScreeningQuestion/GetScreeningQuestionById/${id}`);
  }

  public getScreeningQuestionCategoryById(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}ScreeningQuestion/GetScreeningQuestionCategoryById/${id}`);
  }

  public createOrUpdateScreeningQuestion(payload: ScreeningQuestion): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}ScreeningQuestion/CreateOrUpdateScreeningQuestion`, payload,this.httpOptions);
  }

  public CreateOrUpdateScreeningQuestionCategory(payload: ScreeningQuestionCategory): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}ScreeningQuestion/CreateOrUpdateScreeningQuestionCategory`, payload,this.httpOptions);
  }

  public deleteScreeningQuestion(id: number): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}ScreeningQuestion/DeleteScreeningQuestion`,{id:id},this.httpOptions);
  }

  public deleteScreeningQuestionCategory(id: number): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}ScreeningQuestion/deleteScreeningQuestionCategory`, { id: id }, this.httpOptions);
  }
}
