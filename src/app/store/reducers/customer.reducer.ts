import { CustomerAction, CustomerActionTypes } from '../actions/customer.actions';
import { Customer } from '../../model/customer.model';

const initialState: CustomerState = {
  list: [],
  loading: false,
  error: undefined
};


export interface CustomerState {
  list: Customer[],
  loading: boolean,
  error: Error
}


export function CustomerReducer(state: CustomerState, action: CustomerAction) {
  switch (action.type) {
    case CustomerActionTypes.ADD_CUSTOMER:
      return {
        ...state,
        loading: true
      }
    case CustomerActionTypes.ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        Loading: false
      }
    case CustomerActionTypes.ADD_CUSTOMER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
      // case CustomerActionTypes.EDIT_CUSTOMER:
      //   return {
      //     ...state,
      //     list: [...state.list, action.payload],
      //     loading: false
      //     }
      // case CustomerActionTypes.EDIT_CUSTOMER_SUCCESS:
      //   return {
      //     ...state,
      //     llist: state.list.filter(item => item.id === action.payload),
      //     Loading: false
      //   }
      // case CustomerActionTypes.EDIT_CUSTOMER_FAILURE:
      //   return {
      //     ...state,
      //     error: action.payload,
      //     loading: false
      //   }  
    case CustomerActionTypes.LOAD_CUSTOMERS:
      return {
        ...state,
        loading: true
      }
    case CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS:
      return {
        ...state,
        list: action.payload
      }
    case CustomerActionTypes.LOAD_CUSTOMERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case CustomerActionTypes.DELETE_CUSTOMER:
      return {
        ...state,
        loading: true
      }

    case CustomerActionTypes.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
        loading: false
      }
    case CustomerActionTypes.DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state;
  }
}