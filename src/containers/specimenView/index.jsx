// @flow
import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-responsive-modal";
import { push } from "react-router-redux";
import { FormattedMessage } from "react-intl";
import "./SpecimenView.css";
import Button from "../../components/button/";
import { storeProject } from "../../data/user";
import { ReactComponent as Back } from "../stepView/back.svg";

class SpecimenView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontName: props.projectName,
      isInputFocused: false,
      isModalOpened: false
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
    const uppercase = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ];
    const lowercase = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
    const symbols = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "&",
      "@",
      ".",
      ",",
      "?",
      "!",
      "“",
      "”",
      "(",
      ")",
      "<",
      ">",
      "°",
      "+",
      "-",
      "$"
    ];
    return (
      <div
        className="SpecimenView"
        ref={c => {
          this.specimenViewWrapper = c;
        }}
        tabIndex="-1"
      >
        <div className="container">
          <Modal
            open={this.state.isModalOpened}
            showCloseIcon={false}
            closeOnOverlayClick={false}
            closeOnEsc={false}
            little
            classNames={{
              modal: 'modal',
              overlay: 'overlay'
            }}
          >
            <h2>
              <FormattedMessage
                id="SpecimenView.modalTitle"
                defaultMessage="One more thing,"
                description="Speciem view name font modal title"
              />
            </h2>
            <p>
              <FormattedMessage
                id="SpecimenView.modalTitle"
                defaultMessage="A unique font deserves a unique name. What would be the name of your font?"
                description="Speciem view name font modal description"
              />
            </p>
            <p>
              <FormattedMessage
                id="SpecimenView.nameAction"
                defaultMessage="My font name"
                description="SpecimenView - name action"
              >
                {text => (
                  <input
                    type="text"
                    value={this.state.fontName}
                    onChange={e => {
                      this.setState({ fontName: e.target.value });
                    }}
                    placeholder={text}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                  />
                )}
              </FormattedMessage>
            </p>
            <FormattedMessage
              id="SpecimenView.closeModalAction"
              defaultMessage="Done"
              description="SpecimenView - Close modal action"
            >
              {text => (
                <Button
                  className="button-closeModal"
                  onClick={() => {
                    if (this.state.fromModal === "save") {
                      if (this.props.isAuthenticated) {
                        this.props.storeProject(this.state.fontName);
                      } else {
                        this.props.authenticate(
                          this.props.storeProject,
                          this.state.fontName
                        );
                      }
                    } else {
                      this.props.goToCheckout(this.state.fontName);
                    }

                    this.setState({ isModalOpened: false });
                  }}
                  mode="full"
                  label={text}
                />
              )}
            </FormattedMessage>
          </Modal>
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
                defaultMessage="Embark on new adventures with your complete glyph set!"
                description="Speciem view subtitle"
              />
            </p>
            <p className="subtitle-two">
              <FormattedMessage
                id="SpecimenView.subtitleBack"
                defaultMessage="Not quite right? Just click trough the menu to edit"
                description="Speciem view back subtitle"
              />
            </p>
            <div className="buttons">
              <Back
                className="icon-back"
                onClick={() => {
                  this.props.goBack();
                }}
              />
              <FormattedMessage
                id="SpecimenView.downloadAction"
                defaultMessage="Download"
                description="SpecimenView - Download action"
              >
                {text => (
                  <Button
                    className="button-download"
                    onClick={() => {
                      if (this.state.fontName) {
                        this.props.goToCheckout(this.state.fontName);
                      } else {
                        this.setState({
                          isModalOpened: true,
                          fromModal: "checkout"
                        });
                      }
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
                      if (this.state.fontName) {
                        if (this.props.isAuthenticated) {
                          this.props.storeProject(this.state.fontName);
                        } else {
                          this.props.authenticate(
                            this.props.storeProject,
                            this.state.fontName
                          );
                        }
                      } else {
                        this.setState({
                          isModalOpened: true,
                          fromModal: "save"
                        });
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
                  id="SpecimenView.text"
                  defaultMessage="Text"
                  description="Speciem view text"
                />
              </h3>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <p className="text text-extrabig">
                    Sphinx of black quartz judge my vow.
                  </p>
                  <p className="text-label">52px</p>
                </div>
                <div className="col-md-8 col-sm-12">
                  <p className="text text-big">
                    How razorback-jumping frogs can level six piqued gymnasts.
                    Sphinx of black quartz judge my vow. Crazy Fredrick bought
                    many very exquisite opal jewels. Quick blowing zephyrs vex
                    daft Jim.
                  </p>
                  <p className="text-label">34px</p>
                </div>
                <div className="col-md-4 col-sm-12">
                  <p className="text text-medium">
                    How razorback-jumping frogs can level six piqued gymnasts.
                    Sphinx of black quartz judge my vow. Crazy Fredrick bought
                    many very exquisite opal jewels. Quick blowing zephyrs vex
                    daft Jim.
                  </p>
                  <p className="text-label">22px</p>
                </div>
                <div className="col-md-8 col-sm-12">
                  <p className="text text-small">
                    How razorback-jumping frogs can level six piqued gymnasts.
                    Sphinx of black quartz judge my vow. Crazy Fredrick bought
                    many very exquisite opal jewels. Quick blowing zephyrs vex
                    daft Jim. How quickly daft jumping zebras vex. Quick fox
                    jumps nightly above wizard. Lovak won the squad prize cup
                    for sixty big jumps. The quick brown fox jumps over a lazy
                    dog. Quest judge wizard bonks foxy chimp love.
                  </p>
                  <p className="text-label">16px</p>
                </div>
                <div className="col-md-4 col-sm-12">
                  <p className="text text-smallest">
                    How razorback-jumping frogs can level six piqued gymnasts.
                    Sphinx of black quartz judge my vow. Crazy Fredrick bought
                    many very exquisite opal jewels. Quick blowing zephyrs vex
                    daft Jim. How quickly daft jumping zebras vex. Quick fox
                    jumps nightly above wizard. Lovak won the squad prize cup
                    for sixty big jumps.
                  </p>
                  <p className="text-label">12px</p>
                </div>
              </div>
              <h3>
                <FormattedMessage
                  id="SpecimenView.characters"
                  defaultMessage="Characters"
                  description="Specimen view characters"
                />
              </h3>
              <div className="characters">
                <div className="set">
                  <div className="sub-set-characters-wrap">
                    <div className="sub-set-characters">
                      {uppercase.map(glyph => (
                        <div className="sub-set-character">
                          <div className="glyph-small">{glyph}</div>
                          <div className="glyph-big">{glyph}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="set">
                  <div className="sub-set-characters-wrap">
                    <div className="sub-set-characters">
                      {lowercase.map(glyph => (
                        <div className="sub-set-character">
                          <div className="glyph-small">{glyph}</div>
                          <div className="glyph-big">{glyph}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="set">
                  <div className="sub-set-characters-wrap">
                    <div className="sub-set-characters">
                      {symbols.map(glyph => (
                        <div className="sub-set-character">
                          <div className="glyph-small">{glyph}</div>
                          <div className="glyph-big">{glyph}</div>
                        </div>
                      ))}
                    </div>
                  </div>
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
      goToCheckout: fontName => push({ pathname: "/app/checkout", fontName }),
      goBack: fontName => push("/app/customize"),
      authenticate: (callback, fontName) =>
        push({
          pathname: "/app/auth",
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
