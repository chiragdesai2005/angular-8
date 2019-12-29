import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { AddCustomerAction, LoadCustomerAction, DeleteCustomerAction } from '../store/actions/customer.actions';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: Customer;
  customers: Observable<Array<Customer>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  edit: boolean = true;

  constructor(private store: Store<AppState>, private customerService :CustomerService) { }

  customerForm: FormGroup;
  submitted = false;
  error: String;

  ngOnInit() {
    this.edit = false;
    this.customers = this.store.select(store => store.customer.list);
    this.loading$ = this.store.select(store => store.customer.loading);
    this.error$ = this.store.select(store => store.customer.error);
    this.customerForm = this.getNewCustomerForm();
    this.store.dispatch(new LoadCustomerAction());
  } 

  onLoad(): void{
    this.edit = false;
    this.customer = null;
    this.customerForm = this.getNewCustomerForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.customerForm.controls; }

  onSubmit(customer:Customer) : void {
    this.submitted = true;
    this.store.dispatch(new AddCustomerAction(customer));
  }

  onEdit(id:number): void{
    this.submitted = true; 
    this.edit = true;
    this.customers.pipe(
      map(arr =>
         arr.filter( r => r.id === id ) [0]
         )
    ).subscribe( customer => {
      this.customerForm.controls['firstName'].setValue(customer.firstName);
      this.customerForm.controls['lastName'].setValue(customer.lastName);
      this.customerForm.controls['contact'].setValue(customer.contact);
      this.customerForm.controls['email'].setValue(customer.email);
      this.customerForm.controls['age'].setValue(customer.age);
    })
  }

  onDelete(id:number): void{
    this.submitted = true;
    this.store.dispatch(new DeleteCustomerAction(id));
  }

  getNewCustomerForm(): FormGroup{
    return new FormGroup({
      firstName: new FormControl('', [Validators.required ,Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required ,Validators.minLength(2)]),
      email: new FormControl('', [Validators.required ,Validators.email]),
      contact: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
    });
  }

}
