// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { request } from 'graphql-request';
import { ShortcutManager } from 'react-shortcuts';
import keymap from '../../data/keymap';
import { importPresets, reloadPresets } from '../../data/presets';
import { reloadFonts } from '../../data/font';
import { GRAPHQL_API } from '../../data/constants';
import { getAllPresets } from '../../data/queries';
import Auth from '../../components/auth';
import './bootstrap-reboot.css';
import './bootstrap-grid.css';
import './App.css';
import logo from './logo.svg';

import ProtectedRoute from '../../components/protectedRoute/';

import DefineNeed from '../defineNeed/';
import TemplateChoice from '../templateChoice/';
import ParamChoice from '../paramChoice/';
import SpecimenView from '../specimenView/';
import ExportTypes from '../exportTypes/';
import Success from '../success/';
import WelcomeBack from '../welcomeBack/';
import Library from '../library/';
import Button from '../../components/button';

import UnstableView from '../unstableView';


class App extends React.Component {
  /* global Intercom*/
  constructor(props) {
    super(props);
    request(GRAPHQL_API, getAllPresets)
      .then(data => props.importPresets(data.allPresets))
      .catch(error => console.log(error));
    if (props.userEmail !== '') {
      Intercom('update', { email: props.userEmail });
    }
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.auth = new Auth();
    this.shortcutManager = new ShortcutManager(keymap);
  }
  getChildContext() {
    return { shortcuts: this.shortcutManager };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.shouldLogout) this.auth.logout();
  }
  hasSelectedFont() {
    console.log('=========hasSelectedFont=======');
    console.log(typeof this.props.selectedFontLoaded);
    console.log(typeof this.props.selectedFontLoaded === 'object');
    console.log('====================================');
    if (
      this.props.selectedFont !== '' &&
      (this.props.pathname === '/customize' || this.props.pathname === '/specimen') &&
      !(typeof this.props.selectedFontLoaded === 'object')
    ) {
      console.log('font selected but not loaded');
      this.props.reloadFonts();
      return true;
    }
    console.log(`font selected: ${this.props.selectedFont !== ''}`);
    return this.props.selectedFont !== '';
  }
  hasSuccessfulPayment() {
    if (
      this.props.hasPayed === true &&
      !(typeof this.props.selectedFontLoaded === 'object')
    ) {
      console.log('Payment successful but font not loaded');
      this.props.reloadFonts();
      return true;
    }
    console.log(`Payment: ${this.props.hasPayed === true}`);
    return this.props.hasPayed === true;
  }
  hasMailRegistered() {
    if (
      this.props.userEmail !== '' &&
      !(typeof this.props.selectedFontLoaded === 'object')
    ) {
      console.log('Mail registered but font not loaded');
      this.props.reloadFonts();
      return true;
    }
    console.log(`Mail registered: ${this.props.userEmail !== ''}`);
    return this.props.userEmail !== '';
  }
  isLoggedIn() {
    return this.auth.isAuthenticated;
  }
  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
  handleAuthentication(nextState, replace){
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.auth.handleAuthentication();
    }
  }
  hasSelectedNeed() {
    console.log('=========HAS SELECTED NEED ============');
    console.log(this.props.hasPresetsLoaded);
    console.log(this.props.need);
    console.log(this.props.pathname);
    console.log(typeof this.props.hasPresetsLoaded === 'object');
    console.log('========================================');
    if (this.props.need !== '' && this.props.pathname === '/select' && !(typeof this.props.hasPresetsLoaded === 'object')) {
      console.log('Has selected need but do not have presets loaded');
      this.props.reloadPresets();
      return true;
    }
    console.log(`Need selected: ${this.props.need !== ''}`);
    return this.props.need !== '';
  }
  render() {
    const { isAuthenticated } = this.auth;
    return (
      <main className="App">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          onClick={() => {
            this.props.goToHome();
          }}
        />
        {
          !isAuthenticated() && (
            <div className="loginlogout">
              <Button
                className=""
                label="Log in"
                onClick={() => {
                  this.login();
                }}
              />
            </div>
          )
        }
        {
          isAuthenticated() && (
            <div className="loginlogout">
              <span
                className="goToFonts"
                onClick={() => {
                  this.props.goToLibrary();
                }}
                role="button"
                tabIndex="0"
              >
                My fonts
              </span>
              <Button
                className=""
                label="Log out"
                onClick={() => {
                  this.logout();
                }}
              />
            </div>
          )
        }
        {this.props.unstableUi
          ? <UnstableView />
          : <Switch>
            <Route exact path="/" render={props => <DefineNeed auth={this.auth} {...props} />} />
            <Route exact path="/restart" component={WelcomeBack} />
            <Route
              path="/callback"
              render={(props) => {
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
              component={ParamChoice}
            />
            <ProtectedRoute
              exact
              requirement={() => this.hasSelectedFont()}
              path="/specimen"
              component={props => <SpecimenView auth={this.auth} {...props} />}
            />
            <ProtectedRoute
              exact
              requirement={() => this.hasMailRegistered()}
              path="/export"
              component={ExportTypes}
            />
            <ProtectedRoute
              exact
              requirement={() => this.hasSuccessfulPayment()}
              path="/success"
              component={Success}
            />
          </Switch>}
      </main>
    );
  }
}

App.propTypes = {
  importPresets: PropTypes.func.isRequired,
  selectedFont: PropTypes.string,
  userEmail: PropTypes.string,
  hasPayed: PropTypes.bool.isRequired,
  selectedFontLoaded: PropTypes.shape({
    fontName: PropTypes.string.isRequired,
  }),
  hasPresetsLoaded: PropTypes.shape({
    fontName: PropTypes.string.isRequired,
  }),
  pathname: PropTypes.string.isRequired,
  need: PropTypes.string.isRequired,
  reloadPresets: PropTypes.func.isRequired,
  reloadFonts: PropTypes.func.isRequired,
  unstableUi: PropTypes.bool.isRequired,
  goToHome: PropTypes.func.isRequired,
  goToLibrary: PropTypes.func.isRequired,
  shouldLogout: PropTypes.bool.isRequired,
};

App.defaultProps = {
  selectedFont: '',
  selectedFontLoaded: undefined,
  userEmail: '',
  hasPresetsLoaded: undefined,
};

App.childContextTypes = {
  shortcuts: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  pathname: state.routing.location.pathname,
  selectedFont: state.font.currentPreset.preset,
  selectedFontLoaded: state.createdFonts.fonts[state.font.fontName],
  userEmail: state.user.email,
  hasPayed: state.user.hasPayed,
  need: state.font.need,
  hasPresetsLoaded: state.font.fontName
  ? state.createdFonts.fonts[state.font.fontName]
  : state.createdFonts.fonts[state.presets.loadedPresetsName[0]],
  unstableUi: state.ui.unstable,
  shouldLogout: state.user.shouldLogout,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    importPresets,
    reloadPresets,
    reloadFonts,
    goToHome: () => push('/'),
    goToLibrary: () => push('/library'),
  }, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
