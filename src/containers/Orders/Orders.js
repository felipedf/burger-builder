import React, { Component } from 'react';

import axios from '../../axios-orders';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../middlewares/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
  state = {
    orders: {}
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(response => {
        this.setState({ orders: response.data })
      })
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.orders).map(order => (
          <Order key={order}
          customer={this.state.orders[order].customer}
          deliveryMethod={this.state.orders[order].deliveryMethod}
          ingredients={this.state.orders[order].ingredients}
          totalPrice={+this.state.orders[order].totalPrice}/>
        ))};
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
