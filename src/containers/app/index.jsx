// @flow
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { request } from "graphql-request";
import { ShortcutManager } from "react-shortcuts";

import { IntlProvider } from "react-intl";
import { addLocaleData } from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_fr from "react-intl/locale-data/fr";

import messages_en from "../../data/intl/locale_en";
import messages_fr from "../../data/intl/locale_fr";
import keymap from "../../data/keymap";
import { createPrototypoFactory } from "../../data/createdFonts";
import { importPresets, reloadPresets } from "../../data/presets";
import { reloadFonts } from "../../data/font";
import { setLocale, toggleTooltips } from "../../data/ui";
import { GRAPHQL_API } from "../../data/constants";
import { getAllPresets } from "../../data/queries";
import Auth from "../../components/auth";
import "./bootstrap-reboot.css";
import "./bootstrap-grid.css";
import "./App.css";
import { ReactComponent as Logo } from "./logo.svg";

import ProtectedRoute from "../../components/protectedRoute/";
import ShortcutsHelper from "../../components/shortcutsHelper";

import DefineNeed from "../defineNeed/";
import TemplateChoice from "../templateChoice/";
import SpecimenView from "../specimenView/";
import Checkout from "../checkout/";
import WelcomeBack from "../welcomeBack/";
import Library from "../library/";
import StepView from "../stepView/";
import Sidebar from "../sidebar/";
import Authenticate from "../authenticate/";

addLocaleData([...locale_en, ...locale_fr]);

const messages = {
  fr: messages_fr,
  en: messages_en
};

let interval;

