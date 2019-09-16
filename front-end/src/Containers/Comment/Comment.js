import React, { Component } from 'react';
import '../Comment/Comment.css';
import RatingStars from '../../Generics/Body/RatingStar/RatingStar';
var debug = true;
class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sellerName: '',
      commentText: '',
      ratingValue: 0
    };
  }

  componentDidMount = () => {
    if (debug) {
      this.setState({
        sellerName: 'superUser92',
        commentText:
          'This seller is great. Always on time. Transactions are always quick too',
        ratingValue: 4.2
      });
    } else {
      //coming soon, once backend is up.
    }
  };
  render() {
    return (
      <div className="container p-2 bg-white " id="CommentContainer">
        <div className="row ">
          <div className="px-5 py-2 mb-3 w-10">
            <RatingStars rating={this.state.ratingValue} dimension={12} />
          </div>

          <div className="col">
            <h4>{this.state.sellerName}</h4>

            <h5>{this.state.commentText}</h5>
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
