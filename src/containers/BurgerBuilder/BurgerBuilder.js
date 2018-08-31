import React, { Component } from 'react';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../middlewares/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    purchasable: false,
    purchasing: false,
    loading: false,
    totalPrice: 4,
    error: false
  };

  componentDidMount() {
    axios.get('https://burger-builder-0.firebaseio.com/ingredients')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      })
  }

  updatePurchaseState (ingredients) {
    const totalSum = Object.keys(ingredients)
      .reduce( (sum, value) => {
        return sum + ingredients[value];
    }, 0);

    this.setState({ purchasable: totalSum > 0 });
  };

  addIngredientHandler = type => {
    const ingredientsCopy = {...this.state.ingredients};
    ingredientsCopy[type] += 1;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: ingredientsCopy,
      totalPrice: newPrice
    });

    this.updatePurchaseState(ingredientsCopy);
  };

  removeIngredientHandler = type => {
    const ingredientsCopy = {...this.state.ingredients};
    ingredientsCopy[type] -= 1;
    ingredientsCopy[type] = Math.max(ingredientsCopy[type], 0);

    const newPrice = Math.max((this.state.totalPrice - INGREDIENT_PRICES[type]), 0);
    this.setState({
      ingredients: ingredientsCopy,
      totalPrice: newPrice
    });
    this.updatePurchaseState(ingredientsCopy);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchasingHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
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
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchasing: false
        });
      });
  };

  render () {
    const disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    let orderSummary = null;
    let burger = <Spinner/>;

    if (this.state.error) {
      burger = <p> Ingredients can't be loaded! </p>;
    }
    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            add={this.addIngredientHandler}
            remove={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          cancelBtn={this.cancelPurchasingHandler}
          continueBtn={this.purchaseContinueHandler}/>
      );
    };

    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClose={this.cancelPurchasingHandler}
          loading={this.state.loading}>
            {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  };
};

export default withErrorHandler(BurgerBuilder, axios);
