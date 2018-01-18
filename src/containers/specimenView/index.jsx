// @flow
import React from 'react';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Shortcuts } from 'react-shortcuts';
import './SpecimenView.css';
import StepList from '../stepList/';
import Button from '../../components/button/';
import ShortcutsHelper from '../../components/shortcutsHelper';
import CustomLogo from '../../components/customLogo';
import { storeEmail, storeProject } from '../../data/user';
import desktopBackground from './desktop.svg';
import tabletBackground from './tablet.svg';
import mobileBackground from './mobile.svg';

const isEmail = string => new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(string);

const logoSpecimen = (
  fontName,
  word,
  isCustomLogo,
  showControls,
  setCustomLogo,
  removeCustomLogo,
  validateCustomLogo,
) => (
  <div className="specimen row">
    <div className="col-sm-12 col-md-8">
      <div className="logo">
        {isCustomLogo
        ? <CustomLogo word={word} fontName={fontName} shouldShowControls={showControls} />
        : <span className="logo-unstyled" style={{ fontFamily: fontName }}>{ word }</span>}
      </div>
      {
        isCustomLogo && showControls
        ? (
          <Button
            className="hollow"
            label="cancel"
            onClick={() => removeCustomLogo()}
          />
        )
        : null
      }
      <Button
        className=""
        label={isCustomLogo && showControls ? 'Set customization' : 'Customize it'}
        onClick={() => {
          return isCustomLogo ? validateCustomLogo() : setCustomLogo();
        }}
      />
    </div>
    <div className="col-sm-12 col-md-3">
      <StepList specimen />
    </div>
  </div>
);

const textSpecimen = fontName => (
  <div className="specimen row" style={{ fontFamily: fontName }}>
    <div className="col-sm-12 col-md-6">
      <div className="uppercase">A B C D E F G H I</div>
      <div className="uppercase">J K L M N O P Q R</div>
      <div className="uppercase">S T U V W X Y Z</div>
      <div className="lowercase">
        a b c d e f g h i j k l m n o p q r s t u v w x y z
      </div>
      <div className="lowercase">1 2 3 4 5 6 7 8 9 0 . . . ( & ! ? )</div>
      <div className="text1">
        There is a theory which states that if ever anyone discovers exactly
        what the Universe is for and why it is here, it will instantly disappear
        and be replaced by something even more bizarre and inexplicable. There
        is another theory which states that this has already happened.
      </div>
      <div className="text2">
        Twelve voices were shouting in anger, and they were all alike. No
        question, now, what had happened to the faces of the pigs. The creatures
        outside looked from pig to man, and from man to pig, and from pig to man
        again; but already it was impossible to say which was which.
      </div>
    </div>
    <div className="col-sm-12 col-md-6">
      <StepList specimen />
    </div>
  </div>
);

