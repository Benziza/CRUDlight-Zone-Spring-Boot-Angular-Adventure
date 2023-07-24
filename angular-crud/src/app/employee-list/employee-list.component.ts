import { Component } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees!: Observable<Employee[]>;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
  }

  deleteEmployee(id: number) {
    this.employeeService
      .deleteEmployee(id)
      .pipe(
        tap((data) => {
          console.log(data);
          this.reloadData();
        }),
        catchError((error) => {
          console.log(error);
          return observableThrowError(error); // Rethrow the error or handle it as needed
        })
      )
      .subscribe();
  }

  employeeDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  updateEmployee(id: number) {
    this.router.navigate(['update', id]);
  }
}
function observableThrowError(error: any): any {
  throw new Error('Function not implemented.');
}
