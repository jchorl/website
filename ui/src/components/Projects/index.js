import React, { Component, PropTypes } from 'react';

import './Projects.css';

export default class Projects extends Component {
    constructor() {
        super();

        const projectInfo = [{
            title: "FinanceJC",
            description: "FinanceJC is a webapp that I built to keep track of my personal finances. It has support for users using Google as an OAuth provider, recurring transactions and also transaction templates. The front-end is build on React and Redux, while the back-end is a Postgres and Elasticsearch backed Go server behind NGINX.",
            codeLink: "https://github.com/jchorl/financejc"
        },
        {
            title: "Framed",
            description: "Framed allows a user to generate an embeddable picture frame with rotating pictures from a Google Photos album. The front-end is a light React app and the back-end is Python on AppEngine.",
            codeLink: "https://github.com/jchorl/framed"
        },
        {
            title: "Personal Website",
            description: "This is my personal website! The front-end is built with pre-rendered React, with a light Go back-end running on AppEngine.",
            codeLink: "https://github.com/jchorl/website"
        },
        {
            title: "Craig-o-mation",
            description: "Craig-o-mation is a webapp that automates Craigslist purchases using the Postmates API for delivery and the Capitol One API for payments. The back-end is written in Go and hosted on AppEngine. There is also a self-hosted python server to scrape Craigslist since they block AppEngine and EC2. The front-end is built with jQuery and makes use of Google Maps API.",
            codeLink: "https://github.com/matthewdu/powerplug"
        },
        {
            title: "JaysBot",
            description: "This is a job written in Go that hits mlb.com API for updates on the Toronto Blue Jays and sends the updates to various locations. Currently the updates are POSTed to a Slack or HipChat room so I can easily get Jays updates at work.",
            codeLink: "https://github.com/jchorl/jaysbot"
        },
        {
            title: "Project Euler",
            description: "Project Euler is a website that contains many interesting math problems that can be solved computationally. Being in both the engineering and math faculties, I enjoy these challenges. I have solved a bunch of them.",
            codeLink: "https://github.com/jchorl/euler"
        }];

        this.projects = projectInfo.map(info => <Project key={ info.title } title={ info.title } description={ info.description } codeLink={ info.codeLink } />);
    }

    render() {
        return (
            <div id="projects" className="noPrint">
                <div id="projectsContent">
                    <h1 className="sectionHeading">
                        Projects
                    </h1>
                    <div>Click on the projects below to view the code on Github. All projects and more available at <a href="https://github.com/jchorl" target="_blank">github.com/jchorl</a>.</div>
                    <div id="projectsContainer">
                        { this.projects }
                    </div>
                </div>
            </div>
        );
    }
}

class Project extends Component {
    static propTypes = {
        codeLink: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }

    render() {
        const {
            codeLink,
            description,
            title
        } = this.props;

        return (
            <div className="project">
                <a target="_blank" href={ codeLink }>
                <h2>{ title }</h2>
                <i className="fa fa-github icon"></i>
                <div className="description">{ description }</div>
                </a>
            </div>
        );
    }
}
