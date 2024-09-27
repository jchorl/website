import React, { Component } from "react";

import BrickGame from "../BrickGame";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div id="home" className="noPrint">
        <div id="content">
          <div id="intro">
            Hi! I'm Josh. I enjoy hacking on cool things, sports, travel and music. These days I spend most of my time helping labs scale DNA sequencing at <a href="https://bugseq.com" target="_blank" rel="noopener noreferrer">BugSeq</a>. Previously I helped build financial infrastructure at Stripe.
          </div>
          <div id="game">
            <BrickGame />
          </div>
        </div>
      </div>
    );
  }
}
