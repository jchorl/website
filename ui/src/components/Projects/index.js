import React, { Component, PropTypes } from "react";
import classNames from "classnames";

import "./Projects.css";

export default class Projects extends Component {
  constructor() {
    super();

    const projectInfo = [
      {
        title: "BankHooks",
        code: "bankhooks",
        description:
          "BankHooks allows a user to define flexible queries over bank accounts and transactions. They link their bank account and when any of the query conditions are met, a webhook is fired. It has eliminated the need for me to monitor my bank accounts.",
        codeLink: "https://bankhooks.com"
      },
      {
        title: "NasBlaze",
        code: "nasblaze",
        description:
          "NasBlaze runs on a Rasberry Pi connected to a RAID system. It uses rclone to periodically mount the RAID drives, rsync them up to Backblaze B2, and then unmount the storage. I use it to back up all my files.",
        codeLink: "https://github.com/jchorl/nasblaze"
      },
      {
        title: "DNSServ",
        code: "dnsserv",
        description:
          "DNSServ is a dynamic DNS server. It runs on GCP, with a client library that I run on a Raspberry Pi. It allows me to access my RAID system from anywhere.",
        codeLink: "https://github.com/jchorl/dnsserv"
      },
      {
        title: "Watchdog",
        code: "watchdog",
        description:
          "Watchdog notifies me when any of my services go down (think Pagerduty). There is a CLI and client libraries so it can be easily integrated into any service. Services register their check-in cadence and if they fail to check-in, I get emails.",
        codeLink: "https://github.com/jchorl/watchdog"
      },
      {
        title: "Waker",
        code: "waker",
        description:
          "Waker is an alarm clock that runs on a Raspberry Pi. It allows a user to select a Spotify playlist/song to wake them up. It will then read out the weather and upcoming calendar events for the day. The main server is written in Flask, with an accompanying React-Native app to set alarms.",
        codeLink: "https://github.com/jchorl/waker"
      },
      {
        title: "Framed",
        code: "framed",
        description:
          "Framed allows a user to generate an embeddable picture frame with rotating pictures from a Google Photos album. The front-end is a light React app and the back-end is Python on AppEngine.",
        codeLink: "https://github.com/jchorl/framed"
      },
      {
        title: "Boys-In-Blue",
        code: "boysinblue",
        description:
          "Boys-In-Blue is a Facebook Messenger bot. It uses the Reddit API to grab links for Leafs games and sends them 3 minutes before gametime.",
        codeLink: "https://github.com/jchorl/boysinblue"
      },
      {
        title: "Craig-o-mation",
        description:
          "Craig-o-mation is a webapp that automates Craigslist purchases using the Postmates API for delivery and the Capitol One API for payments. The back-end is written in Go and hosted on AppEngine. There is also a self-hosted python server to scrape Craigslist since they block AppEngine and EC2. The front-end is built with jQuery and makes use of Google Maps API.",
        code: "craigslist",
        codeLink: "https://github.com/matthewdu/powerplug"
      }
    ];

    this.projects = projectInfo.map(info => (
      <Project
        key={info.title}
        code={info.code}
        title={info.title}
        description={info.description}
        codeLink={info.codeLink}
      />
    ));
  }

  render() {
    return (
      <div id="projects" className="noPrint">
        <div id="projectsContent">
          <h1 className="sectionHeading">Projects</h1>
          <div>
            Click on the projects below to view the code on Github. All projects
            and more available at{" "}
            <a
              href="https://github.com/jchorl"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/jchorl
            </a>
            .
          </div>
          <div id="projectsContainer">{this.projects}</div>
        </div>
      </div>
    );
  }
}

class Project extends Component {
  static propTypes = {
    code: PropTypes.string,
    codeLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    const { code, codeLink, description, title } = this.props;

    return (
      <div className={classNames("project", code)}>
        <a target="_blank" rel="noopener noreferrer" href={codeLink}>
          <h2>{title}</h2>
          <i className="fa fa-github icon" />
          <div className="description">{description}</div>
        </a>
      </div>
    );
  }
}
