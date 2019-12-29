import { Customer } from '../../model/customer.model';
import { CustomerState } from '../reducers/customer.reducer';

export interface AppState {
  readonly customer: CustomerState
}