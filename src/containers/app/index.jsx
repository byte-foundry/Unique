// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { importPresets } from '../../data/presets';
import './App.css';

import ProtectedRoute from '../../components/protectedRoute/';

import DefineNeed from '../defineNeed/';
import TemplateChoice from '../templateChoice/';
import ParamChoice from '../paramChoice/';
import SpecimenView from '../specimenView/';
import ExportTypes from '../exportTypes/';
import Success from '../success/';

const context = require.context('../../data/presets', true, /^(.*\.(json$))[^.]*$/igm);
const presets = {};

class App extends React.Component {
  constructor(props) {
    super(props);
    context.keys().forEach((filename) => { presets[filename] = context(filename); });
    props.importPresets(presets);
  }
  hasSelectedFont() {
    return this.props.selectedFont !== '';
  }
  hasSuccessfulPayment() {
    return this.props.hasPayed === true;
  }
  hasMailRegistered() {
    return this.props.userEmail !== '';
  }
  hasSelectedNeed() {
    return this.props.need !== '';
  }
  render() {
    return (
      <main className="App">
        <Switch>
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
        </Switch>
      </main>
    );
  }
}

App.propTypes = {
  importPresets: PropTypes.func.isRequired,
  selectedFont: PropTypes.string,
  userEmail: PropTypes.string.isRequired,
  hasPayed: PropTypes.bool.isRequired,
  need: PropTypes.string.isRequired,
};

App.defaultProps = {
  selectedFont: '',
};

const mapStateToProps = state => ({
  selectedFont: state.font.currentPreset.preset,
  userEmail: state.user.email,
  hasPayed: state.user.hasPayed,
  need: state.font.need,
});
const mapDispatchToProps = dispatch => bindActionCreators({ importPresets }, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