class App extends React.Component {
  /* global Intercom */
  constructor(props) {
    super(props);
    request(GRAPHQL_API, getAllPresets)
      .then(data => props.importPresets(data.getAllUniquePresets.presets))
      .catch(error => console.log(error));
    if (props.userEmail !== "") {
      Intercom("update", { email: props.userEmail });
    }
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.auth = new Auth();
    this.shortcutManager = new ShortcutManager(keymap);
    console.log(props);
    if (!props.isPrototypoLoaded && !props.isPrototypoLoading) {
      props.createPrototypoFactory();
    }
    this.state = {
      isLanguageMenuOpen: false
    };
  }
  getChildContext() {
    return { shortcuts: this.shortcutManager };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.shouldLogout) this.auth.logout();
  }
  hasSelectedFont() {
    console.log("=========HAS SELECTED FONT ============");
    console.log(this.props.selectedFontLoaded);
    console.log(this.props.selectedFont)
    console.log("========================================");
    if (
      this.props.selectedFont !== "" &&
      (this.props.pathname === "/customize" ||
        this.props.pathname === "/specimen") &&
      !(typeof this.props.selectedFontLoaded === "object")
    ) {
      this.props.reloadFonts();
      return true;
    }
    return this.props.selectedFont !== "";
  }
  hasSuccessfulPayment() {
    if (
      this.props.hasPayed === true &&
      !(typeof this.props.selectedFontLoaded === "object")
    ) {
      console.log("Payment successful but font not loaded");
      this.props.reloadFonts();
      return true;
    }
    console.log(`Payment: ${this.props.hasPayed === true}`);
    return this.props.hasPayed === true;
  }
  hasMailRegistered() {
    if (
      this.props.userEmail !== "" &&
      !(typeof this.props.selectedFontLoaded === "object")
    ) {
      console.log("Mail registered but font not loaded");
      this.props.reloadFonts();
      return true;
    }
    console.log(`Mail registered: ${this.props.userEmail !== ""}`);
    return this.props.userEmail !== "";
  }
  isLoggedIn() {
    return this.props.userId !== "";
  }
  handleAuthentication(nextState, replace) {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.auth.handleAuthentication();
    }
  }
  hasSelectedNeed() {
    console.log("=========HAS SELECTED NEED ============");
    console.log(this.props.hasPresetsLoaded);
    console.log(this.props.need);
    console.log(this.props.pathname);
    console.log("========================================");
    if (
      this.props.need !== "" &&
      this.props.pathname === "/select" &&
      !this.props.hasPresetsLoaded
    ) {
      console.log("Has selected need but do not have presets loaded");
      this.props.reloadPresets();
      return true;
    }
    console.log(`Need selected: ${this.props.need !== ""}`);
    return this.props.need !== "";
  }
  render() {
    const { isAuthenticated } = this.auth;
    const supportedLanguages = {
      fr: "Français",
      en: "English"
    };
    if (this.props.isLoading && this.props.location.pathname !== '/auth') {
      // load animation
      clearInterval(interval);
      const letters = document.querySelectorAll(".letter");
      let activeLetter = 0;
      interval = setInterval(function() {
        for (let i = 0; i < letters.length; i++) {
          letters[i].classList.remove("animate");
        }
        letters[activeLetter].classList.add("animate");
        activeLetter =
          activeLetter + 1 === letters.length ? 0 : activeLetter + 1;
      }, 800);
    } else {
      clearInterval(interval);
    }
    return (
      <IntlProvider
        locale={this.props.locale}
        messages={messages[this.props.locale]}
      >
        <main className={`App ${this.props.isLoading ? "loading" : "loaded"}`}>
          {this.props.location.pathname !== "/auth" && (
            <header className="App-header">
              <h1 className="App-logo-wrapper">
                <Logo
                  onClick={() => {
                    this.props.goToHome();
                  }}
                />
              </h1>
            </header>
          )}
          <div className="App-content container-fluid">
            <div className="row">
              <div
                className={`left col-sm-${
                  this.props.location.pathname !== "/auth" ? "10" : "12"
                }`}
              >
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => <DefineNeed auth={this.auth} {...props} />}
                  />
                  <Route exact path="/restart" component={WelcomeBack} />
                  <Route
                    path="/callback"
                    render={props => {
                      this.handleAuthentication(props);
                      return <div>loading</div>;
                    }}
                  />
                  <ProtectedRoute
                    exact
                    requirement={() => this.hasSelectedNeed()}
                    path="/select"
                    component={TemplateChoice}
                  />
                  <ProtectedRoute
                    exact
                    requirement={() => isAuthenticated()}
                    path="/library"
                    component={Library}
                  />
                  <ProtectedRoute
                    exact
                    requirement={() => this.hasSelectedFont()}
                    path="/customize"
                    component={props => <StepView {...props} />}
                  />
                  <ProtectedRoute
                    exact
                    requirement={() => this.hasSelectedFont()}
                    path="/specimen"
                    component={props => (
                      <SpecimenView auth={this.auth} {...props} />
                    )}
                  />
                  <ProtectedRoute
                    exact
                    requirement={() => this.hasSelectedFont()}
                    path="/checkout"
                    component={Checkout}
                  />
                  <ProtectedRoute
                    exact
                    requirement={() => true}
                    path="/auth"
                    component={Authenticate}
                  />
                </Switch>
              </div>
              {this.props.location.pathname !== "/auth" && (
                <div
                  className={`right col-sm-2 ${
                    this.props.isBlackOnWhite ||
                    this.props.location.pathname !== "/customize"
                      ? ""
                      : "whiteOnBlack"
                  }`}
                >
                  <Sidebar
                    pathName={this.props.location.pathname}
                    isAuthenticated={this.auth.isAuthenticated}
                    login={this.auth.login}
                    mode={
                      this.props.location.pathname === "/checkout"
                        ? "checkout"
                        : "default"
                    }
                    {...this.props}
                  />
                </div>
              )}
            </div>
            {this.props.location.pathname === "/customize" && (
              <ShortcutsHelper
                shouldShowTooltips={this.props.shouldShowTooltips}
                toggleTooltips={this.props.toggleTooltips}
              />
            )}
            <div className="language-select">
              <ul
                className={`language-list ${
                  this.state.isLanguageMenuOpen ? "opened" : ""
                }`}
              >
                {Object.keys(supportedLanguages).map(
                  (key, index) =>
                    key !== this.props.locale ? (
                      <li
                        onClick={() => {
                          this.props.setLocale(key);
                          this.setState({
                            isLanguageMenuOpen: false
                          });
                        }}
                      >
                        {supportedLanguages[key]}
                      </li>
                    ) : (
                      false
                    )
                )}
              </ul>
              <span
                className="language-active"
                onClick={() => {
                  this.setState({
                    isLanguageMenuOpen: !this.state.isLanguageMenuOpen
                  });
                }}
              >
                {supportedLanguages[this.props.locale]}
              </span>
            </div>
          </div>
        </main>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  importPresets: PropTypes.func.isRequired,
  selectedFont: PropTypes.string,
  userEmail: PropTypes.string,
  hasPayed: PropTypes.bool.isRequired,
  selectedFontLoaded: PropTypes.shape({
    fontName: PropTypes.string.isRequired
  }),
  hasPresetsLoaded: PropTypes.shape({
    fontName: PropTypes.string.isRequired
  }),
  pathname: PropTypes.string.isRequired,
  need: PropTypes.string.isRequired,
  reloadPresets: PropTypes.func.isRequired,
  reloadFonts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  goToHome: PropTypes.func.isRequired,
  shouldLogout: PropTypes.bool.isRequired,
  createPrototypoFactory: PropTypes.func.isRequired,
  isPrototypoLoaded: PropTypes.bool.isRequired,
  isPrototypoLoading: PropTypes.bool.isRequired,
  isBlackOnWhite: PropTypes.bool.isRequired,
  locale: PropTypes.string,
  setLocale: PropTypes.func.isRequired,
  toggleTooltips: PropTypes.func.isRequired,
  shouldShowTooltips: PropTypes.bool.isRequired,
  userId: PropTypes.string
};

App.defaultProps = {
  selectedFont: "",
  selectedFontLoaded: undefined,
  userEmail: "",
  hasPresetsLoaded: false,
  locale: "en",
  userId: ""
};

App.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  pathname: state.routing.location.pathname,
  selectedFont: state.font.currentPreset.variant.family.name,
  selectedFontLoaded: state.createdFonts.fonts[state.font.fontName],
  userEmail: state.user.email,
  hasPayed: state.user.hasPayed,
  need: state.font.need,
  hasPresetsLoaded:
    state.createdFonts.fonts[state.presets.loadedPresetsName[0]],
  isLoading: state.ui.unstable || state.createdFonts.isPrototypoLoading,
  shouldLogout: state.user.shouldLogout,
  isPrototypoLoaded: state.createdFonts.isPrototypoLoaded,
  isPrototypoLoading: state.createdFonts.isPrototypoLoading,
  isBlackOnWhite: state.user.isBlackOnWhite,
  locale: state.ui.locale,
  shouldShowTooltips: state.ui.shouldShowTooltips,
  userId: state.user.graphqlID
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      importPresets,
      reloadPresets,
      reloadFonts,
      setLocale,
      goToHome: () => push("/"),
      createPrototypoFactory,
      toggleTooltips
    },
    dispatch
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
