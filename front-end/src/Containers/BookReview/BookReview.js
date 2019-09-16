import React, { Component } from 'react';
import Generics from '../../Generics';
import '../../Containers/BookReview/BookReview.css';
import CommentBox from '../../Containers/CommentBox/CommentBox';
let debug = true;

let bookJson = {
  data: {
    title: 'Book Sample Title',
    isbn: '111-111-111',
    authors: ['Adam Bob', 'Calvin Dan'],
    rating: 2.5,
    description:
      'Pretend there is a really good paragraph here about how amazing this books is.',
    pictureurl:
      'https://diybookcovers.com/wp-content/uploads/2017/02/newcovers3d.png'
  }
};

class BookReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: {
        showSideBar: false,
        pictureurl: null,
        title: null,
        isbn: null,
        authors: null,
        description: null,
        rating: null
      }
    };
  }

  componentDidMount = () => {
    if (debug) {
      this.setState({
        bookData: bookJson.data,
        renderReady: true
      });
    } else {
      //coming soon, once backend is up.
    }
  };

  render() {
    return (
      <div>
        <Generics.NavBar />

        <Generics.Header />
        <Generics.Body
          noSideBar={!this.state.showSideBar}
          content={
            <div className="container-fluid h-100 w-100">
              <div className="row h-100 align-items-center">
                <div className="col-sm-4  ">
                  <div>
                    <img
                      src={this.state.bookData.pictureurl}
                      className="img-fluid"
                      alt="cover"
                    />
                  </div>
                </div>
                <div className="col-sm-8 p-4">
                  <div>
                    <h1 className="">{this.state.bookData.title}</h1>
                  </div>
                  <h5>ISBN: {this.state.bookData.isbn}</h5>
                  <div>
                    <h5 className="">{this.state.bookData.authors}</h5>
                  </div>
                  <h5>Rating: {this.state.bookData.rating}</h5>
                  <div>
                    <h5>{this.state.bookData.description}</h5>
                  </div>
                  <div className="mt-4">
                    <CommentBox />
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Generics.Footer />
      </div>
    );
  }
}

export default BookReview;
