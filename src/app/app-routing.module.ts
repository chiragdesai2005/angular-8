import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : '', component : LoginComponent},
  { path : 'home', component : HomeComponent},
  { path : 'customer', component : CustomerComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
