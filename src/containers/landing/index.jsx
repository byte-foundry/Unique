// @flow
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../app/logo.svg";
import { ReactComponent as ProfileIcon } from "../sidebar/profile.svg";

import { ReactComponent as One1 } from "./number1.svg";
import { ReactComponent as One2 } from "./number2.svg";
import { ReactComponent as One3 } from "./number3.svg";
import { ReactComponent as One4 } from "./number4.svg";
import { ReactComponent as One5 } from "./number5.svg";

import { ReactComponent as UniqueVisual } from "./unique_visual.svg";

import { ReactComponent as HowItWorks1 } from "./howitworks_1.svg";
import { ReactComponent as HowItWorks2 } from "./howitworks_2.svg";
import { ReactComponent as HowItWorks3 } from "./howitworks_3.svg";

import { createPrototypoFactory } from "../../data/createdFonts";

import Button from "../../components/button";

import "./Landing.css";
class Landing extends React.Component {
  constructor(props) {
    super(props);
    if (!props.isPrototypoLoaded && !props.isPrototypoLoading) {
      props.createPrototypoFactory();
    }
    this.state = {};
  }
  render() {
    return (
      <div className="Landing">
        <div className="header">
          <div className="logos">
            <Logo className="logo-icon" />
            <ProfileIcon className="profile-icon" />
          </div>
          <div className="container catch">
            <div className="row">
              <div className="col-sm-12 col-lg-6">
                <div className="float-left">
                  <h2>
                    <FormattedMessage
                      id="Landing.headerTitle"
                      defaultMessage="Easily get fonts that you'll never see anywhere else"
                      description="Unique header title"
                    />
                  </h2>
                </div>
              </div>
              <div className="col-sm-12 col-lg-6">
                <div className="float-right">
                  <FormattedMessage
                    id="Landing.headerInputPlaceholder"
                    defaultMessage="Type a little something"
                    description="Landing page header input placeholder"
                  >
                    {text => (
                      <input type="text" placeholder={text} name="text" />
                    )}
                  </FormattedMessage>
                  <FormattedMessage
                    id="Landing.headerInputCTA"
                    defaultMessage="Get your font"
                    description="Landing page header CTA"
                  >
                    {text => (
                      <Button
                        mode="hollow"
                        label={text}
                        onClick={() => {
                          this.props.goToApp();
                        }}
                      />
                    )}
                  </FormattedMessage>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description">
          <div className="container">
            <One1 className="one-1" />
            <div className="row">
              <div className="col-sm-12">
                <UniqueVisual className="uniqueVisual" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <h1>
                  <FormattedMessage
                    id="Landing.descriptionTitle"
                    defaultMessage="Get your custom fonts in a few steps"
                    description="Unique description title"
                  />
                </h1>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-12 col-md-6">
                <p>
                  <FormattedMessage
                    id="Landing.descriptionText"
                    defaultMessage="
                      A custom font goes a long way, giving you that special extra. 
                      With Unique you get just what you need – a custom font ready for use!

                      Simply select, customize and off you go! 
                      It’s that easy.
                      "
                    description="Unique description text"
                  />
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <FormattedMessage
                  id="Landing.descriptionCTA"
                  defaultMessage="Get your unique font"
                  description="Landing description CTA"
                >
                  {text => (
                    <Button
                      mode="full"
                      label={text}
                      onClick={() => {
                        this.props.goToApp();
                      }}
                    />
                  )}
                </FormattedMessage>
              </div>
            </div>
            <One2 className="one-2" />
          </div>
        </div>
        <div className="featureList">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <ul>
                  <li>
                    <FormattedMessage
                      id="Landing.featureListItem1"
                      defaultMessage="Save oodles of time!"
                      description="Unique feature list item 1"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      id="Landing.featureListItem2"
                      defaultMessage="Get your custom fonts in a few steps!"
                      description="Unique feature list item 2"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      id="Landing.featureListItem3"
                      defaultMessage="Get expert tips and tricks!"
                      description="Unique feature list item 3"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      id="Landing.featureListItem7"
                      defaultMessage="Unlimited usages!"
                      description="Unique feature list item 7"
                    />
                  </li>
                </ul>
              </div>
              <div className="col-sm-12 col-md-6">
                <ul>
                  <li>
                    <FormattedMessage
                      id="Landing.featureListItem4"
                      defaultMessage="Break free of marketplaces!"
                      description="Unique feature list item 4"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      id="Landing.featureListItem5"
                      defaultMessage="No more recycling fonts!"
                      description="Unique feature list item 5"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      id="Landing.featureListItem6"
                      defaultMessage="On demand - no subscription!"
                      description="Unique feature list item 6"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      id="Landing.featureListItem8"
                      defaultMessage="No royalties!"
                      description="Unique feature list item 8"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <One3 className="one-3" />
          </div>
        </div>
        <div className="howItWorks">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1>
                  <FormattedMessage
                    id="Landing.howItWorksTitle"
                    defaultMessage="How it works"
                    description="Unique how it works title"
                  />
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <p className="stepNumber">01.</p>
                <h3>
                  <FormattedMessage
                    id="Landing.howItWorksStep1Title"
                    defaultMessage="Specify your need"
                    description="Unique how it works step 1 title"
                  />
                </h3>
                <p className="stepdescription">
                  <FormattedMessage
                    id="Landing.howItWorksStep1Description"
                    defaultMessage="What are you looking for? A logo? A display? Just tell us what you need."
                    description="Unique how it works step 1 description"
                  />
                </p>
                <p>
                  <FormattedMessage
                    id="Landing.howItWorksStep1CTA"
                    defaultMessage="Get your Unique font"
                    description="Unique how it works step 1 CTA"
                  >
                    {text => (
                      <Button
                        mode="text"
                        label={text}
                        onClick={() => {
                          this.props.goToApp();
                        }}
                      />
                    )}
                  </FormattedMessage>
                </p>
              </div>
              <div className="col-sm-12 col-md-8 image-wrapper">
                <HowItWorks1 className="howItWorks-icon1" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-8 image-wrapper">
                <HowItWorks2 className="howItWorks-icon2" />
              </div>
              <div className="col-sm-12 col-md-4">
                <p className="stepNumber">02.</p>
                <h3>
                  <FormattedMessage
                    id="Landing.howItWorksStep2Title"
                    defaultMessage="Pick your choices"
                    description="Unique how it works step 2 title"
                  />
                </h3>
                <p className="stepdescription">
                  <FormattedMessage
                    id="Landing.howItWorksStep2Description"
                    defaultMessage="Select the thickness, slant, etc. for your font by clicking on your favorite choice."
                    description="Unique how it works step 2 description"
                  />
                </p>
                <p>
                  <FormattedMessage
                    id="Landing.howItWorksStep2CTA"
                    defaultMessage="Get your Unique font"
                    description="Unique how it works step 2 CTA"
                  >
                    {text => (
                      <Button
                        mode="text"
                        label={text}
                        onClick={() => {
                          this.props.goToApp();
                        }}
                      />
                    )}
                  </FormattedMessage>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <p className="stepNumber">03.</p>
                <h3>
                  <FormattedMessage
                    id="Landing.howItWorksStep3Title"
                    defaultMessage="Download your font"
                    description="Unique how it works step 3 title"
                  />
                </h3>
                <p className="stepdescription">
                  <FormattedMessage
                    id="Landing.howItWorksStep3Description"
                    defaultMessage="Love it? Download your font and use it right away!"
                    description="Unique how it works step 3 description"
                  />
                </p>
                <p>
                  <FormattedMessage
                    id="Landing.howItWorksStep3CTA"
                    defaultMessage="Get your Unique font"
                    description="Unique how it works step 3 CTA"
                  >
                    {text => (
                      <Button
                        mode="text"
                        label={text}
                        onClick={() => {
                          this.props.goToApp();
                        }}
                      />
                    )}
                  </FormattedMessage>
                </p>
              </div>
              <div className="col-sm-12 col-md-8 image-wrapper">
                <HowItWorks3 className="howItWorks-icon3" />
              </div>
            </div>
          </div>
        </div>
        <div className="prototypo">
          <div className="container">
            <One5 className="one-5" />
            <div className="row">
              <div className="col-sm-12 col-md-8" />
              <div className="col-sm-12 col-md-4">
                <h1>
                  <FormattedMessage
                    id="Landing.prototypoTitle"
                    defaultMessage="Get started"
                    description="Unique prototypo title"
                  />
                </h1>
                <p>
                  <FormattedMessage
                    id="Landing.prototypoDescription"
                    defaultMessage="Powered by Prototypo’s tech using algorithms to generate
                    fonts/ typefaces, Unique offers the largest font variation out
                    there! Open up countless possibilities with each choice you
                    make! Our passionate team of designers is constantly adding
                    new templates/ font models, multiplying the range of choices
                    available."
                    description="Unique prototypo description"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <span className="credits">
              {new Date().getFullYear()} -{" "}
              <FormattedMessage
                id="Landing.footerCopyright"
                defaultMessage="Unique © Powered by Prototypo"
                description="Unique copyright footer"
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  isPrototypoLoaded: PropTypes.bool.isRequired,
  isPrototypoLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  createPrototypoFactory: PropTypes.func.isRequired,
};

Landing.defaultProps = {
  isAuthenticated: false
};

const mapStateToProps = state => ({
  isAuthenticated: typeof state.user.graphqlID === "string",
  isPrototypoLoading: state.createdFonts.isPrototypoLoading,
  isPrototypoLoaded: state.createdFonts.isPrototypoLoaded,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToApp: () => push("/app"),
      createPrototypoFactory,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Landing)
);
