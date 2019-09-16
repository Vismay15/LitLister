import React, { Component } from 'react';

import Generics from '../../Generics';

import { Search } from '../../api';

import './SearchResults.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideBar: false,
      result: null,
      page: parseInt(this.props.match.params.page),
      pageCount: null,
      category: null,
      search: null,
      query: null
    };
    let { author, isbn, title } = this.props.match.params;
    if (author) {
      this.state.category = 'author';
      this.state.search = Search.getSearchByAuthor;
      this.state.query = author;
    } else if (isbn) {
      this.state.category = 'isbn';
      this.state.search = Search.getSearchByIsbn;
      this.state.query = isbn;
    } else if (title) {
      this.state.category = 'title';
      this.state.search = Search.getSearchByTitle;
      this.state.query = title;
    }
  }

  componentDidMount = () => {
    this.state.search(this.state.query, this.state.page).then(data =>
      this.setState({
        result: data.rows,
        pageCount: Math.ceil(data.count / 5)
      })
    );
  };

  bodyContent = () => {
    if (null === this.state.pageCount) {
      return <Generics.Body.Loading />;
    } else {
      return (
        <div className="container mt-4">
          {this.pagination(this.state.page, this.state.pageCount)}
          {this.result(this.state.result)}
          {this.pagination(this.state.page, this.state.pageCount)}
        </div>
      );
    }
  };

  pagination = (currentPageIndex, pageCount) => {
    if (null === pageCount) {
      return false;
    }
    if (null === this.state.result || 0 === this.state.result.length) {
      return false;
    }
    let currentPage = (
      <li className="page-item active">
        <a className="page-link" href="# ">
          {currentPageIndex}
        </a>
      </li>
    );
    let previous = currentPageIndex !== 1 && (
      <li className="page-item">
        <a
          className="page-link"
          href="# "
          name={currentPageIndex - 1}
          onClick={this.onPageChange}
        >
          Previous
        </a>
      </li>
    );
    let next = currentPageIndex !== pageCount && (
      <li className="page-item">
        <a
          className="page-link"
          href="# "
          name={currentPageIndex + 1}
          onClick={this.onPageChange}
        >
          Next
        </a>
      </li>
    );
    let previousPageCount = currentPageIndex - 1;
    let nextPageCount = pageCount - currentPageIndex;
    let previousPages = [];
    let nextPages = [];
    for (let i = -3; i < 0; i++) {
      if (previousPageCount + i < 0) {
        continue;
      }
      previousPages.push(
        <li key={currentPageIndex + i} className="page-item">
          <a
            className="page-link"
            href="# "
            name={currentPageIndex + i}
            onClick={this.onPageChange}
          >
            {currentPageIndex + i}
          </a>
        </li>
      );
    }
    for (let i = 1; i < 5; i++) {
      if (nextPageCount - i < 0) {
        continue;
      }
      nextPages.push(
        <li key={currentPageIndex + i} className="page-item">
          <a
            className="page-link"
            href="# "
            name={currentPageIndex + i}
            onClick={this.onPageChange}
          >
            {currentPageIndex + i}
          </a>
        </li>
      );
    }
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {previous}
          {previousPages}
          {currentPage}
          {nextPages}
          {next}
        </ul>
      </nav>
    );
  };

  onPageChange = event => {
    event.preventDefault();
    const page = parseInt(event.target.getAttribute('name'));
    this.state.search(this.state.query, page).then(result => {
      window.history.pushState(
        {
          html: document.innerHTML,
          pageTitle: document.title
        },
        '',
        `./${page}`
      );
      this.setState({
        result: result.rows,
        page
      });
    });
  };

  onBookClick = event => {
    event.preventDefault();
    window.location = `/book/${event.target.getAttribute('bookid')}`;
  };

  result = result =>
    0 !== result.length ? (
      result.map((book, i) => (
        <div className="container" key={i}>
          <div className="row mt-3">
            <div className="col-3 text-center">
              <img
                src={book.pictureurl}
                className="img-fluid"
                alt="fluid"
                bookid={book.bid}
                onClick={this.onBookClick}
              />
            </div>

            <div className="col-md-4">
              <h3>{book.title}</h3>
              <span>author(s): {book.author}</span>
              <br />
              <span>isbn: {book.isbn}</span>
              <div id="summary">
                <p className="collapse" id="collapseSummary">
                  {book.description}
                </p>

                <a
                  className="collapsed"
                  data-toggle="collapse"
                  href="#collapseSummary"
                  aria-expanded="false"
                  aria-controls="collapseSummary"
                >
                  {''}
                </a>
              </div>
            </div>
            {book.Listings && (
              <div className="col-md-5">
                {0 === book.Listings.length ? (
                  'No listing avaiable'
                ) : (
                  <>
                    <div className="row justify-content-md-center text-white">
                      <div
                        className="col col-3 border"
                        style={{
                          backgroundColor: '#9370DB',
                          borderTopLeftRadius: '0.5em'
                        }}
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
                          Name
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
                          Rating
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
                          Condition
                        </p>
                      </div>
                      <div
                        className="col col-2 border"
                        style={{
                          backgroundColor: '#9370DB',
                          borderTopRightRadius: '0.5em'
                        }}
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
                          Price
                        </p>
                      </div>
                    </div>
                    {book.Listings.slice(0, 3).map((list, i) => (
                      <div
                        className="row justify-content-md-center"
                        key={i}
                        onClick={_ =>
                          (window.location = `/book/${book.bid}/list/${
                            list.lid
                          }`)
                        }
                      >
                        <div className="col col-3 border">
                          {list.Seller.firstname + ' ' + list.Seller.lastname}
                        </div>
                        <div className="col col-3 border">
                          <div className="row">
                            <div
                              className="col col-8"
                              style={{ margin: '0 auto' }}
                            >
                              <Generics.Body.RatingStar
                                rating={list.rating}
                                dimension={8}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col col-3 border">{list.condition}</div>
                        <div className="col col-2 border">{list.price}</div>
                      </div>
                    ))}
                    {3 < book.Listings.length && (
                      <div className="row">
                        <button
                          type="submit"
                          className="btn btn-primary ml-3 mt-2"
                          onClick={event =>
                            (window.location = `/book/${
                              event.target.value
                            }/list`)
                          }
                          value={book.bid}
                        >
                          See More Listings
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      ))
    ) : (
      <div className="container mt-3">
        <br />
        <h2>no result :(</h2>
        <br />
      </div>
    );

  render = () => {
    return (
      <div>
        <Generics.NavBar
          category={this.state.category}
          query={this.state.query}
        />
        <Generics.Header />
        <Generics.Body
          noSideBar={!this.state.showSideBar}
          content={this.bodyContent()}
        />
        <Generics.Footer />
      </div>
    );
  };
}

export default SearchResult;
