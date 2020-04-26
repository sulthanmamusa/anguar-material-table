import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DataSource<any>{

  private usersSubject = new BehaviorSubject<any>([]);
  private countSubject = new BehaviorSubject<number>(0);

  public counter$ = this.countSubject.asObservable();

  private http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));

  constructor() {
    super();
  }

  connect(){
    return this.usersSubject.asObservable();
  }

  disconnect(){
    this.usersSubject.complete();
    this.countSubject.complete();
  }

  getUsers(pageIndex, pageSize, sortBy, orderBy){
    return this.http.get('http://localhost:3000/users',{
      params: {
        _page: pageIndex + 1,
        _limit: pageSize,
        _sort: sortBy,
        _order: orderBy
      }
    })
    .subscribe(res => {
      this.usersSubject.next(res);
      this.countSubject.next(3);
    });
  }
}
