import React from 'react';

import classes from './Toolbar.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.clicked}/>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems
        isAuthenticated={props.isAuthenticated}
        setAuthRedirectPath={props.setAuthRedirectPath} />
    </nav>
  </header>
);

export default toolbar;
