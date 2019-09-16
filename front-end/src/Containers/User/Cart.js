import React, { Component } from 'react';
import Generics from '../../Generics';
import '../User/Cart.css';
class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSideBar: false
    };
  }
  render() {
    return (
      <div>
        <Generics.NavBar />

        <Generics.Header />
        <Generics.Body
          noSideBar={!this.state.showSideBar}
          content={
            <div className="row p-4 h-100 ">
              <div className="col">
                <h1>Your Shopping Cart</h1>
                <h3 className="m-4">Nothing so far!</h3>
              </div>
              <div className="col-4 justify-content-center">
                <div className="cartTotalBox p-3">
                  <h3>Your Cart Total:</h3>

                  <h4 className="mb-4">$0.00</h4>
                  <button className="btn btn-primary">
                    Proceed To Checkout
                  </button>
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
export default Cart;
