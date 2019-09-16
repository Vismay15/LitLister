import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

class ChatLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatLogData: props.logData
    };
  }

  componentWillReceiveProps = props => {
    this.setState({ chatLogData: props.logData });
  };

  componentDidMount = () => {
    this.ps = new PerfectScrollbar(ReactDOM.findDOMNode(this), {
      wheelPropagation: true,
      suppressScrollX: true
    });
    let height = ReactDOM.findDOMNode(this).scrollHeight;
    ReactDOM.findDOMNode(this).scrollTop = height;
  };

  componentDidUpdate = _ => {
    ReactDOM.findDOMNode(this).scrollTop = ReactDOM.findDOMNode(
      this
    ).scrollHeight;
    this.ps.update();
  };

  render = () => {
    return (
      <div className="chat">
        {this.state.chatLogData.map(({ message }, i) => (
          <p className="text-dark ml-4" key={i}>
            {' '}
            {message}{' '}
          </p>
        ))}
      </div>
    );
  };
}

export default ChatLog;
