import React, { Component } from "react";

import Nav from "../Nav";
import Home from "../Home";
import Resume from "../Resume";
import Projects from "../Projects";
import About from "../About";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Home />
        <Resume />
        <Projects />
        <About />
      </div>
    );
  }
}
