import React, { Component, PropTypes } from "react";
import { Map, List } from "immutable";
import classNames from "classnames";

import "./Resume.css";

export default class Resume extends Component {
  constructor(props) {
    super(props);

    // each tag/job should have its own key on the root state. if the state mutates too quickly multiple times, sometimes the old
    // state will get read and clobber some udpates in progress. keeping each tag/job as a key on the root state allows only
    // updating that key.
    let state = {
      stripe: Map({
        active: false,
        associated: List([
          "aws",
          "git",
          "sql",
          "go",
          "py",
          "docker",
          "kubernetes",
          "lin",
          "js",
          "html",
          "css",
          "react",
          "terraform"
        ])
      }),
      snap: Map({
        active: false,
        associated: List(["java", "guava", "git", "aws", "gcp", "sql"])
      }),
      dockerj: Map({
        active: false,
        associated: List([
          "go",
          "sql",
          "js",
          "html",
          "css",
          "react",
          "redux",
          "docker",
          "git",
          "lin",
          "aws",
          "ng",
          "terraform"
        ])
      }),
      uber: Map({
        active: false,
        associated: List(["fl", "tor", "py", "sql", "git", "lin", "aws"])
      }),
      bankhooks: Map({
        active: false,
        associated: List([
          "go",
          "git",
          "css",
          "html",
          "js",
          "react",
          "redux",
          "lin",
          "gcp",
          "docker"
        ])
      }),
      sendfiles: Map({
        active: false,
        associated: List([
          "rust",
          "git",
          "react",
          "lin",
          "aws",
          "sql",
          "js",
          "html",
          "css",
          "terraform"
        ])
      }),
      mtls: Map({
        active: false,
        associated: List(["go", "git", "css", "html", "js", "react"])
      })
    };

    // generate the skills and associations
    let jobKeys = Object.keys(state);
    for (let job of jobKeys) {
      for (let skill of state[job].get("associated").toArray()) {
        if (!state[skill]) {
          state[skill] = Map({
            active: false,
            associated: List()
          });
        }
        state[skill] = state[skill].update("associated", associated =>
          associated.push(job)
        );
      }
    }

    this.state = state;
  }

  activeStateChange = (name, activating) => {
    let newState = {};
    newState[name] = this.state[name].set("active", activating);
    this.state[name]
      .get("associated")
      .forEach(k => (newState[k] = this.state[k].set("active", activating)));

    let updateState = () => {
      this.setState(newState);
    };
    return updateState.bind(this);
  };

  shouldComponentUpdate(nextProps, nextState) {
    for (let k of Object.keys(nextState)) {
      if (this.state[k].get("active") !== nextState[k].get("active")) {
        return true;
      }
    }
    return false;
  }

