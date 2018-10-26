import React, { Component } from 'react';

import * as actions from '../../store/actions';
import classes from './Layout.css';
import { connect } from 'react-redux';
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
        <Toolbar
          clicked={this.toggleSideDrawerCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath} />
        <SideDrawer
          show={this.state.showSideDrawer}
          close={this.toggleSideDrawerCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  };
};

const mapStateToProps = state => (
  {
    isAuthenticated: state.auth.token !== null
  }
)

const mapDispatchToProps = dispatch => (
  {
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
