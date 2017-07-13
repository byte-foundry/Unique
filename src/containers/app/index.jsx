// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Ptypo, { templateNames } from 'prototypo-library';
import './App.css';

import TemplateChoice from '../templateChoice/';
import ParamChoice from '../paramChoice/';
import FinalView from '../finalView/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.prototypoFontFactory = new Ptypo();
    this.createFont = (name) => {
      this.prototypoFontFactory
        .createFont('peasy', templateNames[name])
        .then(font => this.setState({ font, values: { ...font.values } }));
    };
    this.resetValues = () => this.state.font.changeParams(this.state.values, 30, 0.02);
    this.changeParams = (choices, saveChanges = true) => {
      const newParams = {};
      choices.forEach((param) => {
        newParams[param.param] = param.value;
      });
      this.state.font.changeParams(newParams, 30, 0.02);
      if (saveChanges) {
        this.setState({ values: { ...this.state.font.values } });
      }
    };
  }
  render() {
    return (
      <main className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={props => <TemplateChoice {...props} createFont={this.createFont} />}
          />
          <Route
            path="/template/:template/:step"
            render={() =>
              <ParamChoice changeParams={this.changeParams} resetValues={this.resetValues} />}
          />
          <Route exact path="/final/:template/:step" component={FinalView} />
        </Switch>
      </main>
    );
  }
}

export default App;
