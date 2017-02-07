/* global google */
import React, { Component } from 'react';

import './About.css';

export default class About extends Component {
    componentDidMount() {
        let mapOptions = {
            zoom: 2,
            center: new google.maps.LatLng(32.937960, -1.453884)
        };
        this.map = new google.maps.Map(this.refs.mapCanvas, mapOptions);
    }

    render() {
        return (
            <div id="about" className="noPrint">
                <div id="aboutContent">
                    <h1 className="sectionHeading">
                        About Me
                    </h1>
                    <p>
                    I am currently a student at the University of Waterloo in Canada. I've done a few internships in USA and an exchange semester in Hong Kong.
                    </p>
                    <p>
                    I grew up in Toronto, Ontario where I completed elementary and high school. Growing up, I was an avid hockey fan. I particularly enjoy playing outdoor games in the winter. 
                    </p>
                    <p>
                    I also love to travel. I've been to a few different continents and met some really cool people along the way. My travels have brought me on trips ranging from African safari to remote villages in Vietnam to beach parties in the Philippines.<span className="showMap"> Click show places to see all the places I have traveled.</span>
                    </p>
                    <div id="map" className="showMap" ref="mapCanvas"></div>
                </div>
            </div>
        );
    }
}

