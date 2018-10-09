import * as actionType from '../actions/actionTypes';

const initialState = {
  loading: false,
  orders: []
};

const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionType.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder)
      };
    case actionType.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
      case actionType.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    default:
      return state
  }
};

export default orderReducer;