/* global google */
import React, { Component } from 'react';

import './About.css';

export default class About extends Component {
    componentDidMount() {
        let mapOptions = {
            zoom: 2,
            scrollwheel: false,
            center: new google.maps.LatLng(32.937960, -1.453884)
        };
        let map = new google.maps.Map(this.refs.mapCanvas, mapOptions);

        fetch('/api/location', { headers: new Headers({ accept: 'application/json' }) })
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

        setInterval(() => {
            document.getElementById('framed').src = 'https://framed.joshchorlton.com/api/photo/93b34e?' + new Date().getTime()
        }, 10000);
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
                            I also love to travel. I've been to a few different continents and met some really cool people along the way. My travels have brought me on trips ranging from African safari to remote villages in Vietnam to beach parties in the Philippines. Check out the places I've been to on the map.
                        </p>
                        <div id="map" ref="mapCanvas"></div>
                        <p>
                            Here are some of my favourite photos from these trips:
                        </p>
                        <img id="framed" src="https://framed.joshchorlton.com/api/photo/93b34e" alt="Travel" />
                    </div>
                </div>
                );
    }
}

