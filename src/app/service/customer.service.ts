import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 // Base url
 baseurl = 'http://localhost:8080/customer-profile/services';

constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGlyYWciLCJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4xIn0.RUyCbMtDFNzcU0dDqyLuTK0jkFAgxobzoTBLm1yXmov-qHC-y0hsDIBxlBHsQ2sk5DnHGLvp7HjcidrKoIKm1g'
    })
  }

   // POST
   addNewCustomer(customer:Customer){
      return this.http.post(this.baseurl + '/v1/profile/', customer, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    }
    
    // POST
   loadCustomers(){
    return this.http.get<Array<Customer>>(this.baseurl + '/v1/profile/', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Delete
  deleteCustomer(id){
    return this.http.delete(this.baseurl + '/v1/profile/'+id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

    // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
