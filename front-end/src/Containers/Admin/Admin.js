import React, { Component } from 'react';

import Generics from '../../Generics';

import { Admin as AdminAPI } from '../../api';

let debug = true;

let json = {
  adminData: {
    issues: [
      {
        iid: 1,
        sourceUser: 13,
        targetUser: 11,
        targetListing: 1,
        title: 'scammer',
        description: 'dis guy scams',
        time: '12:22 17-04-2019'
      },
      {
        iid: 2,
        sourceUser: 8,
        targetUser: 11,
        targetListing: 1,
        title: 'ban this guy',
        description: 'he scams people',
        time: '12:36 17-04-2019'
      },
      {
        iid: 3,
        sourceUser: 11,
        title: 'help',
        description:
          'hi, ive been targetted by online mafias because I didnt want to give them any discount',
        time: '15:15 17-04-2019'
      },
      {
        iid: 4,
        sourceUser: 9,
        targetUser: 11,
        targetListing: 1,
        transaction: 1,
        title: 'scam',
        description:
          'I bought a book from this guy. He posted the condition good as new, but its actually missing some pages',
        time: '18:16 17-04-2019'
      }
    ]
  },
  userInfo: {
    8: {
      profile: {
        firstname: 'Anon2',
        lastname: '',
        email: 'anon2@non.domain',
        rating: 4.3,
        pictureurl:
          'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
        description:
          'this is a placeholder account. Turn off debug to switch to an actual profile.'
      },
      chatLog: []
    },
    9: {
      profile: {
        firstname: 'Anon3',
        lastname: '',
        email: 'anon3@non.domain',
        rating: 4.3,
        pictureurl:
          'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
        description:
          'this is a placeholder account. Turn off debug to switch to an actual profile.'
      },
      chatLog: []
    },
    11: {
      profile: {
        firstname: 'Bob',
        lastname: 'Ross',
        email: 'fake@email.domain',
        rating: 4.3,
        pictureurl:
          'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
        description:
          'this is a placeholder account. Turn off debug to switch to an actual profile.'
      },
      chatLog: []
    },
    13: {
      profile: {
        firstname: 'Anon4',
        lastname: '',
        email: 'anon4@non.domain',
        rating: 4.3,
        pictureurl:
          'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
        description:
          'this is a placeholder account. Turn off debug to switch to an actual profile.'
      },
      chatLog: []
    }
  }
};

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aid: props.match.params.aid,
      adminData: null,
      selectedIssue: null,
      renderReady: false
    };
  }

  componentDidMount = () => {
    if (debug) {
      this.setState({ adminData: json.adminData, renderReady: true });
    } else {
      AdminAPI.getAdmin(this.state.aid).then(adminData =>
        this.setState({ adminData, renderReady: true })
      );
    }
  };

  detailColumn = () => {
    let issue = this.state.selectedIssue;
    if (!issue) {
      return <>Select an issue</>;
    }

    return (
      <>
        <h1>Issue: #{issue.iid}</h1>
        <h4>Issue Description:</h4>
        <h4>{issue.description}</h4>
        <h2>Source:</h2>
        <h4>
          {json.userInfo[issue.sourceUser].profile.firstname}{' '}
          {json.userInfo[issue.sourceUser].profile.lastname}
        </h4>
        <h4>{json.userInfo[issue.sourceUser].profile.email}</h4>
        {issue.targetUser && (
          <>
            <h2>Target:</h2>
            <h4>
              {json.userInfo[issue.targetUser].profile.firstname}{' '}
              {json.userInfo[issue.targetUser].profile.lastname}
            </h4>
            <h4>{json.userInfo[issue.targetUser].profile.email}</h4>
          </>
        )}
      </>
    );
  };

  issueColumn = () =>
    this.state.adminData.issues.map((issue, i) => (
      <div
        className="card"
        key={i}
        onClick={_ => this.setState({ selectedIssue: issue })}
      >
        <div className="card-body">
          <h5 className="card-title">Issue #{issue.iid}</h5>
          <p className="card-text text-dark">source id:{issue.sourceUser}</p>
          <h5 className="card-title">{issue.title}</h5>
          <h6 className="card-title">{issue.time}</h6>
          <h6 className="card-title">assignee: Admin123</h6>
        </div>
      </div>
    ));

  resolutionColumn = () => {
    let issue = this.state.selectedIssue;
    if (!issue) {
      return <>Select an issue</>;
    }

    return (
      <>
        <h1>
          Source: {json.userInfo[issue.sourceUser].profile.firstname}{' '}
          {json.userInfo[issue.sourceUser].profile.lastname}{' '}
          <button className="btn btn-danger" style={{ marginLeft: '15px' }}>
            Ban User
          </button>{' '}
        </h1>
        <form>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              placeholder={`Message to ${
                json.userInfo[issue.sourceUser].profile.firstname
              } ${json.userInfo[issue.sourceUser].profile.lastname}`}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Send Message</button>
          </div>
        </form>
        {issue.targetUser && (
          <>
            <h1>
              Target: {json.userInfo[issue.targetUser].profile.firstname}{' '}
              {json.userInfo[issue.targetUser].profile.lastname}{' '}
              <button className="btn btn-danger" style={{ marginLeft: '15px' }}>
                Ban User
              </button>{' '}
            </h1>
            <form>
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder={`Message to ${
                    json.userInfo[issue.targetUser].profile.firstname
                  } ${json.userInfo[issue.targetUser].profile.lastname}`}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Send Message</button>
              </div>
            </form>
          </>
        )}
      </>
    );
  };

  render = () =>
    this.state.renderReady ? (
      <>
        <Generics.NavBar />
        <div className="row mt-4" style={{ marginRight: '0' }}>
          <div className="col-1" />
          <div className="col-2">
            <h2>Issues</h2>
            {this.issueColumn()}
          </div>
          <div className="col-4">
            <h2>Details</h2>
            {this.detailColumn()}
          </div>
          <div className="col-4">
            <h2>Resolution</h2>
            {this.resolutionColumn()}
          </div>
          <div className="col-1" />
        </div>
      </>
    ) : (
      <Generics.Body.Loading />
    );
}

export default Admin;
