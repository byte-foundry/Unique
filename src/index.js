import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { addLocaleData } from 'react-intl';

import locale_en from 'react-intl/locale-data/en';
import locale_fr from 'react-intl/locale-data/fr';
import locale_es from 'react-intl/locale-data/es';
import locale_it from 'react-intl/locale-data/it';
import locale_de from 'react-intl/locale-data/de';
import locale_pt from 'react-intl/locale-data/pt';

import messages_en from './data/intl/language_en';
import messages_fr from './data/intl/language_fr';
import messages_es from './data/intl/language_es';
import messages_de from './data/intl/language_de';
import messages_it from './data/intl/language_it';
import messages_pt from './data/intl/language_pt';
import messages_default from './data/intl/language_def';

import store, { history } from './data/create-store';
import Static from './containers/static/';
import FAQ from './containers/static/faq/';
import TOS from './containers/static/tos/';
import Landing from './containers/static/landing/';
import App from './containers/app/';
import Page404 from './containers/404/';
import './index.css';

addLocaleData([...locale_en, ...locale_fr, ...locale_de, ...locale_it, ...locale_es, ...locale_pt]);

const messages = {
  fr: messages_fr,
  en: messages_en,
  es: messages_es,
  de: messages_de,
  it: messages_it,
  pt: messages_pt,
  def: messages_def,
};

const StaticRoute = ({ component:Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    <Static>
      <Component {...props} />
    </Static>
  )} />
)


const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const Index = props => (
  <IntlProvider locale={props.locale} messages={messages[props.locale] ? messages[props.locale] : messages[def]}>
    <ConnectedRouter history={history}>
      <Switch>
        <StaticRoute exact path="/" component={Landing} />
        <StaticRoute exact path="/faq" component={FAQ} />
        <StaticRoute exact path="/tos" component={TOS} />
        <Route path="/app" component={App} />
        <Route component={Page404} />
      </Switch>
    </ConnectedRouter>
  </IntlProvider>
);
const mapStateToProps = state => ({
  locale: state.ui.locale,
});
const ConnectedIndex = connect(mapStateToProps)(Index);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedIndex />
  </Provider>,
  document.getElementById('root'),
);
// registerServiceWorker();
