import React, { Component } from 'react';

import classes from './Orders.css';
import Order from '../../components/Order/Order';


class Orders extends Component {
  render() {
    return (
      <div>
        <Order></Order>
        <Order></Order>
      </div>
    );
  }
}

export default Orders;
