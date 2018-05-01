// @flow
import React from "react";
import PropTypes from "prop-types";

import "./LanguageSelect.css";

const supportedLanguages = {
  fr: "Français",
  en: "English",
  it: "Italiano",
  de: "Deutsch",
  pt: "Português",
  es: "Español"
};

class LanguageSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLanguageMenuOpen: false
    };
  }
  render() {
    return (
      <div className="LanguageSelect">
        <div
          className="language-active"
          style={{
            backgroundColor:
              this.props.pathname === "/app/auth" ||
              this.props.pathname === "/" ||
              this.props.pathname === "/faq" ||
              this.props.pathname === "/tos" ||
              (!this.props.isBlackOnWhite &&
                this.props.pathname === "/app/customize")
                ? "black"
                : "white"
          }}
          onClick={() => {
            this.setState({
              isLanguageMenuOpen: !this.state.isLanguageMenuOpen
            });
          }}
        >
          <div
            className={`language-select ${
              this.state.isLanguageMenuOpen ? "opened" : ""
            }`}
          >
            {Object.keys(supportedLanguages).map(
              key =>
                key !== this.props.locale ? (
                  <p
                    style={{
                      backgroundColor:
                        this.props.pathname === "/app/auth" ||
                        this.props.pathname === "/" ||
                        (!this.props.isBlackOnWhite &&
                          this.props.pathname === "/app/customize")
                          ? "white"
                          : "black",
                      color:
                        this.props.pathname === "/app/auth" ||
                        this.props.pathname === "/" ||
                        (!this.props.isBlackOnWhite &&
                          this.props.pathname === "/app/customize")
                          ? "black"
                          : "white"
                    }}
                    key={`language${key}`}
                    onClick={() => {
                      this.props.setLocale(key);
                      this.setState({
                        isLanguageMenuOpen: false
                      });
                    }}
                  >
                    {supportedLanguages[key]}
                  </p>
                ) : (
                  false
                )
            )}
          </div>
          {supportedLanguages[this.props.locale]
            ? supportedLanguages[this.props.locale]
            : supportedLanguages.en}
        </div>
      </div>
    );
  }
}

LanguageSelect.propTypes = {
  pathname: PropTypes.string,
  isBlackOnWhite: PropTypes.bool.isRequired,
  setLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
};

LanguageSelect.defaultProps = {
  pathname: '',
}

export default LanguageSelect;
