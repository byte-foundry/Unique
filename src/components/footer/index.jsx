// @flow
import React from "react";
import PropTypes from "prop-types";

import ShortcutsHelper from "../shortcutsHelper";
import FontControls from "../fontControls";
import LanguageSelect from "../languageSelect";

import "./Footer.css";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props);
    return (
      <div
        className={`Footer ${this.props.isBlackOnWhite ? "" : "whiteOnBlack"} ${
          this.props.pathname === "/app/auth" ? "whiteOnBlack" : ""
        }`}
      >
        <div className="row">
          <div className="col-lg-12 col-sm-12 footer-wrapper">
            <div className="container">
              <LanguageSelect
                pathname={this.props.pathName}
                isBlackOnWhite={
                  this.props.pathname === "/app/auth"
                    ? this.props.isBlackOnWhite
                    : true
                }
                setLocale={this.props.setLocale}
                locale={this.props.locale}
              />
              {this.props.pathname === "/app/customize" && (
                <ShortcutsHelper
                  shouldShowTooltips={this.props.shouldShowTooltips}
                  toggleTooltips={this.props.toggleTooltips}
                />
              )}
              {this.props.pathname === "/app/customize" && (
                <FontControls
                  shouldShowTooltips={this.props.shouldShowTooltips}
                  switchGlyphMode={this.props.switchGlyphMode}
                  switchBlackOnWhite={this.props.switchBlackOnWhite}
                  changeFontSize={this.props.changeFontSize}
                  fontSize={this.props.fontSize}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  pathname: PropTypes.string.isRequired,
  isBlackOnWhite: PropTypes.bool.isRequired,
  setLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  shouldShowTooltips: PropTypes.bool.isRequired,
  toggleTooltips: PropTypes.func.isRequired,
  switchBlackOnWhite: PropTypes.func.isRequired,
  changeFontSize: PropTypes.func.isRequired,
  switchGlyphMode: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired
};

Footer.defaultProps = {};

export default Footer;
