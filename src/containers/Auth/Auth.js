import React, { Component } from 'react';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

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
      }
    }
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = (value.trim() !== '') && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  handleInputChange = (inputID, e) => {
    const inputValue = e.target.value;
    const updatedAuthForm = {
      ...this.state.authForm,
      [inputID]: {
        ...this.state.authForm[inputID],
        value: e.target.value,
        valid: this.checkValidity(e.target.value, this.state.authForm[inputID].validation),
        touched: true
      }
    };
    this.setState({ authForm: updatedAuthForm });
  };

  render() {
    const formElementsArray =[];
    for (let key in this.state.authForm) {
      formElementsArray.push({
        id: key,
        config: this.state.authForm[key]
      })
    }

    const form = formElementsArray.map(formElement => (
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

    return (
      <div className={classes.Auth}>
        <form action="">
          {form}
          <Button btnType='Success'>Submit</Button>
        </form>

      </div>
    );
  }
}

export default Auth;
