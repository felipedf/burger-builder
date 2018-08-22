import React from 'react';

import classes from './BuildControl.css'

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      onClick={props.add}
      className={classes.Less}>More
    </button>
    <button
      onClick={props.remove}
      className={classes.More}
      disabled={props.disabled}>Less
    </button>
  </div>
);

export default buildControl;
