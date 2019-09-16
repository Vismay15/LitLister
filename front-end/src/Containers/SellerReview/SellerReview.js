import React, { Component } from 'react';
import Generics from '../../Generics';
import Comment from '../../Containers/Comment/Comment';
var debug = true;

class SellerReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSideBar: false,
      sellerName: '',
      sellerRating: 0,
      ratingsCount: 0
    };
  }
  componentDidMount = () => {
    if (debug) {
      this.setState({
        sellerName: 'superUser92',
        sellerRating: 4.2,
        ratingsCount: 213
      });
    } else {
      //coming soon, once backend is up.
    }
  };
  render() {
    return (
      <div>
        <Generics.NavBar />
        <Generics.Body
          noSideBar={!this.state.showSideBar}
          content={
            <div className="container-fluid">
              <div className="row p-5 justify-content-center align-items-center ">
                <div className="col-sm-8">
                  <h1>{this.state.sellerName}</h1>
                  <h5>
                    Rating: {this.state.sellerRating}/5 (
                    {this.state.ratingsCount} Reviews)
                  </h5>
                  <h5>Comments:</h5>
                  <Comment />
                  <Comment />
                  <Comment />
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

export default SellerReview;
