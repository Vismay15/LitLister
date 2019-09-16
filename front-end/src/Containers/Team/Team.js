import React, { Component } from 'react';
import Generics from '../../Generics';
import '../Team/Team.css';
import members from '../About/members';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideBar: false,
      profiles: members.map(member => require('../About/' + member))
    };
    this.teamCards = this.teamCards.bind(this);
  }
  teamCards = () => (
    <>
      {members.map((_, i) => {
        const profile = this.state.profiles[i];
        return (
          <div className="col-xl-3 col-md-6 mb-4" key={i}>
            <div className="border-0 team-card text-center ">
              <img
                src={require(`./${profile.picture}`)}
                className="img-fluid pb-2"
                alt="..."
              />
              <div className="p-3">
                <h5 className="card-title mb-0">{profile.name}</h5>
                <div className="card-text role-text">{profile.role}</div>
                <div className="cart-text text-black-50">
                  {profile.description}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
  render() {
    return (
      <div>
        <Generics.NavBar />

        <Generics.Header />
        <Generics.Body
          noSideBar={!this.state.showSideBar}
          content={
            <div className="container-fluid h-100 main-body justify-content-center">
              <div className="row justify-content-center p-4">
                <div className="big-text">Who is the team?</div>
              </div>
              <div className="row justify-content-center p-4">
                {this.teamCards()}
              </div>
            </div>
          }
        />
        <Generics.Footer />
      </div>
    );
  }
}
export default Team;
