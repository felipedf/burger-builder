import React, { Component } from 'react';

import axios from '../../axios-orders';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    loading: true,
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };

  handleContinueCheckout = () => {
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: 'Felipe',
        address: {
          street: 'TestStreet 1',
          zipCode: '5830292',
          country: 'Brazil'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
      })
      .catch(error => {
      });

  }

  handleCancelCheckout = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinue={this.handleContinueCheckout}
          checkoutCancel={this.handleCancelCheckout}
        />
      </div>
    );
  }
}

export default Checkout;
