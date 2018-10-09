import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  handleContinueCheckout = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  handleCancelCheckout = () => {
    this.props.history.goBack();
  };

  render() {
    let summary = <Redirect to="/"/>;
    if (this.props.ingredients) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutContinue={this.handleContinueCheckout}
            checkoutCancel={this.handleCancelCheckout}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
      </div>
      )
    }
    return summary;
  }
}

const mapStateToProps = state => (
  {
    ingredients: state.ingredients
  }
);

export default connect(mapStateToProps)(Checkout);
