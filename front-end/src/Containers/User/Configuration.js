import React, { Component } from 'react';

import Generics from '../../Generics';

let userJson = {
  data: {
    generalInfo: {
      firstname: 'Qwerty',
      lastname: 'Asdfg',
      email: 'qwe@asd.zxc'
    },
    buyerInfo: {},
    sellerInfo: {}
  }
};

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideBar: false,
      firstname: '',
      lastname: '',
      email: '',
      renderReady: false
    };
    this.bodyContent = this.bodyContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      renderReady: true,
      firstname: userJson.data.generalInfo.firstname,
      lastname: userJson.data.generalInfo.lastname,
      email: userJson.data.generalInfo.email
    });
  };

  bodyContent = () =>
    this.state.renderReady ? (
      <div className="row">
        <div className="col-2" />
        <div className="col">
          <form className="m-4">
            <div className="form-group">
              <h1>User Configuration</h1>
            </div>
            <br />
            <div className="form-group">
              <h2>General Info</h2>
            </div>
            <div className="form-group">
              <div className="form-group row">
                <label className="col-sm-6" htmlFor="form-first-name">
                  First Name
                </label>
                <label className="col-sm-6" htmlFor="form-last-name">
                  Last Name
                </label>
              </div>
              <div className="form-group row">
                <input
                  type="text"
                  className="form-control col"
                  id="form-first-name"
                  placeholder="Enter  first name"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                  style={{ marginLeft: '1em', marginRight: '1em' }}
                />
                <input
                  type="text"
                  className="form-control col"
                  id="form-last-name"
                  placeholder="Enter last name"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  style={{ marginLeft: '1em', marginRight: '1em' }}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="form-email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="form-email"
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <h2>Buyer Info</h2>
            </div>
            <div className="form-group">
              <h2>Seller Info</h2>
            </div>
            <button
              type="submit"
              className="btn btn-success"
              onClick={this.onSubmit}
            >
              Update User Configuration
            </button>
          </form>
        </div>
        <div className="col-2" />
      </div>
    ) : (
      <Generics.Body.Loading />
    );

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
  };

  render = () => (
    <div>
      <Generics.NavBar />
      <Generics.Body
        noSideBar={!this.state.showSideBar}
        content={this.bodyContent()}
      />
      <Generics.Footer />
    </div>
  );
}

export default Configuration;
