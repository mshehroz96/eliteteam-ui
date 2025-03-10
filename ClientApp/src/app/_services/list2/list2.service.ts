import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class List2Service {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) { }

   //#region  List Management
  public getLists(): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}List/GetLists`, this.httpOptions);
  }

  addUpdateList(list: any): Observable<any> {
    return this.http.post<any>(`${environment.webApiUrl}List/SaveUpdateList`, list, this.httpOptions);
  }
  
  deleteList(list:any) : Observable<any>
  {
    return this.http.post<any>(`${environment.webApiUrl}List/DeleteList`,list,this.httpOptions);
  }

  searchList(searchText : string) : Observable<any>
  {
     return this.http.get<any>(`${environment.webApiUrl}List/SearchList?Query=${searchText}`);
  }
  //#endregion

  //#region  List Item Management
  getListItems(listId: number): Observable<any> {
    return this.http.get<any>(`${environment.webApiUrl}List/GetListItemsByListId/${listId}`, this.httpOptions);
  }

  addUpdateListItem(listItem : any) : Observable<any>
  {
     return this.http.post<any>(`${environment.webApiUrl}List/CreateOrUpdateListItem`,listItem,this.httpOptions);
  }

  deleteListItem(listItem : any) : Observable<any> 
  {
    return this.http.post<any>(`${environment.webApiUrl}List/DeleteListItem`,listItem,this.httpOptions);
  }

  //#endregion
}
