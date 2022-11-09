import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/common/response';
import { OneWayInterViewAnswerComment, OneWayInterViewAnswerDto, OneWayInterViewAnswerRating, OneWayInterviewUpdateStatusInput } from 'src/app/_models/one-way-interview/one-way-interview-answer';
import { OneWayInterviewQuestion, OneWayInterviewQuestionRequest } from 'src/app/_models/one-way-interview/one-way-interview-question';
import { OneWayInterviewTemplate } from 'src/app/_models/one-way-interview/one-way-interview-template';
import { QuestionOrder } from 'src/app/_models/one-way-interview/question-order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OneWayInterviewService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) { }

  public getInterviewTemplate(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}OneWayInterview/GetInterviewTemplate/${id}`);
  }
  public getOneWayInterviewQuestionsByRequisitionId(id: string): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}OneWayInterview/GetOneWayInterviewQuestionsByRequisitionId/${id}`);
  }
  public getOneWayInterviewAnswersByApplicantId(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}OneWayInterview/GetOneWayInterviewAnswersByApplicantId/${id}`);
  }

  public getApplicantOneWayInterviewRating(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}OneWayInterview/GetApplicantOneWayInterviewRating/${id}`);
  }

  public getInterviewTemplates(jobTitleId:number=0): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}OneWayInterview/GetInterviewTemplates/${jobTitleId}`);
  }
  public createOrUpdateInterviewTemplate(payload:OneWayInterviewTemplate): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/CreateOrUpdateInterviewTemplate`, payload,this.httpOptions);
  }

  public addOneWayInterviewAnswerComment(payload: OneWayInterViewAnswerComment): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/addOneWayInterviewAnswerComment`, payload, this.httpOptions);
  }

  public addOneWayInterviewAnswerRating(payload: OneWayInterViewAnswerRating): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/AddOneWayInterviewAnswerRating`, payload, this.httpOptions);
  }

  public deleteInterviewTemplate(id: number): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/DeleteInterviewTemplate`, { id: id } , this.httpOptions);
  }
  public getInterviewQuestion(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}OneWayInterview/GetInterviewQuestion/${id}`);
  }
  public getInterviewQuestions(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}OneWayInterview/GetInterviewQuestions/${id}`);
  }

  public getQuestionsBank(): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}OneWayInterview/GetQuestionsBank`);
  }

  public createOrUpdateInterviewQuestion(payload: OneWayInterviewQuestion): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/CreateOrUpdateInterviewQuestion`, payload, this.httpOptions);
  }
  public deleteInterviewQuestion(id: number): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/DeleteInterviewQuestion`, { id: id } , this.httpOptions);
  }

  public updateInterviewQuestionOrder(payload: QuestionOrder): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/UpdateInterviewQuestionOrder`, payload, this.httpOptions);
  }

  public updateInterviewQuestionSetting(payload: OneWayInterviewQuestion): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/UpdateInterviewQuestionSetting`, payload, this.httpOptions);
  }

  public saveInterviewQuestionAnswer(payload: OneWayInterViewAnswerDto): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/SaveInterviewQuestionAnswer`, payload, this.httpOptions);
  }

  public updateCandidateStatus(payload: OneWayInterviewUpdateStatusInput): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/UpdateCandidateStatus`, payload, this.httpOptions);
  }


  public getOneWayInterviewQuestions(payload: OneWayInterviewQuestionRequest): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/GetOneWayInterviewQuestions`,payload,this.httpOptions);
  }

  public updateOneWayInterviewStatus(payload: OneWayInterviewUpdateStatusInput): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}OneWayInterview/UpdateOneWayInterviewStatus`, payload, this.httpOptions);
  }
}
