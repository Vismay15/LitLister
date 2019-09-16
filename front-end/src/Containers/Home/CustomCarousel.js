import React, { Component } from 'react';
import { Book } from '../../api';

class CustomCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: 100,
      intervalId: null,
      data: [],
      animationData: [],
      animationEnter: [false, false, false, false],
      animationLeave: [false, false, false, false],
      showSideBar: false
    };
  }

  componentDidMount = () => {
    Book.getLatestReleases().then(books => {
      const data = books.map(book => ({ pic: book.pictureurl, bid: book.bid }));
      let framePerSecond = 30;
      let animationData = this.initializeAnimationData(
        data,
        framePerSecond * 5
      );
      let intervalId = setInterval(this.animate, 1000 / framePerSecond);
      this.setState({ data, intervalId, animationData });
    });
  };

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  initializeAnimationData = (json, framePerSecond) => {
    let animationData = {};
    animationData.covers = json.map(e => e.pic);
    animationData.bids = json.map(e => e.bid);
    animationData.picHeights = [400, 400, 400, 400, 400, 400, 400];
    animationData.paddingRightResets = [2050, 1650, 1250, 850, 450, 50, -350];
    animationData.paddingRights = animationData.paddingRightResets;
    animationData.paddingRightDelta = [0, 0, 0, 0, 0, 0, 0];
    animationData.paddingRightAnimationDelta = 4;
    animationData.picHeightAnimationDelta = 20;
    animationData.shiftFrame = framePerSecond;
    animationData.shiftSpeed = 400 / animationData.shiftFrame;
    animationData.shiftFrameIndex = 0;
    animationData.coverStartingIndex = 0;
    animationData.coverMaxIndex = 9;
    animationData.picIndices = [0, 1, 2, 3, 4, 5, 6].map(val => {
      let index = val + animationData.coverStartingIndex;
      if (index > animationData.coverMaxIndex) {
        index -= animationData.coverMaxIndex + 1;
      }
      return index;
    });
    animationData.pics = [0, 1, 2, 3, 4, 5, 6].map(i => (
      <div
        key={i}
        style={{
          float: 'right',
          paddingTop: `${(550 - animationData.picHeights[i]) / 2}px`,
          paddingBottom: `${(550 - animationData.picHeights[i]) / 2}px`,
          right: `${animationData.paddingRights[i] -
            animationData.paddingRightDelta[i]}px`,
          position: 'absolute'
        }}
      >
        <img
          carouselindex={i}
          bid={animationData.bids[animationData.picIndices[i]]}
          src={animationData.covers[animationData.picIndices[i]]}
          alt="cover"
          style={{
            height: `${animationData.picHeights[i]}px`
          }}
          onClick={this.onClick}
          onMouseEnter={this.onEnter}
          onMouseLeave={this.onLeave}
        />
      </div>
    ));
    return animationData;
  };

  animate = () => {
    let animationData = this.state.animationData;
    let animationEnter = this.state.animationEnter;
    let animationLeave = this.state.animationLeave;

    let canShift = 0 === animationEnter.filter(e => e).length;
    if (canShift) {
      animationData.shiftFrameIndex += 1;
      if (animationData.shiftFrameIndex === animationData.shiftFrame) {
        animationData.shiftFrameIndex = 0;
        animationData.paddingRights = animationData.paddingRightResets;
        if (animationData.coverStartingIndex === animationData.coverMaxIndex) {
          animationData.coverStartingIndex = 0;
        } else {
          animationData.coverStartingIndex += 1;
        }
        animationData.picIndices = [0, 1, 2, 3, 4, 5, 6].map(val => {
          let index = val + animationData.coverStartingIndex;
          if (index > animationData.coverMaxIndex) {
            index -= animationData.coverMaxIndex + 1;
          }
          return index;
        });
      } else {
        animationData.paddingRights = animationData.paddingRights.map(
          padding => padding + animationData.shiftSpeed
        );
      }
    }
    [0, 1, 2, 3, 4, 5, 6].forEach(i => {
      if (animationEnter[i] && 500 > animationData.picHeights[i]) {
        animationData.picHeights[i] += animationData.picHeightAnimationDelta;
        animationData.paddingRightDelta[i] +=
          animationData.paddingRightAnimationDelta;
      }
      if (animationLeave[i] && 400 < animationData.picHeights[i]) {
        animationData.picHeights[i] -= animationData.picHeightAnimationDelta;
        animationData.paddingRightDelta[i] -=
          animationData.paddingRightAnimationDelta;
      }
      animationData.pics[i] = (
        <div
          key={i}
          style={{
            float: 'right',
            paddingTop: `${(550 - animationData.picHeights[i]) / 2}px`,
            paddingBottom: `${(550 - animationData.picHeights[i]) / 2}px`,
            right: `${animationData.paddingRights[i] -
              animationData.paddingRightDelta[i]}px`,
            position: 'absolute'
          }}
        >
          <img
            carouselindex={i}
            bid={animationData.bids[i]}
            src={animationData.covers[animationData.picIndices[i]]}
            alt="cover"
            style={{
              height: `${animationData.picHeights[i]}px`
            }}
            onClick={this.onClick}
            onMouseEnter={this.onEnter}
            onMouseLeave={this.onLeave}
          />
        </div>
      );
    });
    this.setState({ animationData });
  };

  onClick = event => {
    window.location = `book/${event.target.getAttribute('bid')}`;
  };

  onEnter = event => {
    let animationEnter = this.state.animationEnter;
    let animationLeave = this.state.animationLeave;
    let i = parseInt(event.target.getAttribute('carouselindex'));
    animationEnter[i] = true;
    animationLeave[i] = false;
    this.setState({ animationEnter, animationLeave });
  };

  onLeave = event => {
    let animationEnter = this.state.animationEnter;
    let animationLeave = this.state.animationLeave;
    let i = parseInt(event.target.getAttribute('carouselindex'));
    animationEnter[i] = false;
    animationLeave[i] = true;
    this.setState({ animationEnter, animationLeave });
  };

  render() {
    return (
      <div style={{ height: '550px', width: '100%', overflow: 'hidden' }}>
        <div style={{ position: 'relative' }}>
          {this.state.animationData.pics}
        </div>
      </div>
    );
  }
}

export default CustomCarousel;
