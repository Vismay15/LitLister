import React, { Component } from 'react';
import Generics from '../../../Generics';
import '../404/NotFound.css';
import questionMark from '../404/question_mark.svg';
class NotFound extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSideBar: false
    };
  }
  render() {
    return (
      <div>
        <Generics.NavBar />
        <Generics.Body
          noSideBar={!this.state.showSideBar}
          content={
            <div className="container-fluid h-100  main-body align-items-center d-flex justify-content-center">
              <div className="row  justify-content-center ">
                <div id="big-text">
                  Whoops. Sorry but we could not find what you are looking for.
                </div>
                <img
                  className="img-fluid  w-100"
                  src={questionMark}
                  alt="questionMark"
                />
              </div>
            </div>
          }
        />
        <Generics.Footer />
      </div>
    );
  }
}

export default NotFound;