const websiteSpecimen = fontName => (
  <div className="specimen website" style={{ fontFamily: fontName }}>
    <div className="templates">
      <div className="row">
        <div className="col-sm-12">
          <div className="template desktop-wrapper" style={{ backgroundImage: `url(${desktopBackground})` }}>
            <span className="text">
              There is a theory which states that if ever anyone discovers exactly
              what the Universe is for and why it is here, it will instantly disappear
              and be replaced by something even more bizarre and inexplicable. There
              is another theory which states that this has already happened.
              <br />
              Twelve voices were shouting in anger, and they were all alike. No
              question, now, what had happened to the faces of the pigs. The creatures
              outside looked from pig to man, and from man to pig, and from pig to man
              again; but already it was impossible to say which was which.
              <br />
              The trouble with most forms of transport, he thought, is basically one
              of them not being worth all the bother. On Earth—when there had been an Earth,
              before it was demolished to make way for a new hyperspace bypass—the problem had been with cars.
              The disadvantages involved in pulling lots of black sticky slime from out of the ground where it
              had been safely hidden out of harm's way, turning it into tar to cover the land with, smoke to fill
              the air with and pouring the rest into the sea, all seemed to outweigh the advantages of being able
              to get more quickly from one place to another—particularly when the place you arrived at had probably become,
              as a result of this, very similar to the place you had left, i.e. covered with tar, full of smoke and short of fish.
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-6">
          <div className="template tablet-wrapper" style={{ backgroundImage: `url(${tabletBackground})` }}>
            <span className="text">
              There is a theory which states that if ever anyone discovers exactly
              what the Universe is for and why it is here, it will instantly disappear
              and be replaced by something even more bizarre and inexplicable. There
              is another theory which states that this has already happened.
              <br />
              Twelve voices were shouting in anger, and they were all alike. No
              question, now, what had happened to the faces of the pigs. The creatures
              outside looked from pig to man, and from man to pig, and from pig to man
              again; but already it was impossible to say which was which.
              <br />
              The trouble with most forms of transport, he thought, is basically one
              of them not being worth all the bother. On Earth—when there had been an Earth,
              before it was demolished to make way for a new hyperspace bypass—the problem had been with cars.
            </span>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6">
          <div className="template mobile-wrapper" style={{ backgroundImage: `url(${mobileBackground})` }}>
            <span className="text">
              There is a theory which states that if ever anyone discovers exactly
              what the Universe is for and why it is here, it will instantly disappear
              and be replaced by something even more bizarre and inexplicable. There
              is another theory which states that this has already happened.
              <br />
              Twelve voices were shouting in anger, and they were all alike. No
              question, now, what had happened to the faces of the pigs. The creatures
              outside looked from pig to man, and from man to pig, and from pig to man
              again; but already it was impossible to say which was which.
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12">
        <StepList specimen />
      </div>
    </div>
  </div>
);

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
  onBlur,
) =>
  email === '' || !email || shouldChangeEmail
  ? (
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
  )
  : (
    <div className="export">
      <p>You are currently registered as {email}.</p><br />
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
      email: '',
      shouldChangeEmail: false,
      isCustomLogo: false,
      showCustomLogoControls: true,
      shouldContinueUnregistered: false,
      fontName: props.projectName,
      isInputFocused: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCustomLogo = this.setCustomLogo.bind(this);
    this.removeCustomLogo = this.removeCustomLogo.bind(this);
    this.validateCustomLogo = this.validateCustomLogo.bind(this);
    this.handleShortcuts = this.handleShortcuts.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
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
      showCustomLogoControls: true,
    });
  }
  validateCustomLogo() {
    this.setState({
      showCustomLogoControls: !this.state.showCustomLogoControls,
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
        case 'STEP_BACK':
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
      <Shortcuts
        name="CHOICES"
        handler={this.handleShortcuts}
        isolate
      >
        <div className="SpecimenView" ref={(c) => { this.specimenViewWrapper = c; }} tabIndex="-1">
          <Button
            className="back"
            mode="isBack"
            label="Back"
            onClick={() => this.props.goBack()}
          />
          <div className="container">
            <h3>
              Hooray ! You have created the perfect bespoke font for your project
            </h3>
            {(() => {
              switch (this.props.need) {
                case "logo":
                  return logoSpecimen(
                    this.props.fontName,
                    this.props.word,
                    this.state.isCustomLogo,
                    this.state.showCustomLogoControls,
                    this.setCustomLogo,
                    this.removeCustomLogo,
                    this.validateCustomLogo,
                    this.onFocus,
                    this.onBlur,
                  );
                case "text":
                  return textSpecimen(this.props.fontName);
                case "website":
                  return websiteSpecimen(this.props.fontName);
                default:
                  return textSpecimen(this.props.fontName);
              }
            })()}
            <h3>If you like your work, download it!</h3>
            <p>What would be the name of your font?</p>
            <form action="">
              <input
                type="text"
                value={this.state.fontName}
                placeholder="Your font name"
                name="fontname"
                onChange={(e) => {
                  this.setState({ fontName: e.target.value });
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onFocus={this.onFocus}
                onBlur={this.onBlur}

              />
            </form>
            {isAuthenticated() ? (
              renderValidateLoggedIn(this.props.storeProject, this.state.fontName)
            ) : (
              <div>
                <p>You are not logged in.</p>
                <p>
                  Do you want to log in / create an account to save your project?
                </p>
                <p>
                  <Button
                    className=""
                    label="Log in"
                    onClick={() => {
                      login('/specimen');
                    }}
                  />
                </p>
                <p>You can also continue without an account</p>
                {this.state.shouldContinueUnregistered ? (
                  renderValidateNotLoggedIn(
                    this.props.email,
                    this.state.shouldChangeEmail,
                    this.handleSubmit,
                    this.handleChange,
                    this.changeEmail,
                    this.sendEmail,
                    this.onFocus,
                    this.onBlur,
                  )
                ) : (
                  <Button
                    label="Continue unregistered"
                    onClick={() =>
                      this.setState({ shouldContinueUnregistered: true })
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <ShortcutsHelper shortcuts={[{ name: 'Back to editing', key: 'Backspace' }]} />
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
  projectName: state.user.projectName,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  goBack: () => push('/customize'),
  storeEmail,
  storeProject,
}, dispatch);

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
    login: PropTypes.func.isRequired,
  }).isRequired,
  projectName: PropTypes.string,
};

SpecimenView.defaultProps = {
  fontName: 'ptypo',
  email: '',
  projectName: '',
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecimenView));
