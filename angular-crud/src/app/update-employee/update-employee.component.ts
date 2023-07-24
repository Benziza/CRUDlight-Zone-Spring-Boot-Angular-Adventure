import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent {
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

  updateEmployee() {
    this.employeeService
      .updateEmployee(this.id, this.employee)
      .pipe(
        tap((data) => {
          console.log(data);
          this.employee = new Employee();
          this.gotoList();
        }),
        catchError((error) => {
          console.log(error);
          return observableThrowError(error); // Rethrow the error or handle it as needed
        })
      )
      .subscribe();
  }

  onSubmit() {
    this.updateEmployee();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}
function observableThrowError(error: any): any {
  throw new Error('Function not implemented.');
}
