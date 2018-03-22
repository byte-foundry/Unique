// @flow
import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import TwitterLogin from "react-twitter-auth";
import GoogleLogin from "react-google-login";
import Button from "../../components/button/";
import {
  TWITTER_REQUEST_TOKEN_URL,
  GOOGLE_CLIENT_ID,
  FACEBOOK_APP_ID
} from "../../data/constants";
import {
  loginWithGoogle,
  loginWithFacebook,
  loginWithTwitter,
  loginWithEmail,
  signupWithEmail
} from "../../data/user/";
import { ReactComponent as Logo } from "../app/logo.svg";
import { ReactComponent as Eye } from "./eye.svg";
import { ReactComponent as Close } from "./close.svg";
import "./Authenticate.css";

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: false,
      errors: {
        email: false,
        password: false,
        firstName: false,
        lastName: false
      },
      errorMessages: {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      },
      formValues: {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      },
      shouldShowPassword: false
    };
    this.renderSignIn = this.renderSignIn.bind(this);
    this.renderSignUp = this.renderSignUp.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.showPassword = this.showPassword.bind(this);
    this.hidePassword = this.hidePassword.bind(this);
    this.loginEmailUser = this.loginEmailUser.bind(this);
    this.signupEmailUser = this.signupEmailUser.bind(this);
  }
  loginEmailUser() {
    this.props.loginWithEmail(
      this.state.formValues.email,
      this.state.formValues.password
    );
  }
  signupEmailUser() {
    this.props.signupWithEmail(
      this.state.formValues.email,
      this.state.formValues.password,
      this.state.formValues.firstName,
      this.state.formValues.lastName
    );
  }
  showPassword() {
    if (!this.state.shouldShowPassword)
      this.setState({ shouldShowPassword: true });
  }
  hidePassword() {
    if (this.state.shouldShowPassword)
      this.setState({ shouldShowPassword: false });
  }
  renderSignIn() {
    return (
      <div className="signin">
        <div className="row">
          <div className="col-lg-12">
            <p>
              <FormattedMessage
                id="Auth.SignUpEmailLabel"
                defaultMessage="Email"
                description="Sign up form email label"
              />
            </p>
            <input
              key="signinEmail"
              placeholder="john.doe@example.com"
              type="email"
              className={this.state.errors.email ? "isError" : ""}
              value={this.state.formValues.email}
              onChange={e => {
                this.setState({
                  formValues: {
                    ...this.state.formValues,
                    email: e.target.value
                  }
                });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p>
              <FormattedMessage
                id="Auth.SignUpPasswordLabel"
                defaultMessage="Password"
                description="Sign up form password label"
              />
            </p>
            <input
              placeholder="xxxxxxx"
              key="signinPassword"
              type={this.state.shouldShowPassword ? "text" : "password"}
              className={this.state.errors.password ? "isError" : ""}
              value={this.state.formValues.password}
              onChange={e => {
                this.setState({
                  formValues: {
                    ...this.state.formValues,
                    password: e.target.value
                  }
                });
              }}
            />
            <Eye
              className="eyeIcon"
              onMouseDown={this.showPassword}
              onMouseUp={this.hidePassword}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 clearfix">
            <FormattedMessage
              id="Auth.LogInFormButton"
              defaultMessage="Log in"
              description="Login page log in form button"
            >
              {text => (
                <Button
                  mode="full"
                  label={text}
                  onClick={() => {
                    this.loginEmailUser();
                  }}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
      </div>
    );
  }
  renderSignUp() {
    return (
      <div className="signup">
        <div className="row">
          <div className="col-lg-6">
            <p>
              <FormattedMessage
                id="Auth.SignUpFirstNameLabel"
                defaultMessage="First name"
                description="Sign up form first name label"
              />
            </p>
            <input
              key="signupFirstName"
              type="text"
              placeholder="John"
              className={this.state.errors.firstName ? "isError" : ""}
              value={this.state.formValues.firstName}
              onChange={e => {
                this.setState({
                  formValues: {
                    ...this.state.formValues,
                    firstName: e.target.value
                  }
                });
              }}
            />
          </div>
          <div className="col-lg-6">
            <p>
              <FormattedMessage
                id="Auth.SignUpLastNameLabel"
                defaultMessage="Last name"
                description="Sign up form last name label"
              />
            </p>
            <input
              key="signupLastName"
              type="text"
              placeholder="Doe"
              className={this.state.errors.lastName ? "isError" : ""}
              value={this.state.formValues.lastName}
              onChange={e => {
                this.setState({
                  formValues: {
                    ...this.state.formValues,
                    lastName: e.target.value
                  }
                });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p>
              <FormattedMessage
                id="Auth.SignUpEmailLabel"
                defaultMessage="Email"
                description="Sign up form email label"
              />
            </p>
            <input
              key="signupEmail"
              placeholder="john.doe@example.com"
              type="email"
              className={this.state.errors.email ? "isError" : ""}
              value={this.state.formValues.email}
              onChange={e => {
                this.setState({
                  formValues: {
                    ...this.state.formValues,
                    email: e.target.value
                  }
                });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <p>
              <FormattedMessage
                id="Auth.SignUpPasswordLabel"
                defaultMessage="Password"
                description="Sign up form password label"
              />
            </p>
            <input
              key="signupPassword"
              placeholder="xxxxxxx"
              type={this.state.shouldShowPassword ? "text" : "password"}
              className={this.state.errors.password ? "isError" : ""}
              value={this.state.formValues.password}
              onChange={e => {
                this.setState({
                  formValues: {
                    ...this.state.formValues,
                    password: e.target.value
                  }
                });
              }}
            />
            <Eye
              className="eyeIcon"
              onMouseDown={this.showPassword}
              onMouseUp={this.hidePassword}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 clearfix">
            <FormattedMessage
              id="Auth.SignUpFormButton"
              defaultMessage="Sign up"
              description="Login page sign up form button"
            >
              {text => (
                <Button
                  mode="full"
                  label={text}
                  onClick={() => {
                    this.signupEmailUser();
                  }}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
      </div>
    );
  }
  renderHeader() {
    switch (this.props.headerMode) {
      default:
        if (this.state.isSignIn) {
          return (
            <div className="header">
              <h2>
                <FormattedMessage
                  id="Auth.SignInHeader"
                  defaultMessage="Welcome back"
                  description="Sign in header message"
                />
              </h2>
              {this.props.hasBoughtFont && (
                <p>
                  <FormattedMessage
                    id="Auth.HasBoughtFontMessage"
                    defaultMessage="Congratulations for creating your font .... - Log in or create an account to save your font ---- You will recieve an email with all the details... ---"
                    description="Sign in header message if the user has bought a font"
                  />
                </p>
              )}
            </div>
          );
        } else {
          return (
            <div className="header">
              <h2>
                <FormattedMessage
                  id="Auth.SignUpHeader"
                  defaultMessage="Nice to meet you"
                  description="Sign up header message"
                />
              </h2>
              {this.props.hasBoughtFont && (
                <p>
                  <FormattedMessage
                    id="Auth.HasBoughtFontMessage"
                    defaultMessage="Congratulations for creating your font .... - Log in or create an account to save your font ---- You will recieve an email with all the details... ---"
                    description="Sign in header message if the user has bought a font"
                  />
                </p>
              )}
            </div>
          );
        }
        break;
    }
  }
  render() {
    return (
      <div className="Authenticate">
        <div className="container">
          <Close
            className="closeIcon"
            onClick={() => {
              this.props.goToHome();
            }}
          />
          <div className="row">
            <div className="col-lg-6 left">
              <Logo />
            </div>
            <div className="col-lg-6 right">
              {this.renderHeader()}
              {this.state.isSignIn ? this.renderSignIn() : this.renderSignUp()}
              <div className="auth-alternative">
                <FormattedMessage
                  id="Auth.SocialMessage"
                  defaultMessage="Or sign up with"
                  description="Login page social auth CTA message"
                />
              </div>
              <div className="social-buttons">
                <FacebookLogin
                  appId={FACEBOOK_APP_ID}
                  autoLoad={false}
                  fields="name,email"
                  callback={this.props.loginWithFacebook}
                  render={renderProps => (
                    <Button
                      label="Facebook"
                      mode="social-facebook"
                      onClick={renderProps.onClick}
                    />
                  )}
                />
                <TwitterLogin
                  callback={this.props.loginWithTwitter}
                  requestTokenUrl={TWITTER_REQUEST_TOKEN_URL}
                  render={renderProps => (
                    <Button
                      label="Twitter"
                      mode="social-twitter"
                      onClick={renderProps.onClick}
                    />
                  )}
                />
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={this.props.loginWithGoogle}
                  onFailure={this.props.loginWithGoogle}
                  render={renderProps => (
                    <Button
                      label="Google"
                      mode="social-google"
                      onClick={renderProps.onClick}
                    />
                  )}
                />
              </div>
              <div className="mode-switch">
                {this.state.isSignIn ? (
                  <p>
                    <FormattedMessage
                      id="Auth.SignUpCTA"
                      defaultMessage="New here ?"
                      description="Login page sign up CTA"
                    />

                    <FormattedMessage
                      id="Auth.SignUpButton"
                      defaultMessage="Create an account"
                      description="Login page sign up switch button"
                    >
                      {text => (
                        <Button
                          label={text}
                          mode="text"
                          onClick={() => {
                            this.setState({ isSignIn: false });
                          }}
                        />
                      )}
                    </FormattedMessage>
                  </p>
                ) : (
                  <p>
                    <FormattedMessage
                      id="Auth.SignInCTA"
                      defaultMessage="Already have an account ?"
                      description="Login page sign in CTA"
                    />

                    <FormattedMessage
                      id="Auth.SignInButton"
                      defaultMessage="Login"
                      description="Login page sign in switch button"
                    >
                      {text => (
                        <Button
                          label={text}
                          mode="text"
                          onClick={() => {
                            this.setState({ isSignIn: true });
                          }}
                        />
                      )}
                    </FormattedMessage>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToHome: () => push("/"),
      loginWithGoogle,
      loginWithFacebook,
      loginWithTwitter,
      loginWithEmail,
      signupWithEmail
    },
    dispatch
  );

Authenticate.propTypes = {
  hasBoughtFont: PropTypes.bool,
  goToHome: PropTypes.func.isRequired,
  loginWithGoogle: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  loginWithTwitter: PropTypes.func.isRequired,
  loginWithEmail: PropTypes.func.isRequired,
  signupWithEmail: PropTypes.func.isRequired
};

Authenticate.defaultProps = {
  hasBoughtFont: false
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Authenticate)
);
