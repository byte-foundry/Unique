// @flow
import React from "react";
import { push } from "react-router-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Shortcuts } from "react-shortcuts";
import { FormattedMessage } from "react-intl";
import "./SpecimenView.css";
import Button from "../../components/button/";
import CustomLogo from "../../components/customLogo";
import { storeEmail, storeProject } from "../../data/user";
import desktopBackground from "./desktop.svg";
import tabletBackground from "./tablet.svg";
import mobileBackground from "./mobile.svg";

import { ReactComponent as Back } from "../stepView/back.svg";

const isEmail = string =>
  new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ).test(string);

const renderValidateLoggedIn = (storeProj, fontName) => (
  <div>
    <Button
      className=""
      label="Download"
      onClick={() => {
        storeProj(fontName);
      }}
    />
  </div>
);

const renderValidateNotLoggedIn = (
  email,
  shouldChangeEmail,
  handleSubmit,
  handleChange,
  changeEmail,
  sendEmail,
  onFocus,
  onBlur
) =>
  email === "" || !email || shouldChangeEmail ? (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="your email"
        name="email"
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button type="submit">Download</button>
    </form>
  ) : (
    <div className="export">
      <p>You are currently registered as {email}.</p>
      <br />
      <Button
        className="hollow"
        label="Change email"
        onClick={() => changeEmail()}
      />

      <Button label="Download your font" onClick={() => sendEmail()} />
    </div>
  );

