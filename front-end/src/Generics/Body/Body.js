import React, { Component } from 'react';

import SideBar from './Sidebar/Sidebar';
import Loading from './Loading/Loading';
import RatingStar from './RatingStar/RatingStar';

class BodyLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideBar: false
    };
  }

  componentWillReceiveProps(_) {
    this.setState({
      showSideBar: false
    });
  }

  render() {
    return (
      <div className="container-fluid height-100">
        <div
          className="row"
          style={{ minHeight: 'calc(100vh - 88px - 57.2px)' }}
        >
          {this.state.showSideBar && (
            <div className="col-2 p-0">
              <SideBar />
            </div>
          )}
          <div className="col px-0">{this.props.content}</div>
        </div>
      </div>
    );
  }
}

BodyLanding.Loading = Loading;
BodyLanding.RatingStar = RatingStar;

export default BodyLanding;
