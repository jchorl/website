import React, { Component } from 'react';

import './Resume.css';

const langs = [
    <div class="skill" label skills="go">Go</div>,
    <div class="skill" label skills="py">Python</div>,
    <div class="skill" label skills="sql">SQL</div>,
    <div class="skill" label skills="java">Java</div>,
    <div class="skill" label skills="js">Javascript</div>,
    <div class="skill" label skills="html">HTML5</div>,
    <div class="skill" label skills="css">CSS3</div>,
    <div class="skill" label skills="less">Less</div>
]

const frameworks = [
    <div class="skill" label skills="react">ReactJS</div>,
    <div class="skill" label skills="redux">Redux</div>,
    <div class="skill" label skills="tor">Tornado</div>,
    <div class="skill" label skills="fl">Flask</div>,
    <div class="skill" label skills="ng">AngularJS</div>,
    <div class="skill" label skills="bs">Bootstrap</div>
]

const tools = [
    <div class="skill" label skills="docker">Docker</div>,
    <div class="skill" label skills="git">Git</div>,
    <div class="skill" label skills="lin">Linux</div>,
    <div class="skill" label skills="aws">AWS</div>,
    <div class="skill" label skills="vi">Vim</div>,
    <div class="skill" label skills="appe">App Engine</div>,
    <div class="skill" label skills="mac">Mac</div>,
    <div class="skill" label skills="ij">IntelliJ</div>,
    <div class="skill" label skills="ecl">Eclipse</div>
]

