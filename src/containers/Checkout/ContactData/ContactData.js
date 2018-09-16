import React, { Component } from 'react'

import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  handleOrderSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    console.log(this.props)
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: 'Felipe',
        address: {
          street: 'TestStreet 1',
          zipCode: '5830292',
          country: 'Brazil'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
      })
      .catch(error => {
      });
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter you contact data</h4>
        <form action="">
          <input type="text" name="name" placeholder="Your name"/>
          <input type="email" name="email" placeholder="Your email"/>
          <input type="text" name="street" placeholder="Your street"/>
          <input type="text" name="postal" placeholder="Your postal code"/>
          <Button btnType="Success" clicked={this.handleOrderSubmit}>ORDER</Button>
          <Button></Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
