import React, { Component } from 'react';

import './Projects.css';

export default class Projects extends Component {
    render() {
        return (
            <div id="projects" className="noPrint">
                <div id="projectsContent">
                    <h1 className="sectionHeading">
                        Projects
                    </h1>
                    <div>Click on the projects below to view the code on Github. All projects and more available at <a href="https://github.com/jchorl" target="_blank">github.com/jchorl</a>.</div>
                </div>
            </div>
        );
    }
}

