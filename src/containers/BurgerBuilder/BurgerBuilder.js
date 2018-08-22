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
    totalPrice: 4
  }

  addIngredientHandler = type => {
    const stateCopy = {...this.state.ingredients};
    stateCopy[type] += 1;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: stateCopy,
      totalPrice: newPrice
    });
  }

  removeIngredientHandler = type => {
    const stateCopy = {...this.state.ingredients};
    stateCopy[type] -= 1;
    stateCopy[type] = Math.max(stateCopy[type], 0);

    const newPrice = Math.max((this.state.totalPrice - INGREDIENT_PRICES[type]), 0);
    this.setState({
      ingredients: stateCopy,
      totalPrice: newPrice
    });
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
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
