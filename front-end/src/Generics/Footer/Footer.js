import React, { Component } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    const footerLink = [
      '',
      'About',
      'Contact',
      'Team',
      'Invest',
      'Terms Of Service'
    ];
    let linkNames = footerLink.map((linkUrl, i) => {
      return (
        <div className="d-inline  m-2" key={i}>
          <Link to={`/${linkUrl}`}>
            <span className="text-muted">
              <strong id="footerLink">{linkUrl}</strong>
            </span>
          </Link>
        </div>
      );
    });
    return (
      <div
        style={{
          position: 'relative',
          right: '0',
          bottom: '0',
          left: '0'
        }}
      >
        <div
          id="mainAppFooter"
          className="container-fluid p-2 bg-dark justify-content-center"
        >
          <div className="row mx-auto justify-content-center">
            <div className="m-2">{linkNames}</div>
          </div>
          <div className="row mt-2 mx-auto justify-content-center">
            <div className="text-small">LitLister ©2019</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
