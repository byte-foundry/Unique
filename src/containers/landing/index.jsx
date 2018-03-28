// @flow
import React from "react";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ReactComponent as Logo } from "../app/logo.svg";
import { ReactComponent as ProfileIcon } from "../sidebar/profile.svg";

import Button from "../../components/button";

import "./Landing.css";
class Landing extends React.Component {
  constructor(props) {
    super(props);
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
                <div className="float-md-left">
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
                <div className="float-md-right">
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
                      <Button mode="full" label={text} onClick={() => {}} />
                    )}
                  </FormattedMessage>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description">a</div>
        <div className="featureList">a</div>
        <div className="howItWorks">a</div>
        <div className="prototypo">a</div>
        <div className="footer">
          <div className="container">
            <FormattedMessage
              id="Landing.footerCopyright"
              defaultMessage="Unique © Powered by Prototypo"
              description="Unique copyright footer"
            />
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {};

export default withRouter(Landing);
