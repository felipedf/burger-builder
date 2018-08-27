import React, { Component } from 'react';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  toggleSideDrawerCloseHandler = () => {
    this.setState( (prevState) => (
      { showSideDrawer: !prevState.showSideDrawer }
    ));
  };

  render () {
    return (
      <React.Fragment>
        <Toolbar clicked={this.toggleSideDrawerCloseHandler}/>
        <SideDrawer
          show={this.state.showSideDrawer}
          close={this.toggleSideDrawerCloseHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  };
};

export default Layout;
