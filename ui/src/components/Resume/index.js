import React, { Component, PropTypes } from 'react';
import { Map, List } from 'immutable';
import classNames from 'classnames';

import './Resume.css';

export default class Resume extends Component {
    constructor(props) {
        super(props);

        // each tag/job should have its own key on the root state. if the state mutates too quickly multiple times, sometimes the old
        // state will get read and clobber some udpates in progress. keeping each tag/job as a key on the root state allows only
        // updating that key.
        let state = {
            snap: Map({
                active: false,
                associated: List(['java', 'guava', 'git', 'mac', 'aws', 'appe', 'sql', 'vi', 'ij'])
            }),
            dockerj: Map({
                active: false,
                associated: List(['go', 'sql', 'js', 'html', 'css', 'react', 'redux', 'docker', 'git', 'lin', 'aws', 'vi', 'ng'])
            }),
            uber: Map({
                active: false,
                associated: List(['fl', 'tor', 'py', 'sql', 'git', 'lin', 'aws', 'vi', 'mac'])
            }),
            symph: Map({
                active: false,
                associated: List(['js', 'sql', 'git', 'vi', 'css', 'html', 'java', 'lin', 'ij', 'aws', 'ng', 'mac'])
            }),
            fjc: Map({
                active: false,
                associated: List(['go', 'sql', 'git', 'vi', 'css', 'html', 'js', 'react', 'redux', 'lin', 'aws', 'docker'])
            }),
            framed: Map({
                active: false,
                associated: List(['py', 'git', 'vi', 'css', 'html', 'js', 'react', 'appe', 'docker'])
            }),
            com: Map({
                active: false,
                associated: List(['html', 'css', 'js', 'git', 'vi', 'lin', 'mac', 'go', 'appe', 'py'])
            })
        };

        // generate the skills and associations
        let jobKeys = Object.keys(state);
        for (let job of jobKeys) {
            for (let skill of state[job].get('associated').toArray()) {
                if (!state[skill]) {
                    state[skill] = Map({
                        active: false,
                        associated: List()
                    });
                }
                state[skill] = state[skill].update('associated', associated => associated.push(job));
            }
        }

        this.state = state;
    }

    activeStateChange = (name, activating) => {
        let newState = {};
        newState[name] = this.state[name].set('active', activating);
        this.state[name].get('associated').forEach(k => newState[k] = this.state[k].set('active', activating));

        let updateState = () => {
            this.setState(newState);
        };
        return updateState.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        for (let k of Object.keys(nextState)) {
            if (this.state[k].get('active') !== nextState[k].get('active')) {
                return true;
            }
        }
        return false;
    }

