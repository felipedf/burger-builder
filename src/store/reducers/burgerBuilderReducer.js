import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const updateIngredient = (state, action, amount) => {
  const updatedIngredient = {
    [action.ingredientName]: Math.max(state.ingredients[action.ingredientName] + amount, 0)
  }
  const updatedIngredients = updateObject( state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: Math.max(state.totalPrice + INGREDIENT_PRICES[action.ingredientName] * amount, 0)
  }

  return updateObject( state, updatedState );
}

const setIngredients = (state, action) => (
  updateObject(state, { ingredients: action.ingredients, totalPrice: 4, error: false })
);

const fetchIngredientsFail = state => updateObject(state, { error: true })

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT: return updateIngredient(state, action, 1)
    case actionType.REMOVE_INGREDIENT: return updateIngredient(state, action, -1)
    case actionType.SET_INGREDIENTS: return setIngredients(state, action)
    case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFail(state);
    default: return state;
  }
};

export default burgerBuilderReducer;
