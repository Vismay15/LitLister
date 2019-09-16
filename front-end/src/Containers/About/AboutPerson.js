import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class AboutPerson extends Component {
  constructor(props) {
    super(props);
    let name = props.match.params.person;
    try {
      this.state = {
        profile: require("./" + name)
      };
    } catch (_) {
      this.state = {
        fail: true
      };
    }
  }
  render() {
    if (this.state.fail) {
      return <Redirect to={`${window.location.pathname}/404`} />;
    }
    return (
      <div>
        <div className="container">
          <Link to="/">
            <button type="button" className="btn btn-info">
              Home Page
            </button>
          </Link>
        </div>
        <div className="container">
          <div className="row mt-3">
            <div className="col-3 text-center">
              <img
                src={require(`./${this.state.profile.picture}`)}
                className="img-fluid"
                alt="fluid"
              />
              <br />
              <h3>{this.state.profile.name}</h3>
              <h4>{this.state.profile.role}</h4>
              <br />
              <h6>
                <span role="img" aria-label="emoji">
                  📧
                </span>{" "}
                {this.state.profile.email}
              </h6>
              <h6>
                <span role="img" aria-label="emoji">
                  🌐
                </span>{" "}
                <a href={this.state.profile.website}>
                  {this.state.profile.website}
                </a>
              </h6>
            </div>
            <div className="col">
              <p className="lead h5">{this.state.profile.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPerson;
