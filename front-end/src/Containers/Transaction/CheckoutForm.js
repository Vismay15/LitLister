import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

import { Transaction } from '../../api';

let debug = true;

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tid: props.tid,
      complete: false
    };
    this.submit = this.submit.bind(this);
  }

  submit = _ => {
    this.props.stripe.createToken({ name: 'Name' }).then(({ token }) => {
      if (debug) {
        this.setState({ complete: true });
      } else {
        Transaction.postTransactionInfo({
          tid: this.state.tid,
          data: token
        }).then(response => {
          if (response.ok) {
            this.setState({ complete: true });
          } else {
          }
        });
      }
    });
  };

  render = () => {
    if (this.state.complete) {
      return <h1>Purchase Complete</h1>;
    }

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button className="btn btn-success mt-4" onClick={this.submit}>
          Purchase
        </button>
      </div>
    );
  };
}

export default injectStripe(CheckoutForm);
