import React, { Component } from "react";

import "./Nav.css";

const fullFirstName = "Josh";
const fullLastName = "Chorlton";
const cursor = "_";

function smoothStep(start, end, current) {
  if (current >= end) {
    return 1;
  }
  let x = (current - start) / (end - start);
  return x * x * (3 - 2 * x);
}

export default class Nav extends Component {
  constructor() {
    super();
    this.SCROLL_DURATION = 500;

    this.state = {
      doneFirstName: false,
      firstName: cursor,
      lastName: ""
    };
  }

  type = () => {
    const { doneFirstName, firstName, lastName } = this.state;

    if (!doneFirstName && firstName.length < fullFirstName.length + 1) {
      // keep filling first name
      this.setState({
        firstName: fullFirstName.substr(0, firstName.length) + cursor
      });
    } else if (firstName.length === fullFirstName.length + 1) {
      // move the cursor to last name
      this.setState({
        doneFirstName: true,
        firstName: fullFirstName,
        lastName: cursor
      });
    } else if (lastName.length < fullLastName.length + 1) {
      this.setState({
        lastName: fullLastName.substr(0, lastName.length) + cursor
      });
    } else {
      return;
    }

    setTimeout(this.type, Math.random() * 500);
  };

  componentDidMount() {
    this.type();
  }

  smoothScrollTo = id => e => {
    e.preventDefault();
    let duration = this.SCROLL_DURATION;
    let startTime = Date.now();
    let endTime = startTime + duration;
    let startPos = document.body.scrollTop;
    let distance = document.getElementById(id).getBoundingClientRect().top - 80;

    let scrollMore = function() {
      let now = Date.now();
      let nextFraction = smoothStep(startTime, endTime, now);
      let next = startPos + distance * nextFraction;
      window.scrollTo(0, next);
      if (now >= endTime) {
        return;
      }
      setTimeout(scrollMore, 10);
    };

    scrollMore();
  };

  render() {
    const { firstName, lastName } = this.state;

    return (
      <div id="nav" className="noPrint">
        <div id="name">
          <div id="first-name">{firstName}</div>
          <div id="last-name">{lastName}</div>
        </div>
        <div id="links">
          <a href="#home" onClick={this.smoothScrollTo("home")}>
            Home
          </a>
          <a href="#resume" onClick={this.smoothScrollTo("resume")}>
            Resume
          </a>
          <a href="#projects" onClick={this.smoothScrollTo("projects")}>
            Projects
          </a>
          <a href="#about" onClick={this.smoothScrollTo("about")}>
            About
          </a>
        </div>
      </div>
    );
  }
}
