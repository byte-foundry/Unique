// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { request } from 'graphql-request';
import { importPresets, reloadPresets } from '../../data/presets';
import { reloadFonts } from '../../data/font';
import { GRAPHQL_API } from '../../data/constants';
import { getAllPresets } from '../../data/queries';
import './App.css';

import ProtectedRoute from '../../components/protectedRoute/';

import DefineNeed from '../defineNeed/';
import TemplateChoice from '../templateChoice/';
import ParamChoice from '../paramChoice/';
import SpecimenView from '../specimenView/';
import ExportTypes from '../exportTypes/';
import Success from '../success/';
import Start from '../start/';

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
  hasSelectedNeed() {
    console.log(this.props.hasPresetsLoaded);
    console.log(this.props.need);
    console.log(this.props.pathname);
    console.log(typeof this.props.hasPresetsLoaded === 'object');
    if (this.props.need !== '' && this.props.pathname === '/select' && !(typeof this.props.hasPresetsLoaded === 'object')) {
      console.log('Has selected need but do not have presets loaded');
      this.props.reloadPresets();
      return true;
    }
    console.log(`Need selected: ${this.props.need !== ''}`);
    return this.props.need !== '';
  }
  render() {
    return (
      <main className="App">
        {this.props.unstableUi
          ? <UnstableView />
          : <Switch>
            <Route exact path="/" component={DefineNeed} />
            <Route exact path="/start" component={Start} />
            <ProtectedRoute
              exact
              requirement={() => this.hasSelectedNeed()}
              path="/select"
              component={TemplateChoice}
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
              component={SpecimenView}
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
  userEmail: PropTypes.string.isRequired,
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
};

App.defaultProps = {
  selectedFont: '',
  selectedFontLoaded: undefined,
  hasPresetsLoaded: undefined,
};

const mapStateToProps = state => ({
  pathname: state.routing.location.pathname,
  selectedFont: state.font.currentPreset.preset,
  selectedFontLoaded: state.createdFonts.fonts[state.font.fontName],
  userEmail: state.user.email,
  hasPayed: state.user.hasPayed,
  need: state.font.need,
  hasPresetsLoaded: state.createdFonts.fonts[state.presets.loadedPresetsName[0]],
  unstableUi: state.ui.unstable,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ importPresets, reloadPresets, reloadFonts }, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
