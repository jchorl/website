import React, { Component } from 'react';

import './Nav.css';

const fullFirstName = "Josh";
const fullLastName = "Chorlton";
const cursor = "_"

export default class Nav extends Component {
    constructor() {
        super();
        this.state = {
            doneFirstName: false,
            firstName: cursor,
            lastName: ""
        }
    }

    type = () => {
        const {
            doneFirstName,
            firstName,
            lastName
        } = this.state;

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
            })
        } else if (lastName.length < fullLastName.length + 1) {
            this.setState({
                lastName: fullLastName.substr(0, lastName.length) + cursor
            });
        } else {
            return;
        }

        setTimeout(this.type, Math.random() * 500);
    }

    componentDidMount() {
        this.type();
    }

    render() {
        const {
            firstName,
            lastName
        } = this.state;

        return (
            <div id="nav">
                <div id="name">
                    <div id="first-name">
                        { firstName }
                    </div>
                    <div id="last-name">
                        { lastName }
                    </div>
                </div>
                <div id="links">
                    <a href="#home">Home</a>
                    <a href="#resume">Resume</a>
                    <a href="#projects">Projects</a>
                    <a href="#about">About</a>
                </div>
            </div>
        );
    }
}
