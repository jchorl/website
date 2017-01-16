import React, { Component } from 'react';

import './Resume.css';

export default class Resume extends Component {
    render() {
        return (
            <div id="resume">
                <h1 className="sectionHeading">
                    Resume
                </h1>
                <div id="pdfButtonWrapper">
                    <a id="pdfButton" href="/resume.pdf" target="_blank">View PDF</a>
                </div>
            </div>
        );
    }
}
