import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import * as action from '../../store/actions/index';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../middlewares/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    const orders = this.props.orders
    let allOrders = <Spinner />;
    if (!this.props.loading) {
      if (this.props.orders) {
        allOrders = (
          Object.keys(orders).map(order => (
            <Order key={order}
            customer={orders[order].customer}
            deliveryMethod={orders[order].deliveryMethod}
            ingredients={orders[order].ingredients}
            totalPrice={+orders[order].totalPrice}/>
          ))
        );
      }
      else {
        allOrders = null;
      }
    }
    return (
      <div>
        {allOrders}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
);

const mapDispatchToProps = dispatch => (
  {
    onFetchOrders: (token) => dispatch(action.fetchOrders(token))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
