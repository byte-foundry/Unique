import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import LanguageSelect from "../../components/languageSelect";

import { setLocale } from "../../data/ui";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./Static.css";

const Static = props => (
  <div className="Static">
    {props.children}
    
    <div className="footer">
      <div className="container">
        <div className="row block clearfix">
          <div className="pages float-left">
            <Link to="/faq">
              <FormattedMessage
                id="Landing.footerFAQ"
                defaultMessage="FAQ"
                description="Unique FAQ footer"
              />
            </Link>
            <p
              onClick={() => {
                /* global Intercom */
                window.Intercom("show");
              }}
            >
              <FormattedMessage
                id="Landing.footerSupport"
                defaultMessage="Support"
                description="Unique Support footer"
              />
            </p>
            <Link to="/tos">
              <FormattedMessage
                id="Landing.footerTOS"
                defaultMessage="Terms of use"
                description="Unique TOS footer"
              />
            </Link>
          </div>
          <div className="social float-right" />
        </div>
        <div className="row block clearfix">
          <LanguageSelect
            pathname={props.location.pathname}
            isBlackOnWhite={false}
            setLocale={props.setLocale}
            locale={props.locale}
          />
          <div className="credits float-right">
            {new Date().getFullYear()} -{" "}
            <FormattedMessage
              id="Landing.footerCopyright"
              defaultMessage="Unique © Powered by "
              description="Unique copyright footer"
            />
            <a
              title="Prototypo website"
              href="https://www.prototypo.io"
              target="_blank"
            >
              Prototypo
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
    isBlackOnWhite: state.user.isBlackOnWhite,
    locale: state.ui.locale
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        goToApp: () => push("/app"),
        setLocale,
      },
      dispatch
    );
  export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Static)
  );
  