    render() {
        const langs = [
            <Tag key="go" code="go" active={ this.state.go.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Go" />,
            <Tag key="java" code="java" active={ this.state.java.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Java" />,
            <Tag key="js" code="js" active={ this.state.js.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Javascript" />,
            <Tag key="html" code="html" active={ this.state.html.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="HTML5" />,
            <Tag key="css" code="css" active={ this.state.css.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="CSS3" />,
            <Tag key="py" code="py" active={ this.state.py.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Python" />,
            <Tag key="sql" code="sql" active={ this.state.sql.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="SQL" />
        ]

        const frameworks = [
            <Tag key="react" code="react" active={ this.state.react.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="ReactJS" />,
            <Tag key="redux" code="redux" active={ this.state.redux.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Redux" />,
            <Tag key="guava" code="guava" active={ this.state.guava.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Guava" />,
            <Tag key="tor" code="tor" active={ this.state.tor.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Tornado" />,
            <Tag key="fl" code="fl" active={ this.state.fl.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Flask" />,
            <Tag key="ng" code="ng" active={ this.state.ng.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="AngularJS" />
        ]

        const tools = [
            <Tag key="docker" code="docker" active={ this.state.docker.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Docker" />,
            <Tag key="git" code="git" active={ this.state.git.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Git" />,
            <Tag key="lin" code="lin" active={ this.state.lin.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Linux" />,
            <Tag key="aws" code="aws" active={ this.state.aws.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="AWS" />,
            <Tag key="vi" code="vi" active={ this.state.vi.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Vim" />,
            <Tag key="appe" code="appe" active={ this.state.appe.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="App Engine" />,
            <Tag key="mac" code="mac" active={ this.state.mac.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="Mac" />,
            <Tag key="ij" code="ij" active={ this.state.ij.get('active') } activeStateChange={ this.activeStateChange.bind(this) } text="IntelliJ" />,
        ]

        return (
            <div id="resume">
                <h1 className="sectionHeading noPrint">
                    Resume
                </h1>
                <a id="pdfButton" href="/joshchorltonresume.pdf" target="_blank">View PDF</a>
                <div id="resumeSidebarContainer">
                    <div id="sidebarContainerContainer">
                        <div id="sidebarContainer">
                            <div id="sidebar">
                                <h2 id="skillsLabel">Skills</h2>
                                <h3 className="skillSectionLabel">Languages</h3>
                                <div className="skillSection">
                                    { langs }
                                </div>
                                <h3 className="skillSectionLabel">Frameworks</h3>
                                <div className="skillSection">
                                    { frameworks }
                                </div>
                                <h3 className="skillSectionLabel">Tools</h3>
                                <div className="skillSection">
                                    { tools }
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <Job active={ this.state.snap.get('active') } bullets={[
                                        'Implementing caching to improve performance when loading stories'
                                    ]} code="snap" companyUrl="https://snap.com" date="January 2017 &mdash; Present" activeStateChange={ this.activeStateChange.bind(this) }
                                    logoUrl="logo_snapchat.png" name="Snapchat" place="Venice, California" position="Software Engineering Intern" />
                                    <Job active={ this.state.dockerj.get('active') } bullets={[
                                        'Instituted policies ensuring only signed images can be used in Docker Datacenter, yielding end-to-end security',
                                        'Revamped garbage collection in Docker Trusted Registry, allowing Docker to scale to its biggest customers',
                                        'Developed activity streams to maintain a searchable, comprehensive history of events'
                                    ]} code="dockerj" companyUrl="https://docker.com" date="May 2016 &mdash; August 2016" activeStateChange={ this.activeStateChange.bind(this) }
                                    logoUrl="logo_docker.png" name="Docker" place="San Francisco, California" position="Software Engineer" />
                                    <Job active={ this.state.uber.get('active') } bullets={[
                                        'Migrated everything related to promotions to a microservice, including API endpoints and database access',
                                        'Wrote promotion redemption flow executed by all rides to find the most suitable promotion to apply',
                                        'Implemented ETL monitoring to measure and alert based on data transfer speeds and consistency',
                                        'Wrote a job to periodically delete millions of unneeded database rows to deal with scaling issues',
                                        'Dealt with insane scaling issues every day using tactics like caching, indexes, code optimizations, etc.'
                                    ]} code="uber" companyUrl="https://uber.com" date="August 2015 &mdash; December 2015" activeStateChange={ this.activeStateChange.bind(this) }
                                    logoUrl="logo_uber.png" name="Uber" place="San Francisco, California" position="Software Engineering Intern" />
                                    <Job active={ this.state.symph.get('active') } bullets={[
                                        'Overhauled customer management pages, drastically improving customer support efficiency',
                                        'Introduced tiered wholesale accounts, enabling storeowners to set tiered limits on wholesalers such as minimum purchase requirements',
                                        'Refactored store checkout and product pages, reducing network traffic and seeing speed gains of >24%',
                                        'Identified and fixed a security vulnerability where data was being sent to external services unknowingly'
                                    ]} code="symph" companyUrl="https://symphonycommerce.com" date="January 2015 &mdash; July 2015" activeStateChange={ this.activeStateChange.bind(this) }
                                    logoUrl="logo_symphony.png" name="Symphony Commerce" place="San Francisco, California" position="Full-Stack Software Engineer" />
                                </div>
                            </div>
                            <div className="section">
                                <h2 className="sectionTitle"><i className="fa fa-code"></i> Projects</h2>
                                <div className="subsection">
                                    <div className="projectsAvailable">More projects at <a href="https://joshchorlton.com" target="_blank">joshchorlton.com</a>, all code available at <a href="https://github.com/jchorl" target="_blank">github.com/jchorl</a>.</div>
                                    <ul className="projectsList">
                                        <Project active={ this.state.fjc.get('active') } activeStateChange={ this.activeStateChange.bind(this) } bullets={[
                                            'Keep track of finances with support for templates and recurring transactions',
                                            'Hosted on EC2 with Go server, Postgres database, nginx and elasticsearch'
                                        ]} code="fjc" codeLink="https://github.com/jchorl/financejc" date="2016 &mdash; 2017" extra={ <a href="https://finance.joshchorlton.com" target="_blank">finance.joshchorlton.com</a> } name="FinanceJC" />
                                        <Project active={ this.state.framed.get('active') } activeStateChange={ this.activeStateChange.bind(this) } bullets={[
                                            'Easily embed a picture frame on a website with photos from a Google Photos album'
                                        ]} code="framed" codeLink="https://github.com/jchorl/framed" date="2016" extra={ <a href="https://framed.joshchorlton.com" target="_blank">framed.joshchorlton.com</a> } name="Framed" />
                                        <Project active={ this.state.com.get('active') } activeStateChange={ this.activeStateChange.bind(this) } bullets={[
                                                'Purchase from Craigslist using Postmates for delivery and Capital One for payment',
                                                'Hosted on App Engine with self-hosted Python proxy server to scrape Craigslist',
                                                'Winner of "Best Use of Capital One API"'
                                        ]} code="com" codeLink="https://github.com/matthewdu/powerplug" date="2015" extra={ <span>CalHacks</span> } name="craig-o-mation" noPrint={ true }/>
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
            </div>
        );
    }
}

class Tag extends Component {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        activeStateChange: PropTypes.func.isRequired,
        code: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }

    render() {
        const {
            active,
            code,
            activeStateChange,
            text
        } = this.props;

        return (
            <div className={ classNames("skill", { active }) } onMouseEnter={ activeStateChange(code, true) } onMouseLeave={ activeStateChange(code, false) }>{ text }</div>
        );
    }
}

class Job extends Component {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        activeStateChange: PropTypes.func.isRequired,
        bullets: PropTypes.arrayOf(PropTypes.string).isRequired,
        code: PropTypes.string.isRequired,
        companyUrl: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        logoUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        place: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired
    }

    render() {
        const {
            active,
            activeStateChange,
            bullets,
            code,
            companyUrl,
            date,
            logoUrl,
            name,
            place,
            position
        } = this.props;

        return (
            <div className={ classNames('company', { active }) } onMouseEnter={ activeStateChange(code, true) } onMouseLeave={ activeStateChange(code, false) }>
                <div className="coFirstRow">
                    <a href={ companyUrl } target="_blank" className="companyLink">
                        <span className="companyImgWrapper"><img src={ logoUrl } className="companyImg" alt="company logo"></img></span>
                        <span className="companyName">{ name }</span>
                    </a>
                    <span className="date">{ date }</span>
                </div>
                <div className="clear"></div>
                <div className="tiSecondRow">
                    <span className="title">{ position }</span>
                    <span className="place">{ place }</span>
                </div>
                <div className="clear"></div>
                <ul className="empList">
                    { bullets.map((str, i) => <li key={ i }>{ str }</li>) }
                </ul>
            </div>
        );
    }
}

class Project extends Component {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        activeStateChange: PropTypes.func.isRequired,
        bullets: PropTypes.arrayOf(PropTypes.string).isRequired,
        code: PropTypes.string.isRequired,
        codeLink: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        extra: PropTypes.element,
        name: PropTypes.string.isRequired,
        noPrint: PropTypes.bool
    }

    render() {
        const {
            active,
            activeStateChange,
            bullets,
            code,
            codeLink,
            date,
            extra,
            name,
            noPrint
        } = this.props;

        return (
            <li className={ classNames({ active, noPrint }) } onMouseEnter={ activeStateChange(code, true) } onMouseLeave={ activeStateChange(code, false) }>
                <a className="projectTitle" href={ codeLink } target="_blank">{ name }</a>{ extra ? <span> - { extra }</span> : null }
                <span className="date">{ date }</span>
                <ul>
                    { bullets.map((str, i) => <li key={ i }>{ str }</li>) }
                </ul>
            </li>
        );
    }
}
