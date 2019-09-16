import React, { Component } from 'react';

import Generics from '../../Generics';

import { Book } from '../../api';

class ListingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: props.match.params.bid,
      bookData: null,
      listSortBy: 'rating',
      listDirection: 'asc',
      renderReady: false
    };
  }

  componentDidMount = () =>
    Book.getBookList(this.state.bid).then(bookData =>
      this.setState({ bookData, renderReady: true })
    );

  bodyContent = () =>
    this.state.renderReady ? (
      <>
        {this.bookInfo()}
        {this.listingListInfo()}
      </>
    ) : (
      <>Loading Page</>
    );

  bookInfo = () => (
    <div className="row mt-3">
      <div className="col-3">
        <img
          className="img-fluid"
          src={this.state.bookData.pictureurl}
          alt="cover"
        />
      </div>
      <div className="col mt-3">
        <h1 className="text-dark">{this.state.bookData.title}</h1>
        <h5>author(s):{' ' + this.state.bookData.author}</h5>
        <span>isbn: {this.state.bookData.isbn}</span>
        <br />
        <div className="row">
          <div className="col-1">rating:</div>
          <div className="col-1">
            <Generics.Body.RatingStar
              rating={this.state.bookData.rating}
              dimension={12}
            />
          </div>
        </div>
        <br />
        <br />
        <h6>{this.state.bookData.description}</h6>
      </div>
    </div>
  );

  listingListInfo = () => (
    <>
      <div className="row justify-content-md-center text-white">
        <div
          className="col col-3 border"
          style={{ backgroundColor: '#9370DB', borderTopLeftRadius: '0.5em' }}
          onClick={this.onColumnClick}
          name={'name'}
        >
          <p
            className="text-white text-center mt-2"
            name={'name'}
            style={{
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
          >
            Name {this.columnCaret('name')}
          </p>
        </div>
        <div
          className="col col-3 border"
          style={{ backgroundColor: '#9370DB' }}
          onClick={this.onColumnClick}
          name={'rating'}
        >
          <p
            className="text-white text-center mt-2"
            name={'rating'}
            style={{
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
          >
            Rating {this.columnCaret('rating')}
          </p>
        </div>
        <div
          className="col col-3 border"
          style={{ backgroundColor: '#9370DB' }}
          onClick={this.onColumnClick}
          name={'condition'}
        >
          <p
            className="text-white text-center mt-2"
            name={'condition'}
            style={{
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
          >
            Condition {this.columnCaret('condition')}
          </p>
        </div>
        <div
          className="col col-2 border"
          style={{ backgroundColor: '#9370DB', borderTopRightRadius: '0.5em' }}
          onClick={this.onColumnClick}
          name={'price'}
        >
          <p
            className="text-white text-center mt-2"
            name={'price'}
            style={{
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
          >
            Price {this.columnCaret('price')}
          </p>
        </div>
      </div>
      {this.state.bookData.Listings.map((list, i) => {
        return (
          <div
            className="row justify-content-md-center"
            key={i}
            onClick={_ => (window.location = `./list/${list.lid}`)}
          >
            <div className="col col-3 border">
              {list.Seller.firstname + ' ' + list.Seller.lastname}
            </div>
            <div className="col col-3 border">
              <div className="row">
                <div className="col col-8" style={{ margin: '0 auto' }}>
                  <Generics.Body.RatingStar rating={list.rating} />
                </div>
              </div>
            </div>
            <div className="col col-3 border">{list.condition}</div>
            <div className="col col-2 border">$ {list.price}</div>
          </div>
        );
      })}
      <div className="mb-4" />
    </>
  );

  columnCaret = colName =>
    colName === this.state.listSortBy ? (
      'asc' === this.state.listDirection ? (
        <i className="fa fa-caret-up" aria-hidden="true" name={colName} />
      ) : (
        <i className="fa fa-caret-down" aria-hidden="true" name={colName} />
      )
    ) : (
      <></>
    );

  onColumnClick = event => {
    let bookData = this.state.bookData;
    let name = event.target.getAttribute('name');
    if (name === this.state.listSortBy) {
      if ('asc' === this.state.listDirection) {
        bookData.Listings = bookData.Listings.sort((a, b) => a[name] < b[name]);
        this.setState({
          listDirection: 'dsc',
          bookData
        });
      } else {
        bookData.Listings = bookData.Listings.sort((a, b) => a[name] > b[name]);
        this.setState({
          listDirection: 'asc',
          bookData
        });
      }
    } else {
      bookData.Listings = bookData.Listings.sort((a, b) => a[name] > b[name]);
      this.setState({
        listSortBy: name,
        listDirection: 'asc',
        bookData
      });
    }
  };

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

export default ListingList;
