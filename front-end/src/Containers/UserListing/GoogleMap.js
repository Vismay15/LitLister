import React, { Component } from 'react';

const API_KEY = 'AIzaSyCtVciksJFa09uouNEWwjwfh-x8efW_lko';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderReady: false
    };
  }

  componentWillReceiveProps = newProps => {
    if (this.props.title !== newProps.title) {
      window.initMap(newProps);
      this.props = newProps;
    }
  };

  componentDidMount = () => {
    const initMapScript = document.createElement('script');
    initMapScript.id = 'initMapScript';
    initMapScript.type = 'text/javascript';
    initMapScript.async = true;
    initMapScript.innerHTML = this.getInitMapScriptInnerHTML(this.props);
    document.body.appendChild(initMapScript);
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.body.appendChild(googleMapsScript);
  };

  getInitMapScriptInnerHTML = props =>
    'function initMap() {' +
    'window.initMap = (props = null) => {' +
    'if (props) {' +
    'let position = { lat: props.lat, lng: props.lng};' +
    "let map = new google.maps.Map(document.getElementById('map'), {" +
    'center: position,' +
    'zoom: props.zoom,' +
    'mapMaker: true' +
    '});' +
    'let marker = new google.maps.Marker({' +
    'position,' +
    `title:props.title` +
    '});' +
    'marker.setMap(map);' +
    'let infowindow = new google.maps.InfoWindow({' +
    'content: props.info' +
    '});' +
    'marker.addListener("click", function() {' +
    'infowindow.open(map, marker);' +
    '});' +
    '} else {' +
    `let position = { lat: ${props.lat}, lng: ${props.lng}};` +
    "let map = new google.maps.Map(document.getElementById('map'), {" +
    'center: position,' +
    `zoom: ${props.zoom},` +
    'mapMaker: true' +
    '});' +
    'let marker = new google.maps.Marker({' +
    'position,' +
    `title:"${props.title}"` +
    '});' +
    'marker.setMap(map);' +
    'let infowindow = new google.maps.InfoWindow({' +
    `content: "${props.info}"` +
    '});' +
    'marker.addListener("click", function() {' +
    'infowindow.open(map, marker);' +
    '});' +
    '};' +
    '};' +
    'window.initMap();};';

  render = () => (
    <div
      id="map"
      style={{ height: this.props.dimension, width: this.props.dimension }}
    />
  );
}

export default GoogleMap;
