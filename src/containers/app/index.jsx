// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import TemplateChoice from '../templateChoice/';
import ParamChoice from '../paramChoice/';
import FinalView from '../finalView/';

const App = () =>
  (<main className="App">
    <Switch>
      <Route exact path="/" render={props => <TemplateChoice {...props} />} />
      <Route path="/template/:template/:step" render={() => <ParamChoice />} />
      <Route exact path="/final/:template/:step" component={FinalView} />
    </Switch>
  </main>);

export default App;
