import React, { Component } from 'react';

import Generics from '../../Generics';

import { Chat, Profile as ProfileAPI } from '../../api';
import defaultProfileImage from './images/profile_default.png';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guest: true,
      uid: props.match.params.uid,
      firstname: '',
      lastname: '',
      rating: null,
      email: '',
      description: '',
      chatListData: [],
      reportListData: [],
      profileData: null,
      display: null,
      listings: [],
      onUserNavigation: {
        Profile: this.onProfile,
        Message: this.onMessage,
        Review: this.onReview,
        Listing: this.onListing,
        Report: _ => this.setState({ display: 'Report' })
      },
      renderReady: false
    };
    this.bodyContent = this.bodyContent.bind(this);
    this.profileSideBar = this.profileSideBar.bind(this);
    this.userNavigation = this.userNavigation.bind(this);
    this.userContent = this.userContent.bind(this);
    this.displayRating = this.displayRating.bind(this);
    this.onUserNavigation = this.onUserNavigation.bind(this);
    this.onProfile = this.onProfile.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onReview = this.onReview.bind(this);
    this.onListing = this.onListing.bind(this);
    this.onReport = this.onReport.bind(this);
    this.onConfigure = this.onConfigure.bind(this);
  }

  componentDidMount = () => {
    ProfileAPI.getUserProfile(this.state.uid).then(user => {
      if (user) {
        Chat.getUserChats().then(chats => {
          if (chats) {
            Promise.all(chats.map(chat => Chat.getChatroom(chat.crid))).then(
              chatrooms => {
                let chatListData = chatrooms.map(chatroom => ({
                  cid: chatroom.Chats[0].cid,
                  crid: chatroom.Chats[0].crid,
                  sender:
                    chatroom.Chats[0].Receiver.firstname +
                    ' ' +
                    chatroom.Chats[0].Receiver.lastname,
                  lastMessage: chatroom.Chatlogs.length
                    ? chatroom.Chatlogs[
                        chatroom.Chatlogs.length - 1
                      ].message.split(':')[1]
                    : ''
                }));
                this.setState({
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  rating: user.rating,
                  listings: user.Listings,
                  chatListData,
                  display: 'Profile'
                });
              }
            );
          } else {
            this.setState({
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              rating: user.rating,
              listings: user.Listings,
              chatListData: [],
              display: 'Profile'
            });
          }
        });
      } else {
        window.location = '/';
      }
    });
  };

  bodyContent = () => {
    let guest = this.state.guest;
    return (
      <div>
        {this.state.display ? (
          <div
            className="container"
            style={{
              minHeight: '68vh',
              marginTop: '8vh',
              paddingBottom: '8vh'
            }}
          >
            <div className="row">
              {this.profileSideBar({ guest })}
              <div
                className="col"
                style={{
                  marginLeft: '2em  '
                }}
              >
                {this.userNavigation()}
                {this.userContent({ guest })}
              </div>
            </div>
          </div>
        ) : (
          <Generics.Body.Loading />
        )}
      </div>
    );
  };

  profileSideBar = ({ guest }) => (
    <div
      className="col-3"
      style={{
        marginTop: '2em'
      }}
    >
      <img
        src={defaultProfileImage}
        className="img-fluid img-thumbnail"
        alt="profile"
        style={{
          borderBottomWidth: '0',
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0'
        }}
      />
      <ul className="list-group">
        <li
          className="list-group-item text-center"
          style={{
            borderTopWidth: '0',
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0'
          }}
        >
          <h3>
            {this.state.firstname} {this.state.lastname}
          </h3>
          {this.state.rating && this.displayRating(this.state.rating)}
        </li>
        <button
          type="button"
          className="list-group-item list-group-item-action"
          name="Message"
          onClick={this.onMessage}
        >
          <i className="fa fa-envelope" /> Message
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
          name="Review"
          onClick={this.onReview}
        >
          <i className="fa fa-star" /> Review
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
          name="Listing"
          onClick={this.onListing}
        >
          <i className="fa fa-list" /> Listing
        </button>
        {guest ? (
          <button
            type="button"
            className="list-group-item list-group-item-action"
            onClick={this.onReport}
          >
            <i className="fa fa-flag" /> Report
          </button>
        ) : (
          <button
            type="button"
            className="list-group-item list-group-item-action"
            onClick={this.onConfigure}
          >
            <i className="fa fa-cogs" /> Configure
          </button>
        )}
      </ul>
    </div>
  );

  userNavigation = () => (
    <ul className="nav justify-content-center nav-tabs">
      {['Profile', 'Message', 'Review', 'Listing', 'Report'].map((tab, i) => {
        if (this.state.display === tab) {
          return (
            <li key={i} className="nav-item">
              <a
                className="nav-link active"
                href="# "
                name={tab}
                onClick={this.onUserNavigation}
              >
                {tab}
              </a>
            </li>
          );
        } else {
          return (
            <li key={i} className="nav-item">
              <a
                className="nav-link"
                href="# "
                name={tab}
                onClick={this.onUserNavigation}
              >
                {tab}
              </a>
            </li>
          );
        }
      })}
    </ul>
  );

  userContent = ({ guest }) => {
    let { listings, display, chatListData, reportListData, uid } = this.state;
    if ('Profile' === display) {
      return (
        <>
          <br />
          <h2>Profile</h2>
          <div>{this.state.description}</div>
        </>
      );
    } else if ('Message' === display) {
      return (
        <div>
          <br />
          {chatListData.map((chat, i) => (
            <div className="row" key={i}>
              <div className="col">
                <div
                  className="card"
                  onClick={_ => (window.location = `/chatroom/${chat.crid}`)}
                >
                  <div className="card-body">
                    <h5 className="card-title">{chat.sender}</h5>
                    <p className="card-text">{chat.lastMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else if ('Review' === display) {
      return (
        <div>
          <br />
        </div>
      );
    } else if ('Listing' === display) {
      return (
        <div>
          <br />
          {listings.map((listing, i) => (
            <div className="row" key={i}>
              <div className="col">
                <div
                  className="card"
                  onClick={_ =>
                    (window.location = `/book/${listing.bid}/list/${
                      listing.lid
                    }`)
                  }
                >
                  <div className="card-body">
                    <h5 className="card-title">Listing #:{listing.lid}</h5>
                    <p className="card-text">
                      Book Title: {listing.Book.title}
                    </p>
                    <p className="card-text">Author: {listing.Book.author}</p>
                    <p className="card-text">ISBN: {listing.Book.isbn}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else if ('Report' === display) {
      return (
        <div>
          <br />
          {reportListData.map((report, i) => (
            <div className="row" key={i}>
              <div className="col">
                <div
                  className="card"
                  onClick={_ =>
                    (window.location = `./${uid}/report/${report.rid}`)
                  }
                >
                  <div className="card-body">
                    <h5 className="card-title">{report.title}</h5>
                    <p className="card-text text-dark">{report.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  displayRating = rating => {
    return (
      <span>
        <br />
        <Generics.Body.RatingStar rating={rating} />
      </span>
    );
  };

  onUserNavigation = event => {
    this.state.onUserNavigation[event.target.name](event);
  };

  onProfile = event => {
    event.preventDefault();
    this.setState({ display: event.target.name });
  };

  onMessage = event => {
    event.preventDefault();
    this.setState({ display: event.target.name });
  };

  onReview = event => {
    event.preventDefault();
    this.setState({ display: event.target.name });
  };

  onListing = event => {
    event.preventDefault();
    this.setState({ display: event.target.name });
  };

  onReport = event => {
    event.preventDefault();
    window.location = `./${this.state.uid}/report`;
  };

  onConfigure = event => {
    event.preventDefault();
  };

  render = () => {
    return (
      <div>
        <Generics.NavBar />
        <Generics.Body
          noSideBar={!this.state.showSideBar}
          content={this.bodyContent()}
        />
        <Generics.Footer />
      </div>
    );
  };
}

export default Profile;
