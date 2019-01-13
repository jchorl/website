import React, { Component } from "react";

import BrickGame from "../BrickGame";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div id="home" className="noPrint">
        <div id="content">
          <div id="intro">
            Hi! I'm Josh, a software engineer at Stripe. I enjoy hacking on cool
            things, sports, travel and music.
          </div>
          <div id="game">
            <BrickGame />
          </div>
        </div>
      </div>
    );
  }
}
