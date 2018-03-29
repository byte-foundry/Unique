// @flow
import React from 'react';
import PropTypes from 'prop-types';

import ShortcutsHelper from "../shortcutsHelper";
import FontControls from "../fontControls";

import './Footer.css';
const supportedLanguages = {
    fr: "Français",
    en: "English",
    it: "Italiano",
    de: "Deutsch",
    pt: "Português",
    es: "Español"
};
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLanguageMenuOpen: false,
        }
    }
    render() {
        return (
            <div className={`Footer ${this.props.isBlackOnWhite ? '' : 'whiteOnBlack'}`}>
                <div className="row">
                    <div className="col-lg-10 col-sm-12 footer-wrapper">
                        <div
                            className="language-active"
                            style={{
                                backgroundColor:
                                    this.props.pathname === "/app/auth" ||
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
                                                            (!this.props.isBlackOnWhite &&
                                                                this.props.pathname === "/app/customize")
                                                            ? "white"
                                                            : "black",
                                                    color:
                                                        this.props.pathname === "/app/auth" ||
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
    fontSize: PropTypes.number.isRequired,
};

Footer.defaultProps = {
};

export default Footer;
