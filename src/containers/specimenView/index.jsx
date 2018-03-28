// @flow
import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { FormattedMessage } from "react-intl";
import "./SpecimenView.css";
import Button from "../../components/button/";
import { storeProject } from "../../data/user";
import desktopBackground from "./desktop.svg";
import tabletBackground from "./tablet.svg";
import mobileBackground from "./mobile.svg";

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
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div
        className="SpecimenView"
        ref={c => {
          this.specimenViewWrapper = c;
        }}
        tabIndex="-1"
      >
        <div className="container">
          <div className="hooray">
            <h2>
              <FormattedMessage
                id="SpecimenView.title"
                defaultMessage="Congrats, you're almost done!"
                description="Speciem view title"
              />
            </h2>
            <p className="subtitle">
              <FormattedMessage
                id="SpecimenView.subtitle"
                defaultMessage="Embark on new adventures with your complete glyph set! But before you move on, let's give your font a name"
                description="Speciem view subtitle"
              />
            </p>
            <p className="fontName">
              <FormattedMessage
                id="SpecimenView.nameActionLabel"
                defaultMessage="Give your font a name:"
                description="SpecimenView - Name action label"
              />
              <FormattedMessage
                id="SpecimenView.nameAction"
                defaultMessage="My font name"
                description="SpecimenView - Name action"
              >
                {text => (
                  <input
                    type="text"
                    value={this.state.fontName}
                    placeholder={text}
                    className="input-fontname"
                    onChange={e => this.setState({ fontName: e.target.value })}
                  />
                )}
              </FormattedMessage>
            </p>
            <p className="subtitle-two">
              <FormattedMessage
                id="SpecimenView.subtitleBack"
                defaultMessage="Not quite right? Just click trough the menu to edit"
                description="Speciem view back subtitle"
              />
            </p>
            <div className="buttons">
              <FormattedMessage
                id="SpecimenView.downloadAction"
                defaultMessage="Download"
                description="SpecimenView - Download action"
              >
                {text => (
                  <Button
                    className="button-download"
                    onClick={() => {
                      this.props.goToCheckout(this.state.fontName);
                    }}
                    mode="full"
                    label={text}
                  />
                )}
              </FormattedMessage>

              <FormattedMessage
                id="SpecimenView.saveAction"
                defaultMessage="Save it for later"
                description="SpecimenView - Save action"
              >
                {text => (
                  <Button
                    className="button-save"
                    onClick={() => {
                      if (this.props.isAuthenticated) {
                        this.props.storeProject(this.state.fontName);
                      } else {
                        this.props.authenticate(
                          this.props.storeProject,
                          this.state.fontName
                        );
                      }
                    }}
                    mode="light"
                    label={text}
                  />
                )}
              </FormattedMessage>
            </div>
          </div>
          <div
            className="specimen row"
            style={{ fontFamily: `'${this.props.fontName}'` }}
          >
            <div className="col-sm-12 ">
              <h3>
                <FormattedMessage
                  id="SpecimenView.display"
                  defaultMessage="Display"
                  description="Specimen view display"
                />
              </h3>
              <p className="word">{this.props.word}</p>
              <h3>
                <FormattedMessage
                  id="SpecimenView.characters"
                  defaultMessage="Characters"
                  description="Specimen view characters"
                />
              </h3>
              <div className="characters">
                <div className="uppercase">A B C D E F G H I J K L M</div>
                <div className="uppercase">N O P Q R S T U V W X Y Z</div>
                <div className="lowercase">a b c d e f g h i j k l m</div>
                <div className="lowercase">n o p q r s t u v w x y z</div>
                <div className="lowercase">1 2 3 4 5 6 7 8 9 0 & @ .</div>
                <div className="lowercase">{", ? ! “ ” ( ) < > ° + - $"}</div>
              </div>
              <h3>
                <FormattedMessage
                  id="SpecimenView.text"
                  defaultMessage="Text"
                  description="Speciem view text"
                />
              </h3>
              <div className="row">
                <div className="col-md-4 col-sm-12 text-wrapper">
                  <p className="text text-small">
                    A manifesto We, the undersigned, are graphic designers,
                    photographers and students who have been brought up in a
                    world which the techniques and apparatus of advertising have
                    persistently been presented to us as the most lucrative,
                    effective and desirable means of using our talents. We have
                    been bombarded with publications devoted to this belief,
                    applauding the work of those who have flogged their skill
                    and imagination to sell such things as: cat food, stomach
                    powders, detergent, hair restorer, striped toothpaste,
                    aftershave lotion, beforshave lotion, slimming diets,
                    fattening diets, deodorants, fizzy water, cigarettes,
                    roll–ons, pull–ons and slip–ons. By far the greatest time
                    and effort of those working in the advertising industry are
                    wasted on these trivial purposes, which contribute little or
                    nothing to our national prosperity. In common with an
                    increasing number of the general public, we have reached a
                    saturation opine at which the high pitched scream of
                    consumer selling is no more than sheer noise. We think that
                    there are other things more worth using our skill and
                    experience on. There are signs for streets and buildings,
                    books and periodicals, catalogues, instructional manuals,
                    industrial photography, educational aids, films, television
                    features, scientific and industrial publications and all the
                    other media through which we promote our trade, our
                    education, our culture and our greater awareness of the
                    owls. We do not advocate the abolition of high pressure
                    consumer advertising: this is not feasible. Nor do we want
                    to take any of the fun out of life. But we are proposing a
                    reversal of priorities in favor of the more useful and more
                    lasting forms of communication. We hope that our society
                    will tire of gimmick merchants, status salesmen and hidden
                    persuaders, and that the prior call on our skills will be
                    for worthwhile purposes. With this in mind, we propose to
                    share our experience and opinions, and to make them
                    available to colleagues, students and others who may be
                    interested. Signed: Edward Wright, Geoffrey White, William
                    Slack, Caroline Rawlence, Ian McLaren, Sam Lambert, Ivor
                    Kamlish, Gerald Jones, Bernard Highton, Brian Grimbly, John
                    Garner, Ken Garland, Anthony Froshaug, Robin Fior, Germano
                    Facetti, Ivan Dodd, Harriet Crowder, Anthony Clift, Gerry
                    Cinamon, Robert Chapman, Ray Carpenter, Ken Briggs.
                  </p>
                </div>
                <div className="col-md-4 col-sm-12 text-wrapper">
                  <p className="text text-medium">
                    A manifesto We, the undersigned, are graphic designers,
                    photographers and students who have been brought up in a
                    world which the techniques and apparatus of advertising have
                    persistently been presented to us as the most lucrative,
                    effective and desirable means of using our talents. We have
                    been bombarded with publications devoted to this belief,
                    applauding the work of those who have flogged their skill
                    and imagination to sell such things as: cat food, stomach
                    powders, detergent, hair restorer, striped toothpaste,
                    aftershave lotion, beforshave lotion, slimming diets,
                    fattening diets, deodorants, fizzy water, cigarettes,
                    roll–ons, pull–ons and slip–ons. By far the greatest time
                    and effort of those working in the advertising industry are
                    wasted on these trivial purposes, which contribute little or
                    nothing to our national prosperity. In common with an
                    increasing number of the general public, we have reached a
                    saturation opine at which the high pitched scream of
                    consumer selling is no more than sheer noise. We think that
                    there are other things more worth using our skill and
                    experience on. There are signs for streets and buildings,
                    books and periodicals, catalogues, instructional manuals,
                    industrial photography, educational aids, films, television
                    features, scientific and industrial publications and all the
                    other media through which we promote our trade, our
                    education, our culture and our greater awareness of the
                    owls. We do not advocate the abolition of high pressure
                    consumer advertising: this is not feasible. Nor do we want
                    to take any of the fun out of life. But we are proposing a
                    reversal of priorities in favor of the more useful and more
                    lasting forms of communication. We hope that our society
                    will tire of gimmick merchants, status salesmen and hidden
                    persuaders, and that the prior call on our skills will be
                    for worthwhile purposes. With this in mind, we propose to
                    share our experience and opinions, and to make them
                    available to colleagues, students and others who may be
                    interested. Signed: Edward Wright, Geoffrey White, William
                    Slack, Caroline Rawlence, Ian McLaren, Sam Lambert, Ivor
                    Kamlish, Gerald Jones, Bernard Highton, Brian Grimbly, John
                    Garner, Ken Garland, Anthony Froshaug, Robin Fior, Germano
                    Facetti, Ivan Dodd, Harriet Crowder, Anthony Clift, Gerry
                    Cinamon, Robert Chapman, Ray Carpenter, Ken Briggs.
                  </p>
                </div>
                <div className="col-md-4 col-sm-12 text-wrapper">
                  <p className="text text-big">
                    A manifesto We, the undersigned, are graphic designers,
                    photographers and students who have been brought up in a
                    world which the techniques and apparatus of advertising have
                    persistently been presented to us as the most lucrative,
                    effective and desirable means of using our talents. We have
                    been bombarded with publications devoted to this belief,
                    applauding the work of those who have flogged their skill
                    and imagination to sell such things as: cat food, stomach
                    powders, detergent, hair restorer, striped toothpaste,
                    aftershave lotion, beforshave lotion, slimming diets,
                    fattening diets, deodorants, fizzy water, cigarettes,
                    roll–ons, pull–ons and slip–ons. By far the greatest time
                    and effort of those working in the advertising industry are
                    wasted on these trivial purposes, which contribute little or
                    nothing to our national prosperity. In common with an
                    increasing number of the general public, we have reached a
                    saturation opine at which the high pitched scream of
                    consumer selling is no more than sheer noise. We think that
                    there are other things more worth using our skill and
                    experience on. There are signs for streets and buildings,
                    books and periodicals, catalogues, instructional manuals,
                    industrial photography, educational aids, films, television
                    features, scientific and industrial publications and all the
                    other media through which we promote our trade, our
                    education, our culture and our greater awareness of the
                    owls. We do not advocate the abolition of high pressure
                    consumer advertising: this is not feasible. Nor do we want
                    to take any of the fun out of life. But we are proposing a
                    reversal of priorities in favor of the more useful and more
                    lasting forms of communication. We hope that our society
                    will tire of gimmick merchants, status salesmen and hidden
                    persuaders, and that the prior call on our skills will be
                    for worthwhile purposes. With this in mind, we propose to
                    share our experience and opinions, and to make them
                    available to colleagues, students and others who may be
                    interested. Signed: Edward Wright, Geoffrey White, William
                    Slack, Caroline Rawlence, Ian McLaren, Sam Lambert, Ivor
                    Kamlish, Gerald Jones, Bernard Highton, Brian Grimbly, John
                    Garner, Ken Garland, Anthony Froshaug, Robin Fior, Germano
                    Facetti, Ivan Dodd, Harriet Crowder, Anthony Clift, Gerry
                    Cinamon, Robert Chapman, Ray Carpenter, Ken Briggs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="buttons">
            <FormattedMessage
              id="SpecimenView.downloadActionBottom"
              defaultMessage="Download"
              description="SpecimenView - Download action Bottom"
            >
              {text => (
                <Button
                  className="button-download"
                  onClick={() => {
                    this.props.goToCheckout(this.state.fontName);
                  }}
                  mode="full"
                  label={text}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fontName:
    state.font.currentPreset.variant.family.name +
    state.font.currentPreset.variant.name,
  step: state.font.step,
  email: state.user.email,
  need: state.font.need,
  word: state.user.chosenWord,
  projectName: state.user.projectName,
  isAuthenticated: typeof state.user.graphqlID === "string"
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      storeProject,
      goToCheckout: fontName => push({ pathname: "/checkout", fontName }),
      authenticate: (callback, fontName) =>
        push({
          pathname: "/auth",
          authData: { callback, fontName, type: "saveFont" }
        })
    },
    dispatch
  );

SpecimenView.propTypes = {
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
  projectName: PropTypes.string,
  goToCheckout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired
};

SpecimenView.defaultProps = {
  fontName: "ptypo",
  email: "",
  projectName: ""
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SpecimenView)
);
