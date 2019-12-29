import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { CustomerService } from '../../service/customer.service';
import { CustomerActionTypes, CustomerAction, LoadCustomerAction, LoadCustomerSuccessAction, LoadCustomerFailureAction, AddCustomerAction, AddCustomerSuccessAction, AddCustomerFailureAction, DeleteCustomerAction, DeleteCustomerFailureAction, DeleteCustomerSuccessAction } from '../actions/customer.actions';

@Injectable()
export class CustomerEffects {

  @Effect() loadCustomers$ = this.actions$
    .pipe(
      ofType<CustomerAction>(CustomerActionTypes.LOAD_CUSTOMERS),
      mergeMap(
        () => this.customerService.loadCustomers()
          .pipe(
            map(data => {
              return new LoadCustomerSuccessAction(data)
            }),
            catchError(error => of(new LoadCustomerFailureAction(error)))
          )
      ),
  )

  @Effect() addCustomer$ = this.actions$
    .pipe(
      ofType<AddCustomerAction>(CustomerActionTypes.ADD_CUSTOMER),
      mergeMap(
        (data) => this.customerService.addNewCustomer(data.payload)
          .pipe(
            map(() => new AddCustomerSuccessAction(data.payload)),
            catchError(error => of(new AddCustomerFailureAction(error)))
          )
      )
  )

  @Effect() deleteCustomer$ = this.actions$
    .pipe(
      ofType<DeleteCustomerAction>(CustomerActionTypes.DELETE_CUSTOMER),
      mergeMap(
        (data) => this.customerService.deleteCustomer(data.payload)
          .pipe(
            map(() => new DeleteCustomerSuccessAction(data.payload)),
            catchError(error => of(new DeleteCustomerFailureAction(error)))
          )
      )
    )


  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) { }
}