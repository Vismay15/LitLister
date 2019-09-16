import React, { Component } from 'react';
import Generics from '../../Generics';
import '../Invest/Invest.css';
class Invest extends Component {
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

        <Generics.Header />
        <Generics.Body
          noSideBar={!this.state.showSideBar}
          content={
            <div className="container-fluid h-100 main-body d-flex align-items-center justify-content-center">
              <div className="row justify-content-center p-4">
                <div className="big-text">Looking To Invest?</div>
                <h5 style={{ color: 'white' }}>
                  We are currently preparing to work with investors so we can
                  build the future together. Hold on tight while we prepare and
                  set up and we will update this page soon.
                </h5>
              </div>
            </div>
          }
        />
        <Generics.Footer />
      </div>
    );
  }
}
export default Invest;
