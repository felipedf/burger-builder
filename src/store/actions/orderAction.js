import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => (
  {
    type: actionTypes.PURCHASE_BURGER_SUCESS,
    orderId: id,
    orderData: orderData
  }
)

export const purchaseBurgerFail = error => (
  {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
)

export const purhcaseBurgerStart = orderData => (
  dispatch => {
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data, orderData))
      })
      .catch(error => {
      });
  }
)
