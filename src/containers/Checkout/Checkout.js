import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    loading: true,
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    },
    totalPrice: 4
  };

  componentDidMount() {
    let newIngredients = {
      ingredients: {}
    };
    const query = new URLSearchParams(this.props.location.search);
    for ( let i in this.state.ingredients) {
      newIngredients.ingredients[i] = query.get(i);
    }
    newIngredients['totalPrice'] = query.get('price');
    this.setState({
      ingredients: newIngredients.ingredients,
      totalPrice: newIngredients.totalPrice
    });
  }

  handleContinueCheckout = () => {
    this.props.history.replace('/checkout/contact-data');
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
      <Route
        path={this.props.match.path + '/contact-data'}
        render={() => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>}/>
      </div>
    );
  }
}

export default Checkout;
