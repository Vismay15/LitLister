import React, { Component } from 'react';
import Generics from '../../Generics';
import '../../Containers/Contact/Contact.css';
class Contact extends Component {
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
            <div className="container-fluid h-100 d-flex align-items-center justify-content-center main-body">
              <div className="row justify-content-center p-4">
                <div className="big-Text">Have Any Questions?</div>
                <h5 style={{ color: 'white' }} className="m-4">
                  If you have any questions or suggestions for us feel free to
                  shoot us an email at contact@litlister.com. We will get back
                  to you as soon as we can.
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
export default Contact;
