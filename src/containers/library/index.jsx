// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import Button from "../../components/button/";
import { loadProject, download, reloadFonts } from "../../data/font";
import { deleteUserProject } from "../../data/user";
import "./Library.css";

class Library extends React.Component {
  constructor(props) {
    super(props);
    const payedProjects = props.projects.filter(
      project => project.bought === true
    );
    const savedProjects = props.projects.filter(
      project => project.bought === false
    );
    this.state = {
      payedProjects,
      savedProjects
    };
  }
  componentWillReceiveProps(newProps) {
    const payedProjects = newProps.projects.filter(
      project => project.bought === true
    );
    const savedProjects = newProps.projects.filter(
      project => project.bought === false
    );
    this.setState({
      payedProjects,
      savedProjects
    });
  }
  render() {
    console.log("Library render");
    console.log(this.props.projects);
    return (
      <div className="Library">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1>
                <FormattedMessage
                  id="Library.title"
                  defaultMessage="Hello!"
                  description="Library page title"
                />
              </h1>
            </div>
          </div>
          <div className="row actions">
            <div className="col-sm-12">
              <p className="action" onClick={() => this.props.goToHome()}>
                <FormattedMessage
                  id="Library.actionCreate"
                  defaultMessage="Create a new project"
                  description="Library action new project"
                />
              </p>
              <p
                className="action"
                onClick={() => this.props.reloadFonts(true)}
              >
                <FormattedMessage
                  id="Library.actionReload"
                  defaultMessage="Restart your project"
                  description="Libraryaction restart project"
                />
              </p>
            </div>
          </div>
          <div className="row projects">
            <div className="col-sm-12">
              <h2>
                <FormattedMessage
                  id="Library.savedProjectsTitle"
                  defaultMessage="Saved Projects"
                  description="Library saved projects title"
                />
              </h2>
            </div>
            <FlipMove
              duration={100}
              easing="ease"
              appearAnimation="elevator"
              leaveAnimation="elevator"
              staggerDurationBy="10"
              staggerDelayBy="20"
              style={{ width: "100%" }}
            >
              {this.state.savedProjects.map(project => (
                <div className="col-sm-3 project" key={project.id}>
                  <div
                    className="preview"
                    style={{ fontFamily: `project${project.id}` }}
                  >
                    AaBbCc
                  </div>
                  <div className="need">{project.need}</div>
                  <div className="fontName">{project.name || "Undefined"}</div>
                  <div className="actions">
                    <FormattedMessage
                      id="Library.deleteAction"
                      defaultMessage="Delete"
                      description="Library delete project button"
                    >
                      {text => (
                        <Button
                          onClick={() =>
                            this.props.deleteUserProject(project.id)
                          }
                          label={text}
                          mode="text"
                          className="action-delete"
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage
                      id="Library.openAction"
                      defaultMessage="Open"
                      description="Library open project button"
                    >
                      {text => (
                        <Button
                          onClick={() =>
                            this.props.loadProject(project.id, project.name)
                          }
                          label={text}
                          mode="hollow"
                          className="action-open"
                        />
                      )}
                    </FormattedMessage>
                  </div>
                </div>
              ))}
            </FlipMove>
          </div>
          <div className="row projects">
            <div className="col-sm-12">
              <h2>
                <FormattedMessage
                  id="Library.boughtProjectsTitle"
                  defaultMessage="Bought Projects"
                  description="Library bought projects title"
                />
              </h2>
            </div>
            <FlipMove
              duration={100}
              easing="ease"
              appearAnimation="elevator"
              leaveAnimation="elevator"
              staggerDurationBy="10"
              staggerDelayBy="20"
              style={{ width: "100%" }}
            >
              {this.state.payedProjects.map(project => (
                <div className="col-sm-3 project" key={project.id}>
                  <div
                    className="preview"
                    style={{ fontFamily: `project${project.id}` }}
                  >
                    AaBbCc
                  </div>
                  <div className="need">{project.need}</div>
                  <div className="fontName">{project.name || "Undefined"}</div>
                  <div className="actions">
                    <FormattedMessage
                      id="Library.downloadAction"
                      defaultMessage="Download"
                      description="Library download project button"
                    >
                      {text => (
                        <Button
                          onClick={() =>
                            this.props.download(
                              `project${project.id}`,
                              project.name || "Undefined"
                            )
                          }
                          label={text}
                          mode="hollow"
                          className="action-open"
                        />
                      )}
                    </FormattedMessage>
                  </div>
                </div>
              ))}
            </FlipMove>
          </div>
        </div>
      </div>
    );
  }
}

Library.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      bought: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  goToHome: PropTypes.func.isRequired,
  loadProject: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
  deleteUserProject: PropTypes.func.isRequired,
  reloadFonts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  projects: state.user.projects
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToHome: () => push("/app/"),
      loadProject,
      download,
      deleteUserProject,
      reloadFonts
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Library);
