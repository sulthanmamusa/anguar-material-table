import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';

export class UsersDataSource extends DataSource<any> {
    private usersSubject = new BehaviorSubject<any[]>([]);
    private countSubject = new BehaviorSubject<number>(0);

    public counter$ = this.countSubject.asObservable();
    constructor(
        private usersService: UsersService
    ){
        super();
    }

    connect(){
        return this.usersSubject.asObservable();
    }

    disconnect(){
        this.usersSubject.complete();
        this.countSubject.complete();
    }

    loadUsers(pageIndex: number, pageSize: number, fieldName: string, orderBy: string){
        return this.usersService.getUsers(pageIndex + 1, pageSize, fieldName, orderBy)
        .subscribe(response => {
            this.usersSubject.next(response);
            this.countSubject.next(3);
        });
    }
}