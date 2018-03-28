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

import messages_en from "./data/intl/locale_en";
import messages_fr from "./data/intl/locale_fr";
import store, { history } from "./data/create-store";
import Landing from "./containers/landing/";
import App from "./containers/app/";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

addLocaleData([...locale_en, ...locale_fr]);

const messages = {
  fr: messages_fr,
  en: messages_en
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
