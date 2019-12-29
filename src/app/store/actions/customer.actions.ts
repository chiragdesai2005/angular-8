import { Action } from '@ngrx/store';
import { Customer } from '../../model/customer.model';

export enum CustomerActionTypes {
  ADD_CUSTOMER = '[CUSTOMER] Add Customer',
  ADD_CUSTOMER_SUCCESS = '[CUSTOMER] Add Customer Success',
  ADD_CUSTOMER_FAILURE = '[CUSTOMER] Add Customer FAILURE',
  EDIT_CUSTOMER = '[CUSTOMER] Edit Customer',
  EDIT_CUSTOMER_SUCCESS = '[CUSTOMER] Edit Customer Success',
  EDIT_CUSTOMER_FAILURE = '[CUSTOMER] Edit Customer FAILURE',
  LOAD_CUSTOMERS = '[CUSTOMER] Load Customers',
  LOAD_CUSTOMERS_SUCCESS = '[CUSTOMER] Load Customer Success',
  LOAD_CUSTOMERS_FAILURE = '[CUSTOMER] Load Customer FAILURE',
  DELETE_CUSTOMER = '[CUSTOMER] Delete Customer',
  DELETE_CUSTOMER_SUCCESS = '[CUSTOMER] Delete Customer Success',
  DELETE_CUSTOMER_FAILURE = '[CUSTOMER] Delete Customer FAILURE',
}

export class LoadCustomerAction implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMERS
}

export class LoadCustomerSuccessAction implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS

  constructor(public payload: Array<Customer>) { }

}
export class LoadCustomerFailureAction implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMERS_FAILURE
  constructor(public payload: Error) { }
}

export class AddCustomerAction implements Action {
  readonly type = CustomerActionTypes.ADD_CUSTOMER
  constructor(public payload: Customer) { }
}
export class AddCustomerSuccessAction implements Action {
  readonly type = CustomerActionTypes.ADD_CUSTOMER_SUCCESS
  constructor(public payload: Customer) { }
}
export class AddCustomerFailureAction implements Action {
  readonly type = CustomerActionTypes.ADD_CUSTOMER_FAILURE
  constructor(public payload: Error) { }
}

// export class EditCustomerAction implements Action {
//   readonly type = CustomerActionTypes.EDIT_CUSTOMER
//   constructor(public payload: number) { }
// }
// export class EditCustomerSuccessAction implements Action {
//   readonly type = CustomerActionTypes.EDIT_CUSTOMER_SUCCESS
//   constructor(public payload: number) { }
// }
// export class EditCustomerFailureAction implements Action {
//   readonly type = CustomerActionTypes.EDIT_CUSTOMER_FAILURE
//   constructor(public payload: Error) { }
// }

export class DeleteCustomerAction implements Action {
  readonly type = CustomerActionTypes.DELETE_CUSTOMER
  constructor(public payload: number) { }
}
export class DeleteCustomerSuccessAction implements Action {
  readonly type = CustomerActionTypes.DELETE_CUSTOMER_SUCCESS
  constructor(public payload: number) { }
}
export class DeleteCustomerFailureAction implements Action {
  readonly type = CustomerActionTypes.DELETE_CUSTOMER_FAILURE
  constructor(public payload: number) { }
}

export type CustomerAction = AddCustomerAction | DeleteCustomerAction | LoadCustomerAction | LoadCustomerSuccessAction | LoadCustomerFailureAction
  | AddCustomerSuccessAction | AddCustomerFailureAction | DeleteCustomerFailureAction | DeleteCustomerSuccessAction 