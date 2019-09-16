import React, { Component } from 'react';

class Loading extends Component {
  render = () => (
    <div className='container' style={{ minHeight: '80vh' }}>
      <div
        align='center'
        style={{
          minHeight: '68vh',
          paddingTop: '30vh'
        }}
      >
        <div
          className='spinner-border text-info'
          style={{
            width: '8em',
            height: '8em'
          }}
        >
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
