import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent {
  id!: number;
  employee!: Employee;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params['id'];

    this.employeeService
      .getEmployee(this.id)
      .pipe(
        tap((data) => {
          console.log(data);
          this.employee = data;
        }),
        catchError((error) => {
          console.log(error);
          return observableThrowError(error); // Rethrow the error or handle it as needed
        })
      )
      .subscribe();
  }

  list() {
    this.router.navigate(['employees']);
  }
}
function observableThrowError(error: any): any {
  throw new Error('Function not implemented.');
}
