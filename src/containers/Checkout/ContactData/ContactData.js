import axios from '../../../axios-orders'
import { connect } from 'react-redux';
import React, { Component } from 'react'

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../middlewares/WithErrorHandler/WithErrorHandler';
import * as action from "../../../store/actions";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
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
  }

  handleInputChange = (inputID, e) => {
    const inputValue = e.target.value;
    const updatedOrderForm = {
      ...this.state.orderForm,
      [inputID]: {
        ...this.state.orderForm[inputID],
        value: inputValue,
        valid: this.checkValidity(inputValue, this.state.orderForm[inputID].validation),
        touched: true
      },
    };

    let validForm = true;
    for (let field in updatedOrderForm) {
      validForm = updatedOrderForm[field].valid && validForm;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: validForm
    });
  };

  handleOrderSubmit = (e) => {
    e.preventDefault();
    let formData = {};
    for (let elem in this.state.orderForm) {
      formData[elem] = this.state.orderForm[elem].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formData
    };

    this.props.onOrderBurger(order);
  };

  render() {
    const formElementsArray =[];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <React.Fragment>
        <h4>Enter you contact data</h4>
        <form onSubmit={this.handleOrderSubmit}>
          {formElementsArray.map(formElement => {
            return <Input key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={this.handleInputChange.bind(this, formElement.id)}
            />
          })}
          <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
      </React.Fragment>
    );


    if (this.props.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    loading: state.loading
  }
);

const mapDispatchToProps = dispatch => (
  {
    onOrderBurger: (orderData) => dispatch(action.purhcaseBurger(orderData))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
