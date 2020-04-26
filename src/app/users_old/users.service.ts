import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(pageIndex: number, pageSize: number, fieldName: string, orderBy: string): Observable<any>{
    return this.http.get('http://localhost:3000/users',{
      params: {
        _page: pageIndex.toString(),
        _limit: pageSize.toString(),
        _sort: fieldName,
        _order: orderBy
      }
    });
  }
}