class SpecimenView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      shouldChangeEmail: false,
      isCustomLogo: false,
      showCustomLogoControls: true,
      shouldContinueUnregistered: false,
      fontName: props.projectName,
      isInputFocused: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCustomLogo = this.setCustomLogo.bind(this);
    this.removeCustomLogo = this.removeCustomLogo.bind(this);
    this.validateCustomLogo = this.validateCustomLogo.bind(this);
    this.handleShortcuts = this.handleShortcuts.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }
  componentDidMount() {
    this.specimenViewWrapper.focus();
  }
  onFocus() {
    this.setState({ isInputFocused: true });
  }
  onBlur() {
    this.setState({ isInputFocused: false });
  }
  setCustomLogo() {
    this.setState({ isCustomLogo: !this.state.isCustomLogo });
  }
  removeCustomLogo() {
    this.setState({
      isCustomLogo: !this.state.isCustomLogo,
      showCustomLogoControls: true
    });
  }
  validateCustomLogo() {
    this.setState({
      showCustomLogoControls: !this.state.showCustomLogoControls
    });
  }
  handleChange(event) {
    this.setState({ email: event.target.value });
  }
  handleSubmit(event) {
    if (isEmail(this.state.email)) {
      this.props.storeEmail(this.state.email, this.state.fontName);
    }
    event.preventDefault();
  }
  changeEmail() {
    this.setState({ shouldChangeEmail: true });
  }
  sendEmail() {
    this.props.storeEmail(this.props.email);
  }
  handleShortcuts(action) {
    if (!this.state.isInputFocused) {
      switch (action) {
        case "STEP_BACK":
          this.props.goBack();
          break;
        default:
          break;
      }
    }
  }
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <Shortcuts name="CHOICES" handler={this.handleShortcuts} isolate>
        <div
          className="SpecimenView"
          ref={c => {
            this.specimenViewWrapper = c;
          }}
          tabIndex="-1"
        >
          <div className="container">
            <Back
              className="icon-back"
              onClick={() => {
                this.props.goBack();
              }}
            />
            <div className="hooray">
              <h2>
                <FormattedMessage
                  id="SpecimenView.title"
                  defaultMessage="It's a match!"
                  description="Speciem view title"
                />
              </h2>
              <p>
                <FormattedMessage
                  id="SpecimenView.subtitle"
                  defaultMessage="You have created the perfect bespoke font that fits your needs."
                  description="Speciem view subtitle"
                />
              </p>
            </div>
            <div
              className="specimen row"
              style={{ fontFamily: `'${this.props.fontName}'` }}
            >
              <div className="col-sm-12 ">
                <h3>
                  <FormattedMessage
                    id="SpecimenView.word"
                    defaultMessage="Word"
                    description="Speciem view word"
                  />
                </h3>
                <p className="word">{this.props.word}</p>
                <h3>
                  <FormattedMessage
                    id="SpecimenView.characters"
                    defaultMessage="Characters"
                    description="Speciem view characters"
                  />
                </h3>
                <p className="characters">
                  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                </p>
                <p className="characters">
                  a b c d e f g h i j k l m n o p q r s t u v w x y z
                </p>
                <p className="characters">
                  1 2 3 4 5 6 7 8 9 0 . . . ( & ! ? )
                </p>
                <h3>
                  <FormattedMessage
                    id="SpecimenView.greyScale"
                    defaultMessage="Greyscale"
                    description="Speciem view greyscale"
                  />
                </h3>
                <div className="row">
                  <div className="col-md-6 col-sm-12 greyscale-left">
                    <p className="greyscale greyscale-left greyscale-first">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <p className="greyscale greyscale-left greyscale-second">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <p className="greyscale greyscale-left greyscale-third">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <div className="col-md-6 col-sm-12 greyscale-right">
                    <p className="greyscale greyscale-right greyscale-first">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <p className="greyscale greyscale-right greyscale-second">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <p className="greyscale greyscale-right greyscale-third">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <h2>
              <FormattedMessage
                id="SpecimenView.downloadCTA"
                defaultMessage="If you like your font, download it!"
                description="Speciem view download cta"
              />
            </h2>
            <p>
              <FormattedMessage
                id="SpecimenView.fontName"
                defaultMessage="What would be the name of your font?"
                description="Speciem view fontName cta"
              />
            </p>
            <form action="">
              <FormattedMessage
                id="SpecimenView.fontNamePlaceholder"
                defaultMessage="Your font name"
                description="Specimen view fontName placeholder"
              >
                {text => (
                  <input
                    type="text"
                    value={this.state.fontName}
                    placeholder={text}
                    name="fontname"
                    onChange={e => {
                      this.setState({ fontName: e.target.value });
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                  />
                )}
              </FormattedMessage>
            </form>
            {isAuthenticated() ? (
              renderValidateLoggedIn(
                this.props.storeProject,
                this.state.fontName
              )
            ) : (
              <div>
                <p>
                  <FormattedMessage
                    id="SpecimenView.notLoggedIn1"
                    defaultMessage="You are not logged in."
                    description="Speciem view not logged in - first"
                  />
                </p>
                <p>
                  <FormattedMessage
                    id="SpecimenView.notLoggedIn2"
                    defaultMessage="Do you want to Log in / Create an account to save your project ?"
                    description="Speciem view not logged in - Second"
                  />
                </p>
                <p>
                  <FormattedMessage
                    id="SpecimenView.logInButton"
                    defaultMessage="Log in"
                    description="Specimen view login button"
                  >
                    {text => (
                      <Button
                        className=""
                        label={text}
                        onClick={() => {
                          login("/specimen");
                        }}
                      />
                    )}
                  </FormattedMessage>
                </p>
                <p>
                  <FormattedMessage
                    id="SpecimenView.withoutAccount"
                    defaultMessage="You can also continue without an account."
                    description="Speciem view - without account"
                  />
                </p>
                {this.state.shouldContinueUnregistered ? (
                  renderValidateNotLoggedIn(
                    this.props.email,
                    this.state.shouldChangeEmail,
                    this.handleSubmit,
                    this.handleChange,
                    this.changeEmail,
                    this.sendEmail,
                    this.onFocus,
                    this.onBlur
                  )
                ) : (
                  <FormattedMessage
                    id="SpecimenView.continueUnregisteredButton"
                    defaultMessage="Continue unregistered"
                    description="Specimen view continue unregistered button"
                  >
                    {text => (
                      <Button
                        label={text}
                        onClick={() =>
                          this.setState({ shouldContinueUnregistered: true })
                        }
                      />
                    )}
                  </FormattedMessage>
                )}
              </div>
            )}
          </div>
        </div>
      </Shortcuts>
    );
  }
}

const mapStateToProps = state => ({
  fontName: state.font.currentPreset.preset + state.font.currentPreset.variant,
  step: state.font.step,
  email: state.user.email,
  need: state.font.need,
  word: state.user.chosenWord,
  projectName: state.user.projectName
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goBack: () => push("/customize"),
      storeEmail,
      storeProject
    },
    dispatch
  );

SpecimenView.propTypes = {
  storeEmail: PropTypes.func.isRequired,
  storeProject: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  fontName: PropTypes.string,
  email: PropTypes.string,
  need: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  }).isRequired,
  projectName: PropTypes.string
};

SpecimenView.defaultProps = {
  fontName: "ptypo",
  email: "",
  projectName: ""
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SpecimenView)
);
