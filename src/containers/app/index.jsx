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

import UnstableView from '../unstableView';

class App extends React.Component {
  constructor(props) {
    super(props);
    request(GRAPHQL_API, getAllPresets)
      .then(data => props.importPresets(data.allPresets))
      .catch(error => console.log(error));
  }
  hasSelectedFont() {
    if (
      this.props.selectedFont !== '' &&
      (this.props.pathname === '/customize' || this.props.pathname === '/specimen') &&
      !(typeof this.props.selectedFontChangeParams === typeof Function)
    ) {
      this.props.reloadFonts();
      return true;
    }
    return this.props.selectedFont !== '';
  }
  hasSuccessfulPayment() {
    if (
      this.props.hasPayed === true &&
      !(typeof this.props.selectedFontChangeParams === typeof Function)
    ) {
      this.props.reloadFonts();
      return true;
    }
    return this.props.hasPayed === true;
  }
  hasMailRegistered() {
    if (
      this.props.userEmail !== '' &&
      !(typeof this.props.selectedFontChangeParams === typeof Function)
    ) {
      this.props.reloadFonts();
      return true;
    }
    return this.props.userEmail !== '';
  }
  hasSelectedNeed() {
    if (this.props.need !== '' && this.props.pathname === '/select' && !this.props.hasPresets) {
      this.props.reloadPresets();
      return true;
    }
    return this.props.need !== '';
  }
  render() {
    return (
      <main className="App">
        {this.props.unstableUi
          ? <UnstableView />
          : <Switch>
            <Route exact path="/" component={DefineNeed} />
            <ProtectedRoute
              exact
              requirement={this.hasSelectedNeed()}
              path="/select"
              component={TemplateChoice}
            />
            <ProtectedRoute
              exact
              requirement={this.hasSelectedFont()}
              path="/customize"
              component={ParamChoice}
            />
            <ProtectedRoute
              exact
              requirement={this.hasSelectedFont()}
              path="/specimen"
              component={SpecimenView}
            />
            <ProtectedRoute
              exact
              requirement={this.hasMailRegistered()}
              path="/export"
              component={ExportTypes}
            />
            <ProtectedRoute
              exact
              requirement={this.hasSuccessfulPayment()}
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
  selectedFontChangeParams: PropTypes.func,
  hasPresets: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  need: PropTypes.string.isRequired,
  reloadPresets: PropTypes.func.isRequired,
  reloadFonts: PropTypes.func.isRequired,
  unstableUi: PropTypes.bool.isRequired,
};

App.defaultProps = {
  selectedFont: '',
  selectedFontChangeParams: undefined,
};

const mapStateToProps = state => ({
  pathname: state.routing.location.pathname,
  selectedFont: state.font.currentPreset.preset,
  selectedFontChangeParams: state.font.currentPreset.font.changeParams,
  userEmail: state.user.email,
  hasPayed: state.user.hasPayed,
  need: state.font.need,
  hasPresets: state.presets.presets.length > 1,
  unstableUi: state.ui.unstable,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ importPresets, reloadPresets, reloadFonts }, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
