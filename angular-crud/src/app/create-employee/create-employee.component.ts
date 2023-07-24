import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent {
  employee: Employee = new Employee();
  submitted = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {}

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    this.employeeService
      .createEmployee(this.employee)
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
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}
function observableThrowError(error: any): any {
  throw new Error('Function not implemented.');
}
