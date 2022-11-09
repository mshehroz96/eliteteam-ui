import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/_models/common/response';
import { List, GetListsRequest, ListItem } from 'src/app/_models/admin/list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  public getLists(payload: GetListsRequest): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}List/GetLists`, payload,this.httpOptions);
  }

  public CreateOrUpdateList(payload: List): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}List/CreateOrUpdateList`, payload,this.httpOptions);
  }

  public deleteListItem(listItem: ListItem): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}List/DeleteListItem`, listItem, this.httpOptions);
  }

 /* public getListCategoriesByJobTitleId(id: number = 0): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}List/GetListCategoriesByJobTitleId/${id}`);
  }

  public getListsByCategoryId(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}List/GetListsByCategoryId/${id}`);
  }*/

  public getListById(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}List/GetListById/${id}`);
  }

  public getListItemsByListId(id:number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}List/GetListItemsByListId/${id}`);
  }
  public getListCategoryById(id: number): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}List/GetListCategoryById/${id}`);
  }

  public createOrUpdateList(payload: ListItem): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}List/CreateOrUpdateList`, payload,this.httpOptions);
  }
  public deleteListCategory(id: number): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}List/deleteListCategory`, { id: id }, this.httpOptions);
  }
  public addUpdateListItem(payload: ListItem): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}List/CreateOrUpdateListItem`, payload,this.httpOptions);
  }
  public saveUpdateList(payload: List): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}List/SaveUpdateList`, payload,this.httpOptions);
  }
  public DeleteList(payload: List): Observable<Response> {
    return this.http.post<Response>(`${environment.webApiUrl}List/DeleteList`, payload,this.httpOptions);
  }
  public searchList(query:string): Observable<Response> {
    return this.http.get<Response>(`${environment.webApiUrl}List/SearchList?Query=${query}`);
  }

}
