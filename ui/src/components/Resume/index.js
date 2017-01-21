import React, { Component, PropTypes } from 'react';
import { Map, Set } from 'immutable';
import classNames from 'classnames';

import './Resume.css';

export default class Resume extends Component {
    constructor(props) {
        super(props);

        let tags = Map({
                go: false,
                py: false,
                sql: false,
                java: false,
                js: false,
                html: false,
                css: false,
                less: false,
                react: false,
                redux: false,
                tor: false,
                fl: false,
                ng: false,
                bs: false,
                docker: false,
                git: false,
                lin: false,
                aws: false,
                vi: false,
                appe: false,
                mac: false,
                ij: false,
                ecl: false
            });
        let jobs = Map({
                snap: Map({
                    active: false,
                    associated: Set([])
                }),
                dockerj: Map({
                    active: false,
                    associated: Set(['go'])
                }),
                uber: Map({
                    active: false,
                    associated: Set([])
                }),
                symph: Map({
                    active: false,
                    associated: Set([])
                }),
                fjc: Map({
                    active: false,
                    associated: Set([])
                }),
                framed: Map({
                    active: false,
                    associated: Set([])
                }),
                com: Map({
                    active: false,
                    associated: Set([])
                })
        });

        this.state = {
            tags,
            jobs
        }
    };

    tagStateChange = (name, activating) => () => {
        const {
            tags,
            jobs
        } = this.state;

        let updatedJobs = jobs.map((m, name) => {
            if (m.get('associated').contains(name)) {
                return m.set('active', activating);
            }
            return m;
        });

        this.setState({
            tags: tags.set(name, activating),
            jobs: updatedJobs
        });
    }

    jobsStateChange = (name, activating) => () => {
        const {
            tags,
            jobs
        } = this.state;

        let associated = jobs.getIn([name, 'associated']);
        let updatedTags = tags.withMutations(m => {
            associated.forEach(association => m.set(association, activating));
        });

        this.setState({
            tags: updatedTags,
            jobs: jobs.setIn([name, 'active'], activating)
        });
    }

    render() {
        const {
            tags
        } = this.state;

        const langs = [
            <Tag key="go" code="go" active={ tags.get('go') } tagStateChange={ this.tagStateChange } text="Go" />,
            <Tag key="py" code="py" active={ tags.get('py') } tagStateChange={ this.tagStateChange } text="Python" />,
            <Tag key="sql" code="sql" active={ tags.get('sql') } tagStateChange={ this.tagStateChange } text="SQL" />,
            <Tag key="java" code="java" active={ tags.get('java') } tagStateChange={ this.tagStateChange } text="Java" />,
            <Tag key="js" code="js" active={ tags.get('js') } tagStateChange={ this.tagStateChange } text="Javascript" />,
            <Tag key="html" code="html" active={ tags.get('html') } tagStateChange={ this.tagStateChange } text="HTML5" />,
            <Tag key="css" code="css" active={ tags.get('css') } tagStateChange={ this.tagStateChange } text="CSS3" />,
            <Tag key="less" code="less" active={ tags.get('less') } tagStateChange={ this.tagStateChange } text="Less" />
        ]

        const frameworks = [
            <Tag key="react" code="react" active={ tags.get('react') } tagStateChange={ this.tagStateChange } text="ReactJS" />,
            <Tag key="redux" code="redux" active={ tags.get('redux') } tagStateChange={ this.tagStateChange } text="Redux" />,
            <Tag key="tor" code="tor" active={ tags.get('tor') } tagStateChange={ this.tagStateChange } text="Tornado" />,
            <Tag key="fl" code="fl" active={ tags.get('fl') } tagStateChange={ this.tagStateChange } text="Flask" />,
            <Tag key="ng" code="ng" active={ tags.get('ng') } tagStateChange={ this.tagStateChange } text="AngularJS" />,
            <Tag key="bs" code="bs" active={ tags.get('bs') } tagStateChange={ this.tagStateChange } text="Bootstrap" />
        ]

        const tools = [
            <Tag key="docker" code="docker" active={ tags.get('docker') } tagStateChange={ this.tagStateChange } text="Docker" />,
            <Tag key="git" code="git" active={ tags.get('git') } tagStateChange={ this.tagStateChange } text="Git" />,
            <Tag key="lin" code="lin" active={ tags.get('lin') } tagStateChange={ this.tagStateChange } text="Linux" />,
            <Tag key="aws" code="aws" active={ tags.get('aws') } tagStateChange={ this.tagStateChange } text="AWS" />,
            <Tag key="vi" code="vi" active={ tags.get('vi') } tagStateChange={ this.tagStateChange } text="Vim" />,
            <Tag key="appe" code="appe" active={ tags.get('appe') } tagStateChange={ this.tagStateChange } text="App Engine" />,
            <Tag key="mac" code="mac" active={ tags.get('mac') } tagStateChange={ this.tagStateChange } text="Mac" />,
            <Tag key="ij" code="ij" active={ tags.get('ij') } tagStateChange={ this.tagStateChange } text="IntelliJ" />,
            <Tag key="ecl" code="ecl" active={ tags.get('ecl') } tagStateChange={ this.tagStateChange } text="Eclipse" />
        ]

        return (
            <div id="resume">
                <h1 className="sectionHeading noPrint">
                    Resume
                </h1>
                <a id="pdfButton" href="/joshchorltonresume.pdf" target="_blank">View PDF</a>
                <div id="page">
                    <a id="printButton" className="noPrint" href="/joshchorltonresume.pdf" target="_blank"><i className="fa fa-print"></i> Print</a>
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
                        <div id="skillsBar">
                            <div className="bracket">[</div>
                            <div className="skillsContainerHolder">
                                <div className="skillsContainer">
                                    <h4 className="skillsBarSection">Languages:</h4>
                                    { langs }
                                </div>
                                <div className="skillsContainer">
                                    <h4 className="skillsBarSection">Frameworks:</h4>
                                    { frameworks }
                                </div>
                                <div className="skillsContainer">
                                    <h4 className="skillsBarSection">Tools:</h4>
                                    { tools }
                                </div>
                            </div>
                            <div className="bracket">]</div>
                        </div>
                        <div className="section">
                            <h2 className="sectionTitle"><i className="fa fa-briefcase"></i> Work Experience</h2>
                            <div className="subsection">
                                <div className="company" data-skills="">
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
                                <div className="company" data-skills="go sql js html css react redux docker git lin aws vi ng">
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
                                <div className="company" data-skills="fl tor py sql git lin aws vi mac docker">
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
                                <div className="company" data-skills="js sql git vi css html java lin ij aws ang bs mac less">
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
                                    <li className="noPrint" data-skills="html css js bs git vi lin mac go appe py"><a className="projectTitle" target="_blank" href="https://github.com/matthewdu/powerplug">craig-o-mation</a> - CalHacks<span className="date">2015</span>
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

class Tag extends Component {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        code: PropTypes.string.isRequired,
        tagStateChange: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired
    }

    render() {
        const {
            active,
            code,
            tagStateChange,
            text
        } = this.props;

        return (
            <div className={ classNames("skill", { active }) } onMouseEnter={ tagStateChange(code, true) } onMouseLeave={ tagStateChange(code, false) }>{ text }</div>
        );
    }
}
