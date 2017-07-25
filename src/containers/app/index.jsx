// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { importPresets } from '../../data/font';
import './App.css';

import DefineNeed from '../defineNeed/';
import TemplateChoice from '../templateChoice/';
import ParamChoice from '../paramChoice/';
import FinalView from '../finalView/';

const context = require.context('../../data/presets', true, /^(.*\.(json$))[^.]*$/igm);
const presets = {};


class App extends React.Component {
  constructor(props) {
    super(props);
    context.keys().forEach((filename) => { presets[filename] = context(filename); });
    props.importPresets(presets);
  }
  render() {
    return (
      <main className="App">
        <Switch>
          <Route exact path="/" component={DefineNeed} />
          <Route exact path="/select" component={TemplateChoice} />
          <Route exact path="/customize" component={ParamChoice} />
          <Route exact path="/final" component={FinalView} />
        </Switch>
      </main>
    );
  }
}

App.propTypes = {
  importPresets: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => bindActionCreators({ importPresets }, dispatch);
export default withRouter(connect(null, mapDispatchToProps)(App));
