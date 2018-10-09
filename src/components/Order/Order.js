import React from 'react';

import classes from './Order.css';

const order = (props) => {
  let ingredients = Object.keys(props.ingredients).map(ing => (
      <span key={ing}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 5px',
          border: '1px solid #ccc',
          padding: '6px'
        }}>
        { `  ${ing}: (${props.ingredients[ing]})` }
      </span>
    ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
    </div>
  )
};

export default order;
