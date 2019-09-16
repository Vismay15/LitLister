import React, { Component } from 'react';

import Generics from '../../Generics';
import ChatLog from './ChatLog';

import { socket, Chat as ChatAPI } from '../../api';

import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crid: props.match.params.crid,
      chatroomData: null,
      message: '',
      renderReady: false
    };
    socket.on(`chat:${this.state.crid}`, this.onChat);
  }

  componentDidMount = () => {
    ChatAPI.getChatroom(this.state.crid).then(chatroomData => {
      if (chatroomData) {
        console.log(chatroomData);
        this.setState({ chatroomData, renderReady: true });
      }
    });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChat = message => {
    let chatroomData = this.state.chatroomData;
    chatroomData.Chatlogs.push({ message });
    this.setState({ chatroomData });
  };

  onSubmit = event => {
    event.preventDefault();
    let { crid, message } = this.state;
    ChatAPI.putChatlog(crid, message);
    this.setState({ message: '' });
  };

  bodyContent = () => (
    <>
      {this.state.renderReady ? (
        <>{this.chatContainer()}</>
      ) : (
        <Generics.Body.Loading />
      )}
    </>
  );

  chatContainer = () => (
    <>
      <div className="row m-4">
        <div className="col-1" />
        <div className="col">
          <h1>
            Chat with {this.state.chatroomData.Chats[0].Receiver.firstname}
          </h1>
        </div>
      </div>
      <div className="row m-4">
        <div className="col-1" />
        <div className="col">
          <ChatLog logData={this.state.chatroomData.Chatlogs} />
        </div>
        <div className="col-1" />
      </div>
      <div className="row m-4">
        <div className="col-1" />
        <div className="col">
          <form>
            <div className="input-group">
              <input
                type="text"
                className="form-control litlister-remove-focus-outline"
                placeholder="type your message here"
                name="message"
                value={this.state.message}
                onChange={this.onChange}
              />
              <div className="input-group-append">
                <button
                  className="input-group-text bg-success text-light"
                  onClick={this.onSubmit}
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-1" />
      </div>
    </>
  );

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

export default Chat;
