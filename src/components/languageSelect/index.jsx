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
              (key, index) =>
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
          {supportedLanguages[this.props.locale]}
        </div>
      </div>
    );
  }
}

LanguageSelect.propTypes = {
  pathname: PropTypes.string.isRequired,
  isBlackOnWhite: PropTypes.string.isRequired,
  setLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
};

export default LanguageSelect;
