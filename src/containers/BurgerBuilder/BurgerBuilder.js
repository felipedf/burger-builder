import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as burgerBuilderActions from '../../store/actions';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../middlewares/WithErrorHandler/WithErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  };

  isPurchase() {
    const ingredients = this.props.ingredients;
    const totalSum = Object.keys(ingredients)
      .reduce( (sum, value) => {
        return sum + ingredients[value];
    }, 0);

    return totalSum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchasingHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render () {
    const disabledInfo = {...this.props.ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    let orderSummary = null;
    let burger = <Spinner/>;

    if (this.props.error) {
      burger = <p> Ingredients can't be loaded! </p>;
    }
    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            add={this.props.onIngredientAdded}
            remove={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.isPurchase()}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          cancelBtn={this.cancelPurchasingHandler}
          continueBtn={this.purchaseContinueHandler}/>
      );
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClose={this.cancelPurchasingHandler}>
            {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  };
}

const mapStateToProps = state => (
  {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
);

const mapDispatchToProps = dispatch => (
  {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
