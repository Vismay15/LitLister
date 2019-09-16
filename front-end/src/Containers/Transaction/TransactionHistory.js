import React, { Component } from 'react';

import Generics from '../../Generics';

let debug = true;

let transactionHistoryJson = {
  data: [
    {
      tid: 1,
      total: '34.50',
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
      },
      time: '17:08 25-04-2019'
    },
    {
      tid: 2,
      total: '34.50',
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
      },
      time: '17:08 25-04-2019'
    }
  ]
};

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tid: props.match.params.tid,
      transactionHistoryData: null,
      renderReady: false
    };
  }

  componentDidMount = () => {
    if (debug) {
      this.setState({
        transactionHistoryData: transactionHistoryJson.data,
        renderReady: true
      });
    } else {
      /*
        TransactionAPI.getTransactionInfo(this.state.tid).then(transactionData =>
        this.setState({ transactionData, renderReady: true })
      );
      */
    }
  };

  bodyContent = () =>
    this.state.renderReady ? (
      this.state.transactionHistoryData.error ? (
        <h1>{this.state.transactionHistoryData.error}</h1>
      ) : (
        <>
          <h1 className="text-dark pl-2">Transaction History</h1>
          {this.transactionHistoryDetail()}
        </>
      )
    ) : (
      <Generics.Body.Loading />
    );

  transactionHistoryDetail = () => (
    <>
      {this.state.transactionHistoryData.map((transaction, i) => (
        <div className="row my-4 mr-0">
          <div className="col-1" />

          <div
            className="card"
            onClick={_ => (window.location = `/transaction/${transaction.tid}`)}
          >
            <div className="card-body">
              <h5 className="card-title">
                Transaction: {transaction.tid} ({transaction.time})
              </h5>
              <p className="card-text text-dark">
                <div className="row" style={{ paddingLeft: '-15px' }}>
                  <div className="col-2">
                    <img
                      className="img-fluid"
                      src={transaction.bookData.pictureurl}
                      alt="cover"
                    />
                  </div>
                  <div className="col-4">
                    <h1 className="text-dark">{transaction.bookData.title}</h1>
                    <h5>
                      author(s):{' '}
                      {transaction.bookData.authors.map((author, i) => (
                        <span key={i}>{(0 === i ? ' ' : ', ') + author}</span>
                      ))}
                    </h5>
                    <span>isbn: {transaction.bookData.isbn}</span>
                    <br />
                    <div className="row  mr-0">
                      <div className="col-3">rating:</div>
                      <div className="col-2">
                        <Generics.Body.RatingStar
                          rating={transaction.bookData.rating}
                          dimension={10}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <h5>Seller: {transaction.listData.seller}</h5>
                    <div className="row  mr-0">
                      <div className="col-3">rating:</div>
                      <div className="col-2">
                        <Generics.Body.RatingStar
                          rating={transaction.listData.rating}
                          dimension={10}
                        />
                      </div>
                    </div>
                    <h6>condition: {transaction.listData.condition}</h6>
                    <h6>price: {transaction.listData.price}</h6>
                  </div>
                </div>
              </p>
            </div>
          </div>

          <div className="col-1" />
        </div>
      ))}
    </>
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

export default TransactionHistory;