  render() {
    const langs = [
      <Tag
        key="go"
        code="go"
        active={this.state.go.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Go"
      />,
      <Tag
        key="java"
        code="java"
        active={this.state.java.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Java"
      />,
      <Tag
        key="rust"
        code="rust"
        active={this.state.rust.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Rust"
      />,
      <Tag
        key="js"
        code="js"
        active={this.state.js.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="JS"
      />,
      <Tag
        key="html"
        code="html"
        active={this.state.html.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="HTML5"
      />,
      <Tag
        key="css"
        code="css"
        active={this.state.css.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="CSS3"
      />,
      <Tag
        key="py"
        code="py"
        active={this.state.py.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Python"
      />,
      <Tag
        key="sql"
        code="sql"
        active={this.state.sql.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="SQL"
      />
    ];

    const frameworks = [
      <Tag
        key="react"
        code="react"
        active={this.state.react.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="ReactJS"
      />,
      <Tag
        key="redux"
        code="redux"
        active={this.state.redux.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Redux"
      />,
      <Tag
        key="guava"
        code="guava"
        active={this.state.guava.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Guava"
      />,
      <Tag
        key="tor"
        code="tor"
        active={this.state.tor.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Tornado"
      />,
      <Tag
        key="fl"
        code="fl"
        active={this.state.fl.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Flask"
      />,
      <Tag
        key="ng"
        code="ng"
        active={this.state.ng.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="AngularJS"
      />
    ];

    const tools = [
      <Tag
        key="docker"
        code="docker"
        active={this.state.docker.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Docker"
      />,
      <Tag
        key="kubernetes"
        code="kubernetes"
        active={this.state.kubernetes.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Kubernetes"
      />,
      <Tag
        key="terraform"
        code="terraform"
        active={this.state.terraform.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Terraform"
      />,
      <Tag
        key="git"
        code="git"
        active={this.state.git.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Git"
      />,
      <Tag
        key="lin"
        code="lin"
        active={this.state.lin.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="Linux"
      />,
      <Tag
        key="aws"
        code="aws"
        active={this.state.aws.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="AWS"
      />,
      <Tag
        key="gcp"
        code="gcp"
        active={this.state.gcp.get("active")}
        activeStateChange={this.activeStateChange.bind(this)}
        text="GCP"
      />
    ];

    return (
      <div id="resume">
        <h1 className="sectionHeading noPrint">Resume</h1>
        <a
          id="pdfButton"
          href="/joshchorltonresume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View PDF
        </a>
        <div id="resumeSidebarContainer">
          <div id="sidebarContainerContainer">
            <div id="sidebarContainer">
              <div id="sidebar">
                <h2 id="skillsLabel">Skills</h2>
                <h3 className="skillSectionLabel">Languages</h3>
                <div className="skillSection">{langs}</div>
                <h3 className="skillSectionLabel">Frameworks</h3>
                <div className="skillSection">{frameworks}</div>
                <h3 className="skillSectionLabel">Tools</h3>
                <div className="skillSection">{tools}</div>
              </div>
            </div>
          </div>
          <div id="page">
            <a
              id="printButton"
              className="noPrint"
              href="/joshchorltonresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-print" /> Print
            </a>
            <div className="content">
              <div id="personalInfo">
                <div className="nameSchool">
                  <h2 className="name">Josh Chorlton</h2>
                  <div className="school">
                    Software Engineering | University of Waterloo
                  </div>
                </div>
                <div className="contactInfo">
                  <div>
                    <i className="fa fa-globe contactIcon" />
                    <a className="link" href="http://joshchorlton.com">
                      joshchorlton.com
                    </a>
                  </div>
                  <div>
                    <i className="fa fa-envelope contactIcon" />
                    <a className="link" href="mailto:josh@joshchorlton.com">
                      josh@joshchorlton.com
                    </a>
                  </div>
                  <div>
                    <i className="fa fa-mobile-phone contactIcon" />
                    (415) 371-9709
                  </div>
                </div>
              </div>
              <div id="skillsBar">
                <div className="bracket">[</div>
                <div className="skillsContainerHolder">
                  <div className="skillsContainer">
                    <h4 className="skillsBarSection">Languages:</h4>
                    {langs}
                  </div>
                  <div className="skillsContainer">
                    <h4 className="skillsBarSection">Frameworks:</h4>
                    {frameworks}
                  </div>
                  <div className="skillsContainer">
                    <h4 className="skillsBarSection">Tools:</h4>
                    {tools}
                  </div>
                </div>
                <div className="bracket">]</div>
              </div>
              <div className="section">
                <h2 className="sectionTitle">
                  <i className="fa fa-briefcase" /> Work Experience
                </h2>
                <div className="subsection">
                  <Job
                    active={this.state.stripe.get("active")}
                    bullets={[
                      "Tech lead for caching and consensus. I was responsible for roadmap/direction, budgeting, hiring, and project management. Over a period of 2 years, my org went from zero to 30 people. Dozens of internal memcached clusters could serve sub-ms responses. The clusters saved $10MM+/yr on database costs and managed alternatives. The etcd clusters were resilient to a full-region outage and underpinned Stripe's multi-region strategy. Every cluster operated at >5 9's.",
                      "Managed adoption of AWS Aurora internally, leading a team of 10 developers. This was a multi-year cross-functional effort that involved securing data access, client libraries, proxies, observability, scalability/load-testing, and developer tooling.",
                      "Led migration of Stripe's queueing system to Kubernetes (30k+ rps), including design, testing and implementation, drastically expanding platform capabilities and improving reliability, while also decreasing costs",
                      "Provisioned ML Kubernetes cluster supporting a diverse set of workloads, including autoscaling, powering all model training for fraud and risk",
                      "Improved reliability by adding blue/green deploys and proper request draining during deploys on Kubernetes",
                      "Simplified infrastructure provisioning by automating AWS resource creation and adding secure defaults",
                      "Built secure container monitoring solution for auditable logs of workloads running on the cluster",
                      "Designed and implemented authentication for Kubernetes, allowing for easy, secure and audited cluster access",
                      "Overhauled secrets management for Kubernetes, providing easy interfaces for services to securely access secrets"
                    ]}
                    code="stripe"
                    companyUrl="https://stripe.com"
                    date="August 2018 &mdash; Present"
                    activeStateChange={this.activeStateChange.bind(this)}
                    logoUrl="logo_stripe.png"
                    name="Stripe"
                    place="San Francisco, California"
                    position="Tech Lead, Distributed Systems"
                  />
                  <Job
                    active={this.state.snap.get("active")}
                    bullets={[
                      "Migrated Stories feature from all-or-nothing caching approach to leveraging partial caching with incremental updates backed by a database, saving the company $5MM/yr and reducing latency by up to 30%",
                      "Designed and implemented intelligent compression/reconstruction algorithm, reducing client state sizes 100x",
                      "Shifted Stories client state from server to client, reducing latency and cutting costs on billions of requests daily"
                    ]}
                    code="snap"
                    companyUrl="https://snap.com"
                    date="January 2017 &mdash; April 2017"
                    activeStateChange={this.activeStateChange.bind(this)}
                    logoUrl="logo_snapchat.png"
                    name="Snapchat"
                    place="Venice, California"
                    position="Software Engineering Intern"
                  />
                  <Job
                    active={this.state.dockerj.get("active")}
                    bullets={[
                      "Added support for configurable policies to ensure only signed images can be executed in Docker Datacenter",
                      "Revamped garbage collection in Docker Trusted Registry, allowing Docker to scale to its biggest customers",
                      "Developed activity streams to maintain a searchable, comprehensive history of events in enterprise offerings"
                    ]}
                    code="dockerj"
                    companyUrl="https://docker.com"
                    date="2016"
                    activeStateChange={this.activeStateChange.bind(this)}
                    logoUrl="logo_docker.png"
                    name="Docker"
                    place="San Francisco, California"
                    position="Software Engineer"
                  />
                  <Job
                    active={this.state.uber.get("active")}
                    bullets={[
                      "Wrote promotion redemption flow executed by all rides to find the most suitable promotion to apply",
                      "Contributed to migrating promotions to a microservice, including API endpoints and database access",
                      "Implemented ETL monitoring to measure and alert based on data transfer speeds and consistency",
                      "Wrote a database garbage-collection job to clear out delete millions of database rows, relieving scaling issues"
                    ]}
                    code="uber"
                    companyUrl="https://uber.com"
                    date="2015"
                    activeStateChange={this.activeStateChange.bind(this)}
                    logoUrl="logo_uber.png"
                    name="Uber"
                    place="San Francisco, California"
                    position="Software Engineering Intern"
                  />
                </div>
              </div>
              <div className="section">
                <h2 className="sectionTitle">
                  <i className="fa fa-code" /> Projects
                </h2>
                <div className="subsection">
                  <div className="projectsAvailable">
                    More projects at{" "}
                    <a
                      href="https://joshchorlton.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      joshchorlton.com
                    </a>
                    , all code available at{" "}
                    <a
                      href="https://github.com/jchorl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/jchorl
                    </a>
                    .
                  </div>
                  <ul className="projectsList">
                    <Project
                      active={this.state.bankhooks.get("active")}
                      activeStateChange={this.activeStateChange.bind(this)}
                      bullets={[
                        "Contributed to many open-source projects including Docker, Kubernetes, Nextflow, MultiQC, MySQL and more",
                        "Contributions range from bugfixes to full features",
                        "Maintainers regularly consult me for architectural advice",
                      ]}
                      code="bankhooks"
                      codeLink="https://github.com/jchorl"
                      date="2014-"
                      name="Open-Source Contributions"
                    />
                    <Project
                      active={this.state.bankhooks.get("active")}
                      activeStateChange={this.activeStateChange.bind(this)}
                      bullets={[
                        "Monitors bank accounts and transactions, sending webhooks when predefined conditions are met",
                        "Uses Plaid to access bank accounts, hosted on Google App Engine, with React query builder frontend",
                        "Strong cohort of paying users",
                      ]}
                      code="bankhooks"
                      codeLink="https://github.com/jchorl/auditor"
                      date="2018-2021"
                      extra={
                        <a
                          href="https://bankhooks.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          bankhooks.com
                        </a>
                      }
                      name="BankHooks"
                    />
                    <Project
                      active={this.state.sendfiles.get("active")}
                      activeStateChange={this.activeStateChange.bind(this)}
                      bullets={[
                        "Secure p2p transmission of files from browser-to-browser, using WebRTC and Web Crypto",
                        "Utilizes websockets, AWS Lambda and Dynamo to initiate connections between clients",
                      ]}
                      code="sendfiles"
                      codeLink="https://github.com/jchorl/sendfiles"
                      date="2021"
                      extra={
                        <a
                          href="https://sendfiles.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          sendfiles.dev
                        </a>
                      }
                      name="sendfiles.dev"
                    />
                    <Project
                      active={this.state.mtls.get("active")}
                      activeStateChange={this.activeStateChange.bind(this)}
                      bullets={[
                        "Generate client, server and CA certs using Cloudflare's cfssl",
                        "Runs entirely in-browser under WebAssembly"
                      ]}
                      code="mtls"
                      codeLink="https://github.com/jchorl/tlscerts"
                      date="2020"
                      extra={
                        <a
                          href="https://mtls.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          mtls.dev
                        </a>
                      }
                      name="mtls.dev"
                    />
                  </ul>
                </div>
              </div>
              <div className="section">
                <h2 className="sectionTitle">
                  <i className="fa fa-graduation-cap" /> Education
                </h2>
                <div className="subsection">
                  <ul>
                    <li>
                      Bachelor's of Software Engineering - University of
                      Waterloo (2018)
                    </li>
                    <li>
                      Albert Sherwood Barber Medal for best overall work term
                      and academic performance in the faculty of Engineering
                    </li>
                    <li>Dean's Honour List</li>
                    <li>President's Scholarship of Distinction</li>
                  </ul>
                </div>
              </div>
              <div className="section noPrint">
                <h2 className="sectionTitle">
                  <i className="fa fa-rocket" /> Activities and Interests
                </h2>
                <div className="subsection">
                  <ul>
                    <li>Leafs fan since birth</li>
                    <li>
                      Music - Play guitar and am always listening. See{" "}
                      <a
                        href="https://joshchorlton.com#about"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        joshchorlton.com#about
                      </a>
                      .
                    </li>
                    <li>
                      Travel - Been to 30 countries so far. See{" "}
                      <a
                        href="https://joshchorlton.com#about"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        joshchorlton.com#about
                      </a>
                      .
                    </li>
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
  };

  render() {
    const { active, code, activeStateChange, text } = this.props;

    return (
      <div
        className={classNames("skill", { active })}
        onMouseEnter={activeStateChange(code, true)}
        onMouseLeave={activeStateChange(code, false)}
      >
        {text}
      </div>
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
  };

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
      <div
        className={classNames("company", { active })}
        onMouseEnter={activeStateChange(code, true)}
        onMouseLeave={activeStateChange(code, false)}
      >
        <div className="coFirstRow">
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="companyLink"
          >
            <span className="companyImgWrapper">
              <img src={logoUrl} className="companyImg" alt="company logo" />
            </span>
            <span className="companyName">{name}</span>
          </a>
          <span className="date">{date}</span>
        </div>
        <div className="clear" />
        <div className="tiSecondRow">
          <span className="title">{position}</span>
          <span className="place">{place}</span>
        </div>
        <div className="clear" />
        <ul className="empList">
          {bullets.map((str, i) => (
            <li key={i}>{str}</li>
          ))}
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
  };

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
      <li
        className={classNames({ active, noPrint })}
        onMouseEnter={activeStateChange(code, true)}
        onMouseLeave={activeStateChange(code, false)}
      >
        <a
          className="projectTitle"
          href={codeLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
        {extra ? <span> - {extra}</span> : null}
        <span className="date">{date}</span>
        <ul>
          {bullets.map((str, i) => (
            <li key={i}>{str}</li>
          ))}
        </ul>
      </li>
    );
  }
}
