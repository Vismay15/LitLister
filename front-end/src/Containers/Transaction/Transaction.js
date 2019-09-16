import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

import Generics from '../../Generics';

import { Transaction as TransactionAPI } from '../../api';

let debug = true;

let transactionJson = {
  data: {
    error: null,
    bookData: {
      title: 'book1',
      isbn: '111-111-111',
      authors: ['Adam Bob', 'Calvin Dan'],
      rating: 2.5,
      pictureurl:
        'https://diybookcovers.com/wp-content/uploads/2017/02/newcovers3d.png'
    },
    listData: {
      seller: 'badS3ll3r',
      rating: 4.3,
      condition: 'new',
      price: 10.23
    }
  }
};
class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tid: props.match.params.tid,
      transactionData: null,
      renderReady: false
    };
  }

  componentDidMount = () => {
    if (debug) {
      this.setState({
        transactionData: transactionJson.data,
        renderReady: true
      });
    } else {
      TransactionAPI.getTransactionInfo(this.state.tid).then(transactionData =>
        this.setState({ transactionData, renderReady: true })
      );
    }
  };

  bodyContent = () =>
    this.state.renderReady ? (
      this.state.transactionData.error ? (
        <h1>{this.state.transactionData.error}</h1>
      ) : (
        <>
          {this.transactionDetail()}
          {this.checkoutRow()}
        </>
      )
    ) : (
      <Generics.Body.Loading />
    );

  transactionDetail = () => (
    <div className="row my-4" style={{ marginRight: '0' }}>
      <div className="col-1" />
      <div className="col-2">
        <img
          className="img-fluid"
          src={this.state.transactionData.bookData.pictureurl}
          alt="cover"
        />
      </div>
      <div className="col-4">
        <h1>{this.state.transactionData.bookData.title}</h1>
        <h5>
          author(s):{' '}
          {this.state.transactionData.bookData.authors.map((author, i) => (
            <span key={i}>{(0 === i ? ' ' : ', ') + author}</span>
          ))}
        </h5>
        <span>isbn: {this.state.transactionData.bookData.isbn}</span>
        <br />
        <div className="row" style={{ marginRight: '0' }}>
          <div className="col-2">rating:</div>
          <div className="col-2">
            <Generics.Body.RatingStar
              rating={this.state.transactionData.bookData.rating}
              dimension={12}
            />
          </div>
        </div>
      </div>
      <div className="col-4">
        <h5>Seller: {this.state.transactionData.listData.seller}</h5>
        <div className="row" style={{ marginRight: '0' }}>
          <div className="col-2">rating:</div>
          <div className="col-2">
            <Generics.Body.RatingStar
              rating={this.state.transactionData.listData.rating}
              dimension={12}
            />
          </div>
        </div>
        <h6>condition: {this.state.transactionData.listData.condition}</h6>
        <h6>price: {this.state.transactionData.listData.price}</h6>
      </div>
      <div className="col-1" />
    </div>
  );

  checkoutRow = () => (
    <div className="row my-4" style={{ marginRight: '0' }}>
      <div className="col-2" />
      <div className="col">
        <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
          <div className="example">
            <Elements>
              <CheckoutForm tid={this.state.tid} />
            </Elements>
          </div>
        </StripeProvider>
      </div>
      <div className="col-6" />
    </div>
  );

  render = () => {
    return (
      <div>
        <Generics.NavBar />
        <Generics.Header />

        <Generics.Body content={this.bodyContent()} />
        <Generics.Footer />
      </div>
    );
  };
}

export default Transaction;
