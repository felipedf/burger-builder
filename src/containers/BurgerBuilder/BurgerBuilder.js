import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    purchasable: false,
    totalPrice: 4
  }

  updatePurchaseState (ingredients) {
    const totalSum = Object.keys(ingredients)
      .reduce( (sum, value) => {
        return sum + ingredients[value];
    }, 0);

    this.setState({ purchasable: totalSum > 0 });
  }

  addIngredientHandler = type => {
    const ingredientsCopy = {...this.state.ingredients};
    ingredientsCopy[type] += 1;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: ingredientsCopy,
      totalPrice: newPrice
    });

    this.updatePurchaseState(ingredientsCopy);
  }

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
  }

  render () {
    const disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          add={this.addIngredientHandler}
          remove={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
