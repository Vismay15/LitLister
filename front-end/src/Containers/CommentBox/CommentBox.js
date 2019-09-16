import React, { Component } from 'react';
let debug = true; // set if it is in debug mode.
class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.ratingInput = React.createRef();
    this.state = {
      listingID: this.props.ID, //this is for the API
      commentInput: '',
      ratingValue: 0
    };
  }
  submitButtonHandler = () => {
    if (debug) {
    }
  };
  onChangeInputText = () => {
    this.setState({
      commentInput: this.textInput.current.value //set value to text box
    });
  };
  onChangeRatingSelect = e => {};
  componentDidMount() {
    if (this.props.ID == null) {
      this.setState({
        listingID: -1 //check to see if the prop was passed in
      });
    }
  }

  render() {
    return (
      <div className="container ">
        <div className="row">
          <h5>Leave a comment.</h5>

          <textarea
            onChange={this.onChangeInputText}
            ref={this.textInput}
            className="form-control"
            aria-label="textarea"
          />
          <button
            className="btn mt-2 btn-primary"
            onClick={this.submitButtonHandler}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
export default CommentBox;
