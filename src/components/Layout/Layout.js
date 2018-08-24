import React from 'react';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
  <React.Fragment>
    <Toolbar/>
    <SideDrawer/>
    <main className={classes.Content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;
