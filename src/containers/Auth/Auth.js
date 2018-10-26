import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as action from '../../store/actions';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    },
    isSignUp: true
  };

  handleInputChange = (inputId, e) => {
    const inputValue = e.target.value;
    const updatedAuthFormElem = updateObject(this.state.authForm[inputId], {
      value: inputValue,
      valid: checkValidity(inputValue, this.state.authForm[inputId].validation),
      touched: true
    });

    const updatedAuthForm = updateObject(this.state.authForm, {
      [inputId]: updatedAuthFormElem
    });

    this.setState({ authForm: updatedAuthForm });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignUp
    );
  };

  handleSwitchAuthMode = () => {
    this.setState(prevState => (
      {isSignUp: !prevState.isSignUp}
    ))
  };

  render() {
    const formElementsArray =[];
    for (let key in this.state.authForm) {
      formElementsArray.push({
        id: key,
        config: this.state.authForm[key]
      })
    }

    let form = formElementsArray.map(formElement => (
      <Input key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={this.handleInputChange.bind(this, formElement.id)}
      />
    ));
    if (this.props.loading) form = <Spinner />;

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.handleFormSubmit}>
          {form}
          <Button btnType='Success'>Submit</Button>
        </form>
        <Button btnType='Danger' clicked={this.handleSwitchAuthMode}>
          {this.state.isSignUp
            ? 'Sign In'
            : 'Sign Up'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
);

const mapDispatchToProps = dispatch => (
  {
    onAuth: (email, password, isSignUp) => dispatch(action.auth(email, password, isSignUp)),
    onAuthRedirect: () => dispatch(action.setAuthRedirectPath())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
