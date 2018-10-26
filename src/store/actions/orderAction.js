import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id, orderData) => (
  {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
);

const purchaseBurgerFail = error => (
  {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
);

const purchaseBurgerStart = () => (
  {
    type: actionTypes.PURCHASE_BURGER_START,
  }
);

export const purhcaseBurger = (orderData, token) => (
  dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error))
      });
  }
);

const fetchOrdersSuccess = orders => (
  {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
);

const fetchOrdersFail = error => (
  {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
);

const fetchOrdersStart = () => (
  {
    type: actionTypes.FETCH_ORDERS_START
  }
);

export const fetchOrders = (token, userId) => (
  dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParams)
      .then(response => {
        dispatch(fetchOrdersSuccess(response.data));
      })
      .catch( error => {
        dispatch(fetchOrdersFail(error));
      })
  }
);
