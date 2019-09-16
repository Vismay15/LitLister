import React, { Component } from 'react';

import '../../Containers/About/About.css';
import gearLogo from '../../Containers/About/Icons/gear_white.svg';
import Generics from '../../Generics';
import members from '../../Containers/About/members';
class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSideBar: false,
      profiles: members.map(member => require('./' + member))
    };
    this.teamCards = this.teamCards.bind(this);
  }
  teamCards = () => (
    <>
      {members.map((_, i) => {
        let profile = this.state.profiles[i];
        return (
          <div className="col-xl-3 col-md-6 mb-4" key={i}>
            <div className="card border-0 ">
              <img
                src={require(`./${profile.picture}`)}
                className="card-img-top cover"
                height="250"
                wdith="200"
                alt="..."
              />
              <div className="card-body text-center">
                <h5 className="card-title mb-0">{profile.name}</h5>
                <div className="card-text text-black-50">{profile.role}</div>
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
        <Generics.Body
          noSideBar={!this.state.showSideBar}
          content={
            <div className="container-fluid w-100  about-body height-100">
              <div className="row  main-box">
                <span className="header-text-big m-auto  text-center p-4">
                  What is LitLister?
                </span>
                <p className="p-5 text-over-image">
                  We are college students helping others fight against rising
                  prices of textbooks. College is expensive enough so we wanted
                  to create something to bring the pain to greedy publishers.
                </p>

                <svg
                  className="pt-5"
                  width="100%"
                  height="172"
                  viewBox="0 0 100% 172"
                  fill="none"
                >
                  <path fill="#212c4f">
                    <animate
                      repeatCount="indefinite"
                      fill="freeze"
                      attributeName="d"
                      dur="10s"
                      values="M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z;

    M0 86.3149C316 86.315 444 159.155 884 51.1554C1324 -56.8446 1320.29 34.1214 1538 70.4063C1814 116.407 2156 188.408 2560 86.315V232.317L0 232.316V86.3149Z;

    M0 53.6584C158 11.0001 213 0 363 0C513 0 855.555 115.001 1154 115.001C1440 115.001 1626 -38.0004 2560 53.6585V199.66L0 199.66V53.6584Z;
 
    M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z;"
                    />
                  </path>
                </svg>
              </div>

              <div className="row  about-box">
                <span className="header-text  text-center  mt-3 p-4">
                  We are made to fight against expensive books and save you
                  money.
                </span>
                <h4 className="p-5">
                  We are college students helping others fight against rising
                  prices of textbooks. College is expensive enough so we wanted
                  to create something to bring the pain to greedy publishers.
                </h4>
              </div>
              <div className="row p-3 m-3 about-box">
                <div className="col header-text text-center align-middle">
                  <span>
                    No gimmicks. No ICO's. We work around the clock to make a
                    business that works for you.
                  </span>
                </div>
                <div className="col-md-auto  m-auto ">
                  <div className="circle m-auto " id="gearBox">
                    <img
                      id="gearLogo2"
                      width="80"
                      height="80"
                      src={gearLogo}
                      alt="gear"
                    />
                    <img id="gearLogo" src={gearLogo} alt="gear" />
                  </div>
                </div>
              </div>
              <div className="row about-box">
                <h4 className="p-5 text-center">
                  We have only one goal and that is to set you up with your
                  books for the coming semester. Do not stress about that one
                  really expensive textbook. We will help you find a great deal
                  on it.
                </h4>
              </div>

              <div className="row  about-box ">
                <span className="header-text  text-center  m-auto p-4">
                  Meet the team.
                </span>
                <h4 className="p-5">
                  We are college students helping others fight against rising
                  prices of textbooks. College is expensive enough so we wanted
                  to create something to bring the pain to greedy publishers.
                </h4>
              </div>
              <div className="row justify-content-center flex-fill w-100">
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

export default About;