export default class Resume extends Component {
    render() {
        return (
            <div id="resume">
                <h1 className="sectionHeading noPrint">
                    Resume
                </h1>
                <a id="pdfButton" href="/resume.pdf" target="_blank">View PDF</a>
                <div id="page">
                    <div className="content">
                        <div id="personalInfo">
                            <div className="nameSchool">
                                <h2 className="name">Josh Chorlton</h2>
                                <div className="school">4A | Software Engineering | University of Waterloo</div>
                            </div>
                            <div className="contactInfo">
                                <div>
                                    <i className="fa fa-globe contactIcon"></i>
                                    <a className="link" href="http://joshchorlton.com">joshchorlton.com</a>
                                </div>
                                <div>
                                    <i className="fa fa-envelope contactIcon"></i>
                                    <a className="link" href="mailto:josh@joshchorlton.com">josh@joshchorlton.com</a>
                                </div>
                                <div>
                                    <i className="fa fa-mobile-phone contactIcon"></i>
                                    (415) 371-9709
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <h2 className="sectionTitle"><i className="fa fa-briefcase"></i> Work Experience</h2>
                            <div className="subsection">
                                <div className="company" usage skills="">
                                    <div className="coFirstRow">
                                        <a href="https://www.snap.com" target="_blank" className="companyLink">
                                            <span className="companyImgWrapper"><img src="logo_snapchat.png" className="companyImg" alt="snapchat logo"></img></span>
                                            <span className="companyName">Snap</span>
                                        </a>
                                        <span className="date">January 2017 &mdash; Present</span>
                                    </div>
                                    <div className="clear"></div>
                                    <div className="tiSecondRow">
                                        <span className="title">Software Engineer</span>
                                        <span className="place">Los Angeles, California</span>
                                    </div>
                                    <div className="clear"></div>
                                    <ul className="empList">
                                        <li>Implementing caching to improve performance when loading stories</li>
                                    </ul>
                                </div>
                                <div className="company" usage skills="go sql js html css react redux docker git lin aws vi ng">
                                    <div className="coFirstRow">
                                        <a href="https://www.docker.com" target="_blank" className="companyLink">
                                            <span className="companyImgWrapper"><img src="logo_docker.png" className="companyImg" alt="docker logo"></img></span>
                                            <span className="companyName">Docker</span>
                                        </a>
                                        <span className="date">May 2016 &mdash; August 2016</span>
                                    </div>
                                    <div className="clear"></div>
                                    <div className="tiSecondRow">
                                        <span className="title">Software Engineer</span>
                                        <span className="place">San Francisco, California</span>
                                    </div>
                                    <div className="clear"></div>
                                    <ul className="empList">
                                        <li>Instituted policies ensuring only signed images can be used in Docker Datacenter, yielding end-to-end security</li>
                                        <li>Revamped garbage collection in Docker Trusted Registry, allowing Docker to scale to its biggest customers</li>
                                        <li>Developed activity streams to maintain a searchable, comprehensive history of events</li>
                                    </ul>
                                </div>
                                <div className="company" usage skills="fl tor py sql git lin aws vi mac docker">
                                    <div className="coFirstRow">
                                        <a href="https://www.uber.com" target="_blank" className="companyLink">
                                            <span className="companyImgWrapper"><img src="logo_uber.png" className="companyImg" alt="uber logo"></img></span>
                                            <span className="companyName">Uber</span>
                                        </a>
                                        <span className="date">August 2015 &mdash; December 2015</span>
                                    </div>
                                    <div className="clear"></div>
                                    <div className="tiSecondRow">
                                        <span className="title">Software Engineering Intern</span>
                                        <span className="place">San Francisco, California</span>
                                    </div>
                                    <div className="clear"></div>
                                    <ul className="empList">
                                        <li>Migrated everything related to promotions to a microservice, including API endpoints and database access</li>
                                        <li>Wrote promotion redemption flow executed by all rides to find the most suitable promotion to apply</li>
                                        <li>Implemented ETL monitoring to measure and alert based on data transfer speeds and consistency</li>
                                        <li>Wrote a job to periodically delete millions of unneeded database rows to deal with scaling issues</li>
                                        <li>Dealt with insane scaling issues every day using tactics like caching, indexes, code optimizations, etc.</li>
                                    </ul>
                                </div>
                                <div className="company" usage skills="js sql git vi css html java lin ij aws ang bs mac less">
                                    <div className="coFirstRow">
                                        <a href="http://www.symphonycommerce.com" target="_blank" className="companyLink">
                                            <span className="companyImgWrapper"><img src="logo_symphony.png" className="companyImg" alt="symphony logo"></img></span>
                                            <span className="companyName">Symphony Commerce</span>
                                        </a>
                                        <span className="date">January 2015 &mdash; July 2015</span>
                                    </div>
                                    <div className="clear"></div>
                                    <div className="tiSecondRow">
                                        <span className="title">Full Stack Software Engineer</span>
                                        <span className="place">San Francisco, California</span>
                                    </div>
                                    <div className="clear"></div>
                                    <ul className="empList">
                                        <li>Overhauled customer management pages, drastically improving customer support efficiency</li>
                                        <li>Introduced tiered wholesale accounts, enabling storeowners to set tiered limits on wholesalers such as minimum purchase requirements</li>
                                        <li>Refactored store checkout and product pages, reducing network traffic and seeing speed gains of >24%</li>
                                        <li>Identified and fixed a security vulnerability where data was being sent to external services unknowingly</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <h2 className="sectionTitle"><i className="fa fa-code"></i> Projects</h2>
                            <div className="subsection">
                                <div className="projectsAvailable">More projects at <a href="https://joshchorlton.com" target="_blank">joshchorlton.com</a>, all code available at <a href="https://github.com/jchorl" target="_blank">github.com/jchorl</a>.</div>
                                <ul className="projectsList">
                                    <li><a className="projectTitle" href="https://github.com/jchorl/financejc" target="_blank">FinanceJC</a> - <a href="https://finance.joshchorlton.com" target="_blank">finance.joshchorlton.com</a><span className="date">2016-2017</span>
                                        <ul>
                                            <li>Keep track of finances with support for templates and recurring transactions</li>
                                            <li>Hosted on EC2 with Go server, Postgres database, nginx and elasticsearch</li>
                                        </ul>
                                    </li>
                                    <li><a className="projectTitle" href="https://github.com/jchorl/framed" target="_blank">Framed</a> - <a href="https://framed.joshchorlton.com" target="_blank">framed.joshchorlton.com</a><span className="date">2016</span>
                                        <ul>
                                            <li>Easily embed a picture frame on a website with photos from a Google Photos album</li>
                                        </ul>
                                    </li>
                                    <li className="noPrint" usage skills="html css js bs git vi lin mac go appe py"><a className="projectTitle" target="_blank" href="https://github.com/matthewdu/powerplug">craig-o-mation</a> - CalHacks<span className="date">2015</span>
                                        <ul>
                                            <li>Purchase from Craigslist using Postmates for delivery and Capital One for payment</li>
                                            <li>Hosted on App Engine with self-hosted Python proxy server to scrape Craigslist</li>
                                            <li>Winner of <i>Best Use of Capital One API</i></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="section noPrint">
                            <h2 className="sectionTitle"><i className="fa fa-rocket"></i> Activities and Interests</h2>
                            <div className="subsection">
                                <ul>
                                    <li>Leafs fan since birth</li>
                                    <li>Music - Play guitar and am always listening. See <a href="https://joshchorlton.com#about" target="_blank">joshchorlton.com#about</a>.</li>
                                    <li>Travel - Been to 25 countries so far. See <a href="https://joshchorlton.com#about" target="_blank">joshchorlton.com#about</a>.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
