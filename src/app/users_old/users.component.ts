import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { UsersDataSource } from './users.data-source';
import { MatPaginator } from '@angular/material/paginator';
import { map, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['studentId', 'studentNumber', 'firstName', 'lastName'];


  dataSource: UsersDataSource;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.usersService);
    this.dataSource.loadUsers(0, 2, 'firstName', 'asc');
  }

  ngAfterViewInit() {
    /*this.paginator.page
      .pipe(
        map(() => this.dataSource.loadUsers(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction))
      )
      .subscribe();*/

    this.dataSource.counter$
      .pipe(
        map((count) => this.paginator.length = count)
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => this.dataSource.loadUsers(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction))
      )
      .subscribe();



  }

}
