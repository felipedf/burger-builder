import axios from '../../../axios-orders'
import { connect } from 'react-redux';
import React, { Component } from 'react'

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../middlewares/WithErrorHandler/WithErrorHandler';
import * as action from "../../../store/actions";
import { updateObject, checkValidity } from '../../../shared/utility'

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

  handleInputChange = (inputId, e) => {
    const inputValue = e.target.value;
    const updatedFormElem = updateObject(this.state.orderForm[inputId], {
      value: inputValue,
      valid: checkValidity(inputValue, this.state.orderForm[inputId].validation),
      touched: true
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputId]: updatedFormElem
    });

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
      userId: this.props.userId,
      orderData: formData
    };

    this.props.onOrderBurger(order, this.props.token);
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
);

const mapDispatchToProps = dispatch => (
  {
    onOrderBurger: (orderData, token) => dispatch(action.purhcaseBurger(orderData, token))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
