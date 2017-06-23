// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import TemplateChoice from '../templateChoice/TemplateChoice';
import ParamChoice from '../paramChoice/ParamChoice';

const App = () => (
  <main className="App">
    <Switch>
      <Route exact path="/" component={TemplateChoice} />
      <Route path="/template/:template" component={ParamChoice} />
    </Switch>
  </main>
);

export default App;
