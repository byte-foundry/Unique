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
import { createPrototypoFactory } from '../../data/createdFonts';
import { importPresets, reloadPresets } from '../../data/presets';
import { reloadFonts } from '../../data/font';
import {
  logout,
  switchBlackOnWhite,
  switchGlyphMode,
  changeFontSize,
} from '../../data/user';
import { setLocale, toggleTooltips, getCurrencyRates, setErrorPresets, setFetchingPresets } from '../../data/ui';
import { GRAPHQL_API } from '../../data/constants';
import { getAllPresets } from '../../data/queries';
import './bootstrap-reboot.css';
import './bootstrap-grid.css';
import './App.css';
import { ReactComponent as Logo } from './logo.svg';

import ProtectedRoute from '../../components/protectedRoute/';
import Footer from '../../components/footer/';
import Banner from '../../components/banner/';

import DefineNeed from '../defineNeed/';
import TemplateChoice from '../templateChoice/';
import SpecimenView from '../specimenView/';
import Checkout from '../checkout/';
import WelcomeBack from '../welcomeBack/';
import Library from '../library/';
import StepView from '../stepView/';
import Sidebar from '../sidebar/';
import Authenticate from '../authenticate/';
import Page404 from '../404/';

let interval;

class App extends React.Component {
  /* global Intercom */
  constructor(props) {
    super(props);
    props.setFetchingPresets(true);
    request(GRAPHQL_API, getAllPresets)
      .then((data) => {
        props.setFetchingPresets(false);
        props.importPresets(data.getAllUniquePresets.presets);
      })
      .catch((error) => {
        props.setErrorPresets(true);
        props.setFetchingPresets(false);
      });
    if (props.userEmail !== '') {
      Intercom('update', { email: props.userEmail });
    }
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.shortcutManager = new ShortcutManager(keymap);
    console.log(props);
    if (!props.isPrototypoLoaded && !props.isPrototypoLoading) {
      props.createPrototypoFactory();
    }
    props.getCurrencyRates();
    this.state = {
      isLanguageMenuOpen: false,
    };
  }
  getChildContext() {
    return { shortcuts: this.shortcutManager };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.shouldLogout) this.props.logout();
    if (newProps.pathname !== '/app/customize' && !newProps.isBlackOnWhite) {
      newProps.switchBlackOnWhite();
    }
  }
  hasSelectedFont() {
    if (
      this.props.selectedFont !== '' &&
      (this.props.pathname === '/app/customize' ||
        this.props.pathname === '/app/specimen') &&
      !(typeof this.props.selectedFontLoaded === 'object')
    ) {
      console.log('Selected font but font not loaded');
      return true;
    }
    return this.props.selectedFont !== '';
  }
  hasSuccessfulPayment() {
    if (
      this.props.hasPayed === true &&
      !(typeof this.props.selectedFontLoaded === 'object')
    ) {
      console.log('Payment successful but font not loaded');
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
      return true;
    }
    console.log(`Mail registered: ${this.props.userEmail !== ''}`);
    return this.props.userEmail !== '';
  }
  isLoggedIn() {
    return this.props.userId !== '';
  }
  handleAuthentication(nextState, replace) {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.auth.handleAuthentication();
    }
  }
  hasSelectedNeed() {
    console.log('=========HAS SELECTED NEED ============');
    console.log(this.props.hasPresetsLoaded);
    console.log(this.props.need);
    console.log(this.props.pathname);
    console.log('========================================');
    if (
      this.props.need !== '' &&
      this.props.pathname === '/app/select' &&
      !this.props.hasPresetsLoaded
    ) {
      console.log('Has selected need but do not have presets loaded');
      this.props.reloadPresets();
      return true;
    }
    console.log(`Need selected: ${this.props.need !== ''}`);
    return this.props.need !== '';
  }
  render() {
    console.log(this.props.location.pathname);
    return (
      <main className={`App ${this.props.isLoading ? 'loading' : 'loaded'}`}>
        <Banner />
        {this.props.location.pathname !== '/app/auth' && (
          <header className="App-header">
            <h1 className="App-logo-wrapper">
              <Logo
                onClick={() => {
                  this.props.location.pathname === '/app'
                    ? this.props.goToLanding()
                    : this.props.goToHome();
                }}
              />
            </h1>
          </header>
        )}
        <div
          className={`App-content container-fluid ${
            this.props.isBlackOnWhite ? '' : 'whiteOnBlack'
          }`}
        >
          <div
            className={`row logo-mobile ${
              this.props.location.pathname === '/app/auth' ? 'auth' : ''
            }`}
          >
            <div className="col-sm-12">
              <Logo
                onClick={() => {
                  this.props.location.pathname === '/app'
                    ? this.props.goToLanding()
                    : this.props.goToHome();
                }}
              />
            </div>
          </div>
          <div className="row content-wrapper">
            <div className="left col-sm-12">
              <Switch>
                <Route
                  exact
                  path="/app"
                  render={props => <DefineNeed auth={this.auth} {...props} />}
                />
                <Route exact path="/app/restart" component={WelcomeBack} />
                <ProtectedRoute
                  requirement={() => this.hasSelectedNeed()}
                  path="/app/select"
                  component={TemplateChoice}
                />
                <ProtectedRoute
                  requirement={() => this.props.isAuthenticated}
                  path="/app/library"
                  component={Library}
                />
                <ProtectedRoute
                  requirement={() => this.hasSelectedFont()}
                  path="/app/customize"
                  component={props => <StepView {...props} />}
                />
                <ProtectedRoute
                  requirement={() => this.hasSelectedFont()}
                  path="/app/specimen"
                  component={props => (
                    <SpecimenView auth={this.auth} {...props} />
                  )}
                />
                <ProtectedRoute
                  requirement={() => this.hasSelectedFont()}
                  path="/app/checkout"
                  component={Checkout}
                />
                <ProtectedRoute
                  requirement={() => true}
                  path="/app/auth"
                  component={Authenticate}
                />
                <Route component={Page404} />
              </Switch>
              {this.props.location.pathname !== '/app/auth' && (
                <div
                  className={`right col-sm-${
                    this.props.location.pathname !== '/app/checkout'
                      ? '2'
                      : '12 col-md-12'
                  } col-lg-2 ${
                    this.props.isBlackOnWhite ||
                    this.props.location.pathname !== '/app/customize'
                      ? ''
                      : 'whiteOnBlack'
                  }`}
                >
                  <Sidebar
                    pathName={this.props.location.pathname}
                    isAuthenticated={this.props.isAuthenticated}
                    mode={
                      this.props.location.pathname === '/app/checkout'
                        ? 'checkout'
                        : 'default'
                    }
                    {...this.props}
                  />
                </div>
              )}
            </div>
          </div>
          <Footer
            fontSize={this.props.fontSize}
            pathname={this.props.location.pathname}
            shouldShowTooltips={this.props.shouldShowTooltips}
            toggleTooltips={this.props.toggleTooltips}
            isBlackOnWhite={this.props.isBlackOnWhite}
            switchBlackOnWhite={this.props.switchBlackOnWhite}
            switchGlyphMode={this.props.switchGlyphMode}
            changeFontSize={this.props.changeFontSize}
            setLocale={this.props.setLocale}
            locale={this.props.locale}
            isGlyphMode={this.props.isGlyphMode}
          />
        </div>
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
  userId: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  getCurrencyRates: PropTypes.func.isRequired,
  switchBlackOnWhite: PropTypes.func.isRequired,
  switchGlyphMode: PropTypes.func.isRequired,
  changeFontSize: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  setErrorPresets: PropTypes.func.isRequired,
  setFetchingPresets: PropTypes.func.isRequired,
  isGlyphMode: PropTypes.bool.isRequired,
};

App.defaultProps = {
  selectedFont: '',
  selectedFontLoaded: undefined,
  userEmail: '',
  hasPresetsLoaded: false,
  isAuthenticated: false,
  locale: 'en',
  userId: '',
};

App.childContextTypes = {
  shortcuts: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  pathname: state.routing.location.pathname,
  selectedFont:
    state.font.currentPreset.variant &&
    state.font.currentPreset.variant.family.name,
  selectedFontLoaded: state.createdFonts.fonts[state.font.fontName],
  userEmail: state.user.email,
  hasPayed: state.user.hasPayed,
  need: state.font.need,
  hasPresetsLoaded:
    state.createdFonts.fonts[state.presets.loadedPresetsName[0]],
  isLoading: state.ui.unstable || state.createdFonts.isPrototypoLoading,
  shouldLogout: state.user.shouldLogout,
  isPrototypoLoaded: state.createdFonts.isPrototypoLoaded,
  isAuthenticated: typeof state.user.graphqlID === 'string' && !state.user.anonymous,
  isPrototypoLoading: state.createdFonts.isPrototypoLoading,
  isBlackOnWhite: state.user.isBlackOnWhite,
  shouldShowTooltips: state.ui.shouldShowTooltips,
  userId: state.user.graphqlID,
  locale: state.ui.locale,
  fontSize: state.user.fontSize,
  isGlyphMode: state.user.isGlyphMode,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      importPresets,
      reloadPresets,
      reloadFonts,
      setLocale,
      goToHome: () => push('/app'),
      goToLanding: () => push('/'),
      createPrototypoFactory,
      toggleTooltips,
      logout,
      getCurrencyRates,
      switchBlackOnWhite,
      switchGlyphMode,
      changeFontSize,
      setErrorPresets,
      setFetchingPresets,
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
