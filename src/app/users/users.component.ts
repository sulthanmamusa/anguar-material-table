import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['studentId','studentNumber','firstName','lastName'];

  dataSource: UsersService;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new UsersService();
    this.dataSource.getUsers(0,2,'firstName','asc');
  }

  ngAfterViewInit(){
    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.dataSource.getUsers(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      ))
    ).subscribe();

    this.dataSource.counter$
    .pipe(
      tap((count) => this.paginator.length = count)
    )
    .subscribe();
  }

}
