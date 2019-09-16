import React, { Component } from 'react';

import Generics from '../../Generics';

import { Auth, Chat, Listing as ListingAPI, Review } from '../../api';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: props.match.params.bid,
      lid: props.match.params.lid,
      listData: null,
      review: 0,
      renderReady: false
    };
  }

  onReviewSelect = event => {
    this.setState({ review: event.target.getAttribute('value') });
  };

  onAddReview = _ => {
    const { lid, review } = this.state;
    Review.putUserRating(lid, review).then(_ => window.location.reload());
  };

  componentDidMount = () =>
    ListingAPI.getList(this.state.lid).then(listData => {
      if (listData) {
        this.setState({ listData, renderReady: true });
      }
    });

  bodyContent = () => (
    <>
      {this.state.renderReady ? (
        <>
          {this.addToCart()}
          {this.bookInfo()}
          {this.listInfo()}
        </>
      ) : (
        <Generics.Body.Loading />
      )}
    </>
  );

  addToCart = () => (
    <div className="container pt-2 ">
      <button
        className="btn btn-warning float-right mr-5"
        onClick={this.onAddToCart}
      >
        <h4>
          <i className="fa fa-shopping-cart " /> Contact seller
        </h4>
      </button>
    </div>
  );

  bookInfo = () => (
    <>
      <h1>Book Information</h1>
      <div className="row mt-3">
        <div className="col-3">
          <img
            className="img-fluid pl-2"
            src={this.state.listData.Book.pictureurl}
            alt="cover"
          />
        </div>
        <div className="col mt-3">
          <h1>{this.state.listData.Book.title}</h1>
          <h5>author(s): {this.state.listData.Book.author}</h5>
          <span>isbn: {this.state.listData.Book.isbn}</span>
          <br />
          <div className="row">
            <div className="col-1">rating:</div>
            <div className="col-1">
              <Generics.Body.RatingStar
                rating={this.state.listData.Book.rating}
                dimension={12}
              />
            </div>
          </div>
          <br />
          <br />
          <h6>{this.state.listData.Book.description}</h6>
        </div>
      </div>
    </>
  );

  listInfo = () => (
    <>
      <h1>Listing Information</h1>
      <div className="row my-3">
        <div className="col-1" />
        <div className="col">
          <h5>
            Seller:{' '}
            {this.state.listData.Seller.firstname +
              ' ' +
              this.state.listData.Seller.lastname}
          </h5>
          <div className="row">
            <div className="col-1">rating:</div>
            <div className="col-1">
              <Generics.Body.RatingStar
                rating={this.state.listData.rating}
                dimension={12}
              />
            </div>
          </div>
          <h6>condition: {this.state.listData.condition}</h6>
          <h6>price: ${this.state.listData.price}</h6>
          <div className="row">
            <div classNAme="col-4">{this.review()}</div>
          </div>
        </div>
        <div className="col-2" />
      </div>
    </>
  );

  onAddToCart = _ => {
    const {
      lid,
      listData: {
        Seller: { uid }
      }
    } = this.state;
    Auth.getLogin().then(userData => {
      if (userData.uid !== uid) {
        Chat.getChat(uid).then(chat => {
          if (!chat) {
            Chat.putChat(uid).then(_ =>
              Chat.getChat(uid).then(chat => {
                Chat.putChatlog(
                  chat.crid,
                  "hi, I'm interested in your listing #" + lid
                ).then(_ => (window.location = '/chatroom/' + chat.crid));
              })
            );
          } else {
            window.location = '/chatroom/' + chat.crid;
          }
        });
      }
    });
  };

  review = () => (
    <>
      <br />
      <select
        className="custom-select"
        name="selectedReview"
        value={this.state.review}
        onChange={this.onReviewSelect}
      >
        {[0, 1, 2, 3, 4, 5].map(val => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="btn btn-success btn-block"
        onClick={this.onAddReview}
      >
        Add review
      </button>
      <br />
      <br />
      <br />
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

export default Listing;
