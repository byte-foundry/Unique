import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import { IntlProvider } from "react-intl";
import { addLocaleData } from "react-intl";

import locale_en from "react-intl/locale-data/en";
import locale_fr from "react-intl/locale-data/fr";
import locale_es from "react-intl/locale-data/es";
import locale_it from "react-intl/locale-data/it";
import locale_de from "react-intl/locale-data/de";
import locale_pt from "react-intl/locale-data/pt";

import messages_en from "./data/intl/language_en";
import messages_fr from "./data/intl/language_fr";
import messages_es from "./data/intl/language_es";
import messages_de from "./data/intl/language_de";
import messages_it from "./data/intl/language_it";
import messages_pt from "./data/intl/language_pt";

import store, { history } from "./data/create-store";
import Landing from "./containers/landing/";
import App from "./containers/app/";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

addLocaleData([...locale_en, ...locale_fr, ...locale_de, ...locale_it, ...locale_es, ...locale_pt]);

const messages = {
  fr: messages_fr,
  en: messages_en,
  es: messages_es,
  de: messages_de,
  it: messages_it,
  pt: messages_pt,
};

const Index = props => (
  <IntlProvider locale={props.locale} messages={messages[props.locale]}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/app" component={App} />
      </Switch>
    </ConnectedRouter>
  </IntlProvider>
);
const mapStateToProps = state => ({
  locale: state.ui.locale
});
const ConnectedIndex = connect(mapStateToProps)(Index);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedIndex />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
