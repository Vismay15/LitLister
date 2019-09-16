import React, { Component } from 'react';

import Generics from '../../Generics';
import GoogleMap from './GoogleMap';
import './UserListing.css';
import { Book, Search, Listing } from '../../api';

const meetingPointsJson = [
  {
    mid: 1,
    name: 'Malcolm X Plaza',
    lat: 37.7221622,
    lng: -122.4788561,
    title: 'Malcolm X Plaza',
    info: `1650 Holloway Ave, San Francisco, CA 94132 `
  },
  {
    mid: 2,
    name: 'J. Paul Leonard Library',
    lat: 37.720929,
    lng: -122.476856,
    title: 'J. Paul Leonard Library',
    info:
      '1630 Holloway Avenue, San Francisco, CA 94132, United States of America'
  },
  {
    mid: 3,
    name: 'Student Services',
    lat: 37.7236197,
    lng: -122.4812626,
    title: 'Student Services ',
    info: `1600 Holloway Ave, San Francisco, CA 94132`
  },
  {
    mid: 4,
    name: 'University Police Station',
    lat: 37.7259304,
    lng: -122.4820684,
    title: 'University Police Station',
    info: `100 N State Dr, San Francisco, CA 94132`
  },
  {
    mid: 5,
    name: 'Thornton Hall',
    lat: 37.723724,
    lng: -122.4791161,
    title: 'Thornton Hall',
    info: `17 20th Ave, San Francisco, CA 94132`
  }
];

class CreateUserListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: props.match.params.uid,
      bid: null,
      mid: null,
      showSideBar: false,
      search: '',
      searchSuggestion: <ul />,
      bookData: null,
      userPrice: 0,
      listData: null,
      bookCondition: 'Book Condition',
      selectedMeetingPoint: null,
      meetingPoints: null,
      listerImageNames: [],
      listerImages: [],
      listerImageDisplayIndex: null,
      listerImageCapacity: 1,
      renderReady: false
    };
  }

  componentDidMount = () => {
    this.setState({
      meetingPoints: meetingPointsJson,
      selectedMeetingPoint: meetingPointsJson[0],
      renderReady: true
    });

    /*
    API.getMeetingPoints().then( meetingPoints =>
      this.setState({
        meetingPoints,
        selectedMeetingPoint: meetingPoints[0],
        renderReady: true
      })
    )
    */
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onChangeMeetingPoint = event =>
    this.setState({
      selectedMeetingPoint: this.state.meetingPoints.filter(
        meetingPoint => event.target.value === meetingPoint.name
      )[0]
    });

  onChangeSearch = event => {
    let search = event.target.value;
    if (null === search || '' === search) {
      this.setState({
        search,
        searchSuggestion: <ul />
      });
    } else {
      Search.getAllSearchByTitle(search).then(books => {
        this.setState({
          search,
          searchSuggestion: (
            <ul>
              {books.map((book, i) => {
                if (
                  '' !== search &&
                  book.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return (
                    <li
                      key={i}
                      onClick={this.onSuggestion}
                      value={book.title}
                      bid={book.bid}
                    >
                      {book.title}
                    </li>
                  );
                } else {
                  return <div key={i} />;
                }
              })}
            </ul>
          )
        });
      });
    }
  };

  onImageUpload = event => {
    let { listerImageNames, listerImages, listerImageCapacity } = this.state;
    let names = listerImageNames;
    let images = listerImages;
    let index = 0;
    if (images.length < listerImageCapacity) {
      names.push(event.target.files[0].name);
      images.push(URL.createObjectURL(event.target.files[0]));
      index = images.length - 1;
    }

    this.setState({
      listerImageNames: names,
      listerImages: images,
      listerImageDisplayIndex: index
    });
  };
  onImageRemove = _ => {
    let {
      listerImageNames,
      listerImages,
      listerImageDisplayIndex
    } = this.state;
    let names = listerImageNames;
    let images = listerImages;
    if (0 < images.length) {
      names.pop();
      images.pop();
      if (0 === images.length) {
        this.setState({
          listerImageNames: names,
          listerImages: images,
          listerImageDisplayIndex: null
        });
      } else if (listerImageDisplayIndex === images.length) {
        this.setState({
          listerImageNames: names,
          listerImages: images,
          listerImageDisplayIndex: listerImageDisplayIndex - 1
        });
      } else {
        this.setState({ listerImageNames: names, listerImages: images });
      }
    }
  };
  onSubmit = event => {
    const {
      uid,
      bookData: { bid },
      userPrice,
      bookCondition,
      listerImageNames,
      listerImages,
      listerImageDisplayIndex
    } = this.state;
    const mid = this.state.selectedMeetingPoint.mid;
    event.preventDefault();
    let pic = null;
    if (listerImageDisplayIndex) {
      let name = listerImageNames[listerImageDisplayIndex];
      let extensionIndex = name.lastIndexOf('.');
      /*
      https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data#Sending_binary_data
      
      var oReq = new XMLHttpRequest();
      oReq.open("POST", url, true);
      oReq.onload = function (oEvent) {
        // Uploaded.
      };

      var blob = new Blob(['abc123'], {type: 'text/plain'});

      oReq.send(blob);
      
      */
      pic = {
        filename: name.substr(0, extensionIndex),
        extension: name.substr(extensionIndex + 1),
        streamData: listerImages[listerImageDisplayIndex]
      };
    }
    Listing.putListCreate(uid, bid, userPrice, bookCondition, pic, mid).then(
      ({ bid, lid }) => {
        window.location = `/book/${bid}/list/${lid}`;
      }
    );
  };

  onShowOrHide = _ => this.setState({ showSideBar: !this.state.showSideBar });

  onSuggestion = event => {
    let bid = event.target.getAttribute('bid');
    Book.getBook(bid).then(bookData => this.setState({ bookData }));
  };

  renderSearch = () => (
    <>
      <form>
        <div className="form-group">
          <div>Type in the book title you want to sell</div>
          <input
            value={this.state.search}
            onChange={this.onChangeSearch}
            name="search"
            autoComplete="off"
          />
          {this.state.searchSuggestion}
        </div>
      </form>
    </>
  );

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
                  <label>Meeting Point:</label>
                  <select
                    className="custom-select"
                    name="selectedMeetingPoint"
                    value={this.state.selectedMeetingPoint.name}
                    onChange={this.onChangeMeetingPoint}
                  >
                    {this.state.meetingPoints.map(({ name }, i) => (
                      <option value={name} key={i}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <br />
                  <br />
                  <GoogleMap
                    lat={this.state.selectedMeetingPoint.lat}
                    lng={this.state.selectedMeetingPoint.lng}
                    zoom={15}
                    title={this.state.selectedMeetingPoint.title}
                    info={this.state.selectedMeetingPoint.info}
                    dimension="33vw"
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
              onClick={this.onSubmit}
            >
              Sell
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
                {this.state.bookData
                  ? this.renderListingForm()
                  : this.renderSearch()}
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
