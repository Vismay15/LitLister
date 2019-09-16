import React, { Component } from 'react';

import { Auth } from '../../api';

import logo from './logo.svg';
import './NavBar.css';
import cartLogo from './shoppingCart.svg';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: '',
      password: '',
      query: '',
      category: 'title'
    };
    if (this.props.category) {
      this.state.category = this.props.category;
      this.state.query = this.props.query;
    }
    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount = () => {
    Auth.getLogin().then(user => this.setState({ user }));
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onLogin = event => {
    event.preventDefault();
    Auth.postLogin(this.state.email, this.state.password).then(response => {
      if (response.firstname) {
        this.setState({ user: response });
        window.location.reload();
      } else {
      }
    });
  };

  onSignUp = event => {
    event.preventDefault();
    window.location = '/signup';
  };

  onSearch = event => {
    event.preventDefault();
    if ('' !== this.state.query) {
      window.location = `/search/${this.state.category}/${
        this.state.query
      }/page/1`;
    }
  };

  onSignOut = event => {
    event.preventDefault();
    Auth.postLogout().then(response => {
      if (response.ok) {
        this.setState({ user: null });
        window.location.reload();
      }
    });
  };

  render = () => {
    let navBarSearchForm = (
      <form className="form-inline flex-fill mr-2" onSubmit={this.onSearch}>
        <div className="input-group flex-fill" onSubmit={this.onSearch}>
          <div className="input-group-prepend" onSubmit={this.onSearch}>
            <select
              id="categorySelect"
              className="form-control bg-warning text-dark border-warning"
              name="category"
              value={this.state.category}
              onChange={this.onChange}
              style={{
                boxShadow: '0 0 0 0.2rem rgba(132, 0, 255, 0)'
              }}
            >
              <option>title</option>
              <option>author</option>
              <option>isbn</option>
            </select>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="what are the books you are looking for?"
            name="query"
            value={this.state.query}
            onChange={this.onChange}
            style={{
              boxShadow: '0 0 0 0.2rem rgba(132, 0, 255, 0)'
            }}
            onSubmit={this.onSearch}
          />
          <div className="input-group-append">
            <button
              className="btn btn-success"
              type="button"
              style={{
                boxShadow: '0 0 0 0.2rem rgba(132, 0, 255, 0)'
              }}
              onClick={this.onSearch}
              onSubmit={this.onSearch}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    );
    let navBarLogInButton = (
      <div className="dropdown">
        <button
          variant="primary"
          id="LoginButton"
          className="btn btn-outline-primary mr-2 my-2 my-sm-0 dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Login
        </button>
        <div className="dropdown-menu" aria-labelledby="LoginButton">
          <div className="container">
            <div className="form-group">
              <input
                type="text"
                name="email"
                placeholder="  email"
                value={this.state.email}
                onChange={this.onChange}
                style={{ marginBottom: '1em' }}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="  password"
                value={this.state.password}
                onChange={this.onChange}
                style={{ marginBottom: '1em' }}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-block btn-outline-primary"
                type="submit"
                onClick={this.onLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    let navBarSignOutButton = (
      <button
        variant="primary"
        id="LoginButton"
        className="btn btn-primary ml-2 my-2 mr-2 my-sm-0"
        type="submit"
        onClick={this.onSignOut}
      >
        Sign Out
      </button>
    );
    let navBarSignUpButton = (
      <button
        variant="primary"
        id="SignUpButton"
        className="btn btn-primary my-2 mr-2 my-sm-0"
        type="submit"
        onClick={this.onSignUp}
      >
        Sign Up
      </button>
    );
    let navBarCartLogo = (
      <img
        src={cartLogo}
        className="mr-2"
        height="30"
        width="30"
        alt="banner"
        onClick={_ => (window.location = 'user/1/cart')}
      />
    );

    let navBarCartItem = (
      <button
        variant="primary"
        id="cartDiv"
        className="btn btn-primary my-2 mr-2 my-sm-0"
        onClick={_ => (window.location = 'user/1/cart')}
      >
        {' '}
        0
      </button>
    );
    const { user } = this.state;
    if (user) {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <img src={logo} height="28" alt="banner" />
            {'  '} LitLister
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" />
            {navBarSearchForm}
            <form className="form-inline my-2 my-lg-0">
              <div className="dropdown show">
                <a
                  className="btn btn-secondary dropdown-toggle text-light"
                  href="/"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Hi, {this.state.user.firstname}
                </a>

                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <a className="dropdown-item" href={`/user/${user.uid}`}>
                    User Profile
                  </a>
                  <a
                    className="dropdown-item"
                    href={`/user/${user.uid}/listing`}
                  >
                    Create a listing
                  </a>
                  <a className="dropdown-item" href="/transaction">
                    Transaction history
                  </a>
                  <a
                    className="dropdown-item"
                    href={`/user/${user.uid}/report`}
                  >
                    User Report
                  </a>
                </div>
              </div>

              {navBarSignOutButton}
              {navBarCartLogo}
              {navBarCartItem}
            </form>
          </div>
        </nav>
      );
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <img src={logo} height="28" alt="banner" />
          {'  '} LitLister
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav" />
          {navBarSearchForm}
          <form className="form-inline my-2 my-lg-0">
            <div> &nbsp;</div>
            {navBarLogInButton}
            {navBarSignUpButton}
            <div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
            <div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
          </form>
        </div>
      </nav>
    );
  };
}
export default Navbar;
