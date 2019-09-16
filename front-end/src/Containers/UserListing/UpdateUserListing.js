import React, { Component } from 'react';

import Generics from '../../Generics';
import './UserListing.css';

import { Book, Listing } from '../../api';

class CreateUserListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.match.params.uid,
      lid: props.match.params.lid,
      bid: null,
      showSideBar: false,
      bookData: null,
      userDescription: '',
      userPrice: 0,
      listData: null,
      bookCondition: 'Book Condition',
      selectedMeetingPoint: null,
      meetingPoints: null,
      listerImages: [],
      listerImageDisplayIndex: null,
      listerImageCapacity: 5,
      renderReady: false
    };
  }

  componentDidMount = () => {
    Listing.getList(this.state.lid).then(({ list: listData }) => {
      if (listData) {
        Book.getBook(listData.bid).then(bookData => {
          this.setState({
            bookData,
            listData,
            bookCondition: listData.condition,
            userPrice: listData.price,
            renderReady: true
          });
        });
      }
    });
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onImageUpload = event => {
    let { listerImages, listerImageCapacity } = this.state;
    let images = listerImages;
    let index = 0;
    if (images.length < listerImageCapacity) {
      images.push(URL.createObjectURL(event.target.files[0]));
      index = images.length - 1;
    }

    this.setState({
      listerImages: images,
      listerImageDisplayIndex: index
    });
  };
  onImageRemove = _ => {
    let { listerImages, listerImageDisplayIndex } = this.state;
    let images = listerImages;
    if (0 < images.length) {
      images.pop();
      if (0 === images.length) {
        this.setState({ listerImages: images, listerImageDisplayIndex: null });
      } else if (listerImageDisplayIndex === images.length) {
        this.setState({
          listerImages: images,
          listerImageDisplayIndex: listerImageDisplayIndex - 1
        });
      } else {
        this.setState({ listerImages: images });
      }
    }
  };
  onUpdate = event => {
    event.preventDefault();
    Listing.putListUpdate(
      this.state.uid,
      this.state.bookData.bid,
      this.state.userPrice,
      this.state.bookCondition,
      this.state.lid
    ).then(({ bid, lid }) => {
      window.location = `/book/${bid}/list/${lid}`;
    });
  };

  onDelete = event => {
    event.preventDefault();
    Listing.deleteList(this.state.lid).then(_ => (window.location = '/'));
  };

  onShowOrHide = _ => this.setState({ showSideBar: !this.state.showSideBar });

  renderListingForm = () => (
    <>
      <br />
      <div className="row">
        <div className="col-6">
          <img
            className="d-block w-100"
            src={this.state.bookData.pictureurl}
            alt="placeholder"
          />
          <br />
          <div className="row">
            <div className="form-group">
              <div className="row">
                <div className="col-6">
                  <p>Upload up to 5 images of the book you wish to sell.</p>
                  <label
                    htmlFor="file-upload"
                    className="img-btn-plus"
                    style={{ display: 'inline-block' }}
                  >
                    +
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={this.onImageUpload}
                    style={{ display: 'none' }}
                  />
                  <button
                    className="img-btn-minus"
                    onClick={this.onImageRemove}
                    style={{ marginRight: '15px', display: 'inline-block' }}
                  >
                    -
                  </button>
                  current image:
                  {
                    <img
                      alt="cover"
                      className="img-fluid"
                      src={
                        this.state.listerImages[
                          this.state.listerImageDisplayIndex
                        ]
                      }
                    />
                  }
                </div>

                <div className="col-6">
                  <div className="row">
                    {this.state.listerImages.map((image, i) => (
                      <div className="UploadedImage" key={i}>
                        <img alt="cover" className="img-fluid" src={image} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div>
            <form>
              <div className="col">
                <div className="text-default">
                  Title: {this.state.bookData.title}
                </div>
                <br />
                <div className="text-default">
                  Description: {this.state.bookData.description}
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="form">User description:</label>
                  <textarea
                    rows="4"
                    type="userDescription"
                    className="form-control"
                    id="form-userDescription"
                    placeholder="Enter book description"
                    name="userDescription"
                    value={this.state.userDescription}
                    onChange={this.onChange}
                  />
                </div>
                Book Condition:
                <select
                  className="custom-select"
                  name="bookCondition"
                  value={this.state.bookCondition}
                  onChange={this.onChange}
                >
                  <option value="Book Condition">Book Condition</option>
                  <option value="New">New</option>
                  <option value="Fair">Fair</option>
                  <option value="Used(no missing pages)">
                    Used(no missing pages)
                  </option>
                  <option value="Missing pages">Missing pages</option>
                  <option value="Bad">Bad</option>
                </select>
                <div className="form-group">
                  Price:
                  <textarea
                    rows="1"
                    type="userPrice"
                    className="form-control"
                    id="form-userPrice"
                    placeholder="Enter price"
                    name="userPrice"
                    value={this.state.userPrice}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </form>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.onUpdate}
            >
              Update
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              style={{
                float: 'right'
              }}
              onClick={this.onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );

  render() {
    let bodyContent = (
      <>
        {this.state.renderReady ? (
          <div>
            <div className="container">
              <div className="row-1">
                {this.state.bookData && this.renderListingForm()}
              </div>
            </div>
          </div>
        ) : (
          <Generics.Body.Loading />
        )}
      </>
    );
    return (
      <div>
        <Generics.NavBar />
        <Generics.Header />
        <Generics.Body
          noSideBar={!this.state.showSideBar}
          content={bodyContent}
        />
        <Generics.Footer />
      </div>
    );
  }
}

export default CreateUserListing;
