/* global google */
import React, { Component } from "react";

import "./About.css";

export default class About extends Component {
  componentDidMount() {
    let mapOptions = {
      zoom: 2,
      scrollwheel: false,
      center: new google.maps.LatLng(32.93796, -1.453884)
    };
    let map = new google.maps.Map(this.refs.mapCanvas, mapOptions);

    fetch("/api/location", {
      headers: new Headers({ accept: "application/json" })
    })
      .then(resp => resp.json())
      .then(places => {
        for (let place of places) {
          new google.maps.Marker({
            position: place,
            map: map,
            title: place.name
          });
        }
      });
  }

  render() {
    return (
      <div id="about" className="noPrint">
        <div id="aboutContent">
          <h1 className="sectionHeading">About Me</h1>
          <p>
            I'm currently employed as a Software Engineer at Stripe. I studied
            at the University of Waterloo in Canada. I've been around the world
            for school, work and pleasure.
          </p>
          <p>
            I grew up in Toronto, Ontario where I completed elementary and high
            school. Growing up, I was an avid hockey fan. I particularly enjoy
            playing outdoor games in the winter.
          </p>
          <p>
            I also love to travel. I've been to a few different continents and
            met some really cool people along the way. My travels have brought
            me on trips ranging from African safari to remote villages in
            Vietnam to beach parties in the Philippines. Check out the places
            I've been to on the map.
          </p>
          <div id="map" ref="mapCanvas" />
        </div>
      </div>
    );
  }
}
