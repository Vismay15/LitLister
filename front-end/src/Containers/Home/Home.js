import React, { Component } from 'react';
import './Home.css';
import CashIcon from './money_icon.svg';
import BookIcon from './book_icon.svg';
import ChatIcon from './chat_icon.svg';
import MapIcon from './map_icon.svg';
import ThumbIcon from './thumbs_up.svg';
import ShieldIcon from './shield_icon.svg';
import Generics from '../../Generics';
import CustomCarousel from './CustomCarousel';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideBar: false
    };
  }

  onShowOrHide = _ => this.setState({ showSideBar: !this.state.showSideBar });

  render() {
    return (
      <div>
        <Generics.NavBar />

        <Generics.Header />
        <Generics.Body
          noSideBar={!this.state.showSideBar}
          content={
            <div className="container-fluid">
              <div
                id="bookGallery"
                className="row flex-fill py-5  justify-content-center"
              >
                <CustomCarousel />
              </div>

              <div
                id="intro1"
                className="row flex-fill p-5 justify-content-center"
              >
                <div className="col-1 mx-auto mr-1">
                  <img className="d-block" src={CashIcon} alt="Third slide" />
                </div>
                <div className="col-8 mx-auto">
                  <h2>
                    LitLister is the future of buying and selling books for
                    college students. Selling your old textbooks has never been
                    faster or easier.
                  </h2>
                </div>
              </div>

              <div
                id="intro2"
                className="row flex-fill pt-3 justify-content-center"
              >
                <h1>Safe. Fast. Easy.</h1>
              </div>
              <div
                id="intro2"
                className="row flex-fill mt-0 pb-2 justify-content-center"
              >
                <div className="col-2 mx-auto  justify-content-center">
                  <img className="mx-auto" src={BookIcon} alt="book" />
                  <h3>
                    List your book for sale on our site. You can either sell it
                    at a set price or sell it as an auction.
                  </h3>
                </div>
                <div className="col-2 mx-auto">
                  <img className="mx-auto" src={ChatIcon} alt="chat" />
                  <h3>
                    After your book has been bought, choose a place on campus to
                    meet.
                  </h3>
                </div>
                <div className="col-2 mx-auto">
                  <img className="mx-auto" src={MapIcon} alt="map" />
                  <h3>
                    Exchange books and take a small convenient code given by
                    your buyer to prove they have it.
                  </h3>
                </div>
                <div className="col-2 mx-auto">
                  <img className="mx-auto" src={ThumbIcon} alt="thumb" />
                  <h3>
                    Go home happy. There is no need to handle cash or anything.
                    We handle the entire payment process online to make sure you
                    get paid.
                  </h3>
                </div>
              </div>

              <div
                id="intro3"
                className="row flex-fill py-3 justify-content-center"
              >
                <h1>Buying has never. been. easier.</h1>
              </div>
              <div
                id="intro3"
                className="row flex-fill p-3 justify-content-center"
              >
                <div className="col-2">
                  <img className="mx-auto" src={ShieldIcon} alt="shield" />
                </div>
                <div className="col-8 align-middle my-auto">
                  <h3>
                    Buy books with ease. We handle the payment process. We also
                    make sure you get the book you bought. We provide a
                    moneyback guarantee with every purchase.
                  </h3>
                </div>
              </div>
            </div>
          }
        />
        <Generics.Footer />
      </div>
    );
  }
}

export default Home;
