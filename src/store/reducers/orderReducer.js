import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  orders: {}
};

const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionType.PURCHASE_BURGER_SUCCESS:
      return updateObject(state, { loading: false });
    case actionType.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });
    case actionType.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });
    case actionType.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case actionType.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders: action.orders, loading: false });
    case actionType.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });
    default:
      return state
  }
};

export default orderReducer;
