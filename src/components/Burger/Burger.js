import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.css'

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .reduce((arr, ing) => {
      for (let i=0; i<props.ingredients[ing]; i++) {
        arr.push(<BurgerIngredient key={ing + i} type={ing}/>)
      };
      return arr;
    }, []);
    if (transformedIngredients.length === 0 ) {
      transformedIngredients = (<p> Please start adding ingredients </p>);
    }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;
