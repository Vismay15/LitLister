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

let reportJson = {
  title: 'this guy is a scammer',
  description: 'Hey, this guy scammed me on a different website.'
};

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideBar: false,
      userInfo: null,
      targetInfo: null,
      reportTitle: null,
      reportDescription: null,
      reportStatusOpen: false,
      reportResolution: 'user Anon123 is now banned, thank you for your report',
      renderReady: false
    };
    this.bodyContent = this.bodyContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      renderReady: true,
      userInfo: userJson.data.generalInfo,
      reportTitle: reportJson.title,
      reportDescription: reportJson.description
    });
  };

  bodyContent = () =>
    this.state.renderReady ? (
      <div className="row" style={{ marginRight: '0' }}>
        <div className="col-2" />
        <div className="col">
          <form className="m-4">
            <div className="form-group">
              <h2>User Report</h2>
            </div>
            <br />
            <div className="form-group">
              <div className="form-group row">
                <label className="col-sm-6" htmlFor="form-first-name">
                  Target User
                </label>
                <label className="col-sm-6" htmlFor="form-last-name">
                  Target Listing
                </label>
              </div>
              <div className="form-group row">
                <label className="col-sm-6">Anon123</label>
                <label className="col-sm-6">-</label>
              </div>
            </div>
            <div className="form-group">
              <label>Title</label>
              <br />
              <label>{this.state.reportTitle}</label>
            </div>
            <div className="form-group">
              <label>Description</label>
              <br />
              <label>{this.state.reportDescription}</label>
            </div>
            <div className="form-group">
              <label>Report Status</label>
              <br />
              <button className="btn btn-danger">Closed</button>
            </div>
            <div className="form-group">
              <label>Report Resolution</label>
              <br />
              <label>{this.state.reportResolution}</label>
            </div>
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

export default Report;
