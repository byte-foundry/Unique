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
import { reloadFonts } from "../../data/font/";
import { ReactComponent as Logo } from "../app/logo.svg";
import { ReactComponent as Eye } from "./eye.svg";
import { ReactComponent as Close } from "./close.svg";
import "./Authenticate.css";

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: false,
      isConnecting: false,
      serviceConnecting: {
        mail: false,
        google: false,
        facebook: false,
        twitter: false
      },
      errors: {
        email: false,
        password: false,
        firstName: false,
        lastName: false,
        general: false
      },
      errorMessages: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        general: ""
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
    this.loginGoogle = this.loginGoogle.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
    this.loginTwitter = this.loginTwitter.bind(this);
  }
  loginEmailUser() {
    //todo : loading, errors
    const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      this.state.formValues.email !== "" &&
      this.state.formValues.password !== ""
    ) {
      if (!isEmail.test(this.state.formValues.email)) {
        this.setState({
          errors: {
            email: true,
            password: false,
            firstName: false,
            lastName: false,
            general: false
          },
          errorMessages: {
            email: "invalid",
            password: "",
            firstName: "",
            lastName: "",
            general: ""
          }
        });
        return;
      }
      if (!this.state.isConnecting) {
        if (this.props.location.authData && this.props.location.authData.type) {
          this.props.loginWithEmail(
            this.state.formValues.email,
            this.state.formValues.password,
            this.state.formValues.firstName,
            this.state.formValues.lastName,
            this.props.location.authData
          );
        } else {
          this.props.loginWithEmail(
            this.state.formValues.email,
            this.state.formValues.password,
            this.state.formValues.firstName,
            this.state.formValues.lastName
          );
        }
        this.setState({
          isConnecting: true,
          serviceConnecting: {
            mail: true,
            google: false,
            facebook: false,
            twitter: false
          },
          errors: {
            email: false,
            password: false,
            firstName: false,
            lastName: false,
            general: false
          },
          errorMessages: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            general: ""
          }
        });
      }
    } else {
      this.setState({
        errors: {
          email:
            this.state.formValues.email === "" ||
            !isEmail.test(this.state.formValues.email),
          password: this.state.formValues.password === "",
          firstName: false,
          lastName: false,
          general: false
        },
        errorMessages: {
          email: this.state.formValues.email === "" ? "required" : "invalid",
          password: "required",
          firstName: "",
          lastName: "",
          general: ""
        }
      });
    }
  }
  signupEmailUser() {
    //todo : loading, errors
    const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      this.state.formValues.email !== "" &&
      this.state.formValues.password !== "" &&
      this.state.formValues.firstName !== ""
    ) {
      if (!isEmail.test(this.state.formValues.email)) {
        this.setState({
          errors: {
            email: true,
            password: false,
            firstName: false,
            lastName: false,
            general: false
          },
          errorMessages: {
            email: "invalid",
            password: "",
            firstName: "",
            lastName: "",
            general: ""
          }
        });
        return;
      }
      if (!this.state.isConnecting) {
        if (this.props.location.authData && this.props.location.authData.type) {
          this.props.signupWithEmail(
            this.state.formValues.email,
            this.state.formValues.password,
            this.state.formValues.firstName,
            this.state.formValues.lastName,
            this.props.location.authData
          );
        } else {
          this.props.signupWithEmail(
            this.state.formValues.email,
            this.state.formValues.password,
            this.state.formValues.firstName,
            this.state.formValues.lastName
          );
        }
        this.setState({
          isConnecting: true,
          serviceConnecting: {
            mail: true,
            google: false,
            facebook: false,
            twitter: false
          },
          errors: {
            email: false,
            password: false,
            firstName: false,
            lastName: false,
            general: false
          },
          errorMessages: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            general: ""
          }
        });
      }
    } else {
      this.setState({
        errors: {
          email:
            this.state.formValues.email === "" ||
            !isEmail.test(this.state.formValues.email),
          password: this.state.formValues.password === "",
          firstName: this.state.formValues.firstName === "",
          lastName: false,
          general: false
        },
        errorMessages: {
          email: this.state.formValues.email === "" ? "required" : "invalid",
          password: "required",
          firstName: "required",
          lastName: "",
          general: ""
        }
      });
    }
  }
  showPassword() {
    if (!this.state.shouldShowPassword)
      this.setState({ shouldShowPassword: true });
  }
  hidePassword() {
    if (this.state.shouldShowPassword)
      this.setState({ shouldShowPassword: false });
  }
  loginFacebook(response) {
    if (!this.state.isConnecting) {
      if (
        this.props.location.authData &&
        this.props.location.authData.type !== ""
      ) {
        this.props.loginWithFacebook(response, this.props.location.authData);
      } else {
        this.props.loginWithFacebook(response);
      }
      this.setState({
        isConnecting: true,
        serviceConnecting: {
          mail: false,
          google: false,
          facebook: true,
          twitter: false
        },
        errors: {
          email: false,
          password: false,
          firstName: false,
          lastName: false,
          general: false
        },
        errorMessages: {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          general: ""
        }
      });
    }
  }
  loginGoogle(response) {
    if (!this.state.isConnecting) {
      if (
        this.props.location.authData &&
        this.props.location.authData.type !== ""
      ) {
        this.props.loginWithGoogle(response, this.props.location.authData);
        console.log("with authdata");
      } else {
        this.props.loginWithGoogle(response);
      }
      this.setState({
        isConnecting: true,
        serviceConnecting: {
          mail: false,
          google: true,
          facebook: false,
          twitter: false
        },
        errors: {
          email: false,
          password: false,
          firstName: false,
          lastName: false,
          general: false
        },
        errorMessages: {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          general: ""
        }
      });
    }
  }
  loginTwitter(response) {
    if (!this.state.isConnecting) {
      if (
        this.props.location.authData &&
        this.props.location.authData.type !== ""
      ) {
        this.props.loginWithTwitter(response, this.props.location.authData);
      } else {
        this.props.loginWithTwitter(response);
      }
      this.setState({
        isConnecting: true,
        serviceConnecting: {
          mail: false,
          google: false,
          facebook: false,
          twitter: true
        },
        errors: {
          email: false,
          password: false,
          firstName: false,
          lastName: false,
          general: false
        },
        errorMessages: {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          general: ""
        }
      });
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.authError !== "") {
      this.setState({
        errors: {
          email: false,
          password: false,
          firstName: false,
          lastName: false,
          general: true
        },
        errorMessages: {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          general: newProps.authError
        },
        isConnecting: false,
        serviceConnecting: {
          mail: false,
          google: false,
          facebook: false,
          twitter: false
        }
      });
    }
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
            {this.state.errors.email &&
              this.state.errorMessages.email === "required" && (
                <p className="error">
                  <FormattedMessage
                    id="Auth.RequiredEmailError"
                    defaultMessage="Email required"
                    description="Form error email required"
                  />
                </p>
              )}
            {this.state.errors.email &&
              this.state.errorMessages.email === "invalid" && (
                <p className="error">
                  <FormattedMessage
                    id="Auth.InvalidEmailError"
                    defaultMessage="Email invalid"
                    description="Form error Email invalid"
                  />
                </p>
              )}
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
            {this.state.errors.password &&
              this.state.errorMessages.password === "required" && (
                <p className="error">
                  <FormattedMessage
                    id="Auth.RequiredPasswordError"
                    defaultMessage="Password required"
                    description="Form error Password required"
                  />
                </p>
              )}
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
                    if (!this.state.isConnecting) {
                      this.loginEmailUser();
                    }
                  }}
                  loading={
                    this.state.isConnecting &&
                    this.state.serviceConnecting.email
                  }
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
            {this.state.errors.firstName &&
              this.state.errorMessages.firstName === "required" && (
                <p className="error">
                  <FormattedMessage
                    id="Auth.RequiredFirstNameError"
                    defaultMessage="First name required"
                    description="Form error first name required"
                  />
                </p>
              )}
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
            {this.state.errors.email &&
              this.state.errorMessages.email === "required" && (
                <p className="error">
                  <FormattedMessage
                    id="Auth.RequiredEmailError"
                    defaultMessage="Email required"
                    description="Form error email required"
                  />
                </p>
              )}
            {this.state.errors.email &&
              this.state.errorMessages.email === "invalid" && (
                <p className="error">
                  <FormattedMessage
                    id="Auth.InvalidEmailError"
                    defaultMessage="Email invalid"
                    description="Form error Email invalid"
                  />
                </p>
              )}
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
            {this.state.errors.password &&
              this.state.errorMessages.password === "required" && (
                <p className="error">
                  <FormattedMessage
                    id="Auth.RequiredPasswordError"
                    defaultMessage="Password required"
                    description="Form error Password required"
                  />
                </p>
              )}
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
                    if (!this.state.isConnecting) {
                      this.signupEmailUser();
                    }
                  }}
                  loading={
                    this.state.isConnecting &&
                    this.state.serviceConnecting.email
                  }
                />
              )}
            </FormattedMessage>
          </div>
        </div>
      </div>
    );
  }
  renderHeader() {
    const happyMessages = [
      <FormattedMessage
        id="Auth.HappyMessage1"
        defaultMessage="Yay"
        description="Sign in happy word 1"
      />,
      <FormattedMessage
        id="Auth.HappyMessage2"
        defaultMessage="Hooray"
        description="Sign in happy word 2"
      />,
      <FormattedMessage
        id="Auth.HappyMessage3"
        defaultMessage="Woo"
        description="Sign in happy word 3"
      />
    ];
    const happyIndex = Math.floor(Math.random() * 3);
    switch (this.props.headerMode) {
      default:
        if (this.state.isSignIn) {
          return (
            <div className="header">
              <h2>
                {this.props.location.authData &&
                this.props.location.authData.type === "boughtFont" ? (
                  <FormattedMessage
                    id="Auth.SignInHeaderBoughtFont"
                    defaultMessage="Thank you!"
                    description="Sign in header message if font bought"
                  />
                ) : (
                  <FormattedMessage
                    id="Auth.SignInHeader"
                    defaultMessage="Welcome back"
                    description="Sign in header message"
                  />
                )}
              </h2>
              {this.props.location.authData &&
                this.props.location.authData.type === "saveFont" && (
                  <p>
                    <FormattedMessage
                      id="Auth.SaveFontMessage"
                      defaultMessage="Congratulations for creating your font .... - Log in or create an account to save your font ---- [PlaceHolder] ---"
                      description="Sign in header message if the user has saved a font"
                    />
                  </p>
                )}
              {this.props.location.authData &&
                this.props.location.authData.type === "boughtFont" && (
                  <p>
                    {happyMessages[happyIndex]}
                    <FormattedMessage
                      id="Auth.BoughtFontMessage"
                      defaultMessage="Congratulations for buying your font .... - Log in or create an account to save your font ---- [PlaceHolder] ---"
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
                {this.props.location.authData &&
                this.props.location.authData.type === "boughtFont" ? (
                  <FormattedMessage
                    id="Auth.SignInHeaderBoughtFont"
                    defaultMessage="Thank you!"
                    description="Sign in header message if font bought"
                  />
                ) : (
                  <FormattedMessage
                    id="Auth.SignUpHeader"
                    defaultMessage="Nice to meet you"
                    description="Sign up header title"
                  />
                )}
              </h2>
              {this.props.location.authData &&
                this.props.location.authData.type === "saveFont" && (
                  <p>
                    <FormattedMessage
                      id="Auth.SaveFontMessage"
                      defaultMessage="Congratulations for creating your font .... - Log in or create an account to save your font ---- [PlaceHolder] ---"
                      description="Sign in header message if the user has saved a font"
                    />
                  </p>
                )}
              {this.props.location.authData &&
                this.props.location.authData.type === "boughtFont" && (
                  <p>
                    <FormattedMessage
                      id="Auth.BoughtFontMessage"
                      defaultMessage="Congratulations for buying your font .... - Log in or create an account to save your font ---- [PlaceHolder] ---"
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
    console.log(this.props);
    console.log(this.state);
    return (
      <div className="Authenticate">
        <div className="container">
          <Close
            className="closeIcon"
            onClick={() => {
              this.props.reloadFonts();
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
                  callback={this.loginFacebook}
                  render={renderProps => (
                    <Button
                      label="Facebook"
                      mode="social-facebook"
                      onClick={!this.state.isConnecting && renderProps.onClick}
                      loading={
                        this.state.isConnecting &&
                        this.state.serviceConnecting.facebook
                      }
                    />
                  )}
                />
                <TwitterLogin
                  callback={this.loginTwitter}
                  requestTokenUrl={TWITTER_REQUEST_TOKEN_URL}
                  render={renderProps => (
                    <Button
                      label="Twitter"
                      mode="social-twitter"
                      onClick={!this.state.isConnecting && renderProps.onClick}
                      loading={
                        this.state.isConnecting &&
                        this.state.serviceConnecting.twitter
                      }
                    />
                  )}
                />
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={this.loginGoogle}
                  onFailure={this.loginGoogle}
                  render={renderProps => (
                    <Button
                      label="Google"
                      mode="social-google"
                      onClick={!this.state.isConnecting && renderProps.onClick}
                      loading={
                        this.state.isConnecting &&
                        this.state.serviceConnecting.google
                      }
                    />
                  )}
                />
              </div>
              <div className="general-error">
                {this.state.errorMessages.general !== "" && (
                  <FormattedMessage
                    id="Auth.GeneralError"
                    defaultMessage="Woops, something happened"
                    description="Login page general error"
                  />
                )}
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
                            this.setState({
                              isSignIn: false,
                              errors: {
                                email: false,
                                password: false,
                                firstName: false,
                                lastName: false,
                                general: false
                              },
                              errorMessages: {
                                email: "",
                                password: "",
                                firstName: "",
                                lastName: "",
                                general: ""
                              }
                            });
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
                            this.setState({
                              isSignIn: true,
                              errors: {
                                email: false,
                                password: false,
                                firstName: false,
                                lastName: false,
                                general: false
                              },
                              errorMessages: {
                                email: "",
                                password: "",
                                firstName: "",
                                lastName: "",
                                general: ""
                              }
                            });
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

const mapStateToProps = state => ({
  authError: state.user.authError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToHome: () => push("/"),
      loginWithGoogle,
      loginWithFacebook,
      loginWithTwitter,
      loginWithEmail,
      signupWithEmail,
      reloadFonts
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
  signupWithEmail: PropTypes.func.isRequired,
  reloadFonts: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired
};

Authenticate.defaultProps = {
  hasBoughtFont: false
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Authenticate)
);
