import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

// Base url
baseurl = 'http://localhost:8080/customer-profile/services';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'responseType': 'text'
    })
  }

   // POST
   login(data): Observable<String>{
      return (this.http.post<String>(this.baseurl + '/v1/token', data, {responseType: 'text' as 'json'})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      ))
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
