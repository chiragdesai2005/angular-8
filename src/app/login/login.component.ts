import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService :LoginService) { 
  }

  loginForm: FormGroup;
  submitted = false;
  error: String;

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('admin', [Validators.required ,Validators.minLength(4)]),
      password: new FormControl('admin123', [Validators.required ,Validators.minLength(6)])
    });
  }

   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

  onSubmit() : void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    let data = {
      userName: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    };
    this.loginService.login(data).subscribe(res => {
      console.log('Login successful!'+res);
      this.router.navigate(["home"]);
    }, err => this.error = err);
  }

  onReset(){
    this.submitted = false;
    this.loginForm.reset();
  }

}
