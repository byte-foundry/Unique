// @flow
import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import Button from "../../components/button/";
import { reloadFonts } from "../../data/font/";
import { ReactComponent as Logo } from "../app/logo.svg";
import { ReactComponent as Eye } from "./eye.svg";
import { ReactComponent as Close } from "./close.svg";

import {
  loginWithEmail,
} from "../../data/user/";

import { AWS_URL } from "../../data/constants";

import "./Authenticate.css";

class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnecting: false,
      errors: {
        password: false,
        confirm: false,
        general: false
      },
      errorMessages: {
        password: "",
        confirm: "",
        general: ""
      },
      formValues: {
        password: "",
        confirm: ""
      },
      shouldShowPassword: false,
      shouldShowConfirm: false
    };
    this.renderReset = this.renderReset.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.showPassword = this.showPassword.bind(this);
    this.hidePassword = this.hidePassword.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  changePassword() {
    // todo : loading, errors
    if (
      this.state.formValues.confirm !== "" ||
      this.state.formValues.password !== ""
    ) {
      // test pw
      if (this.state.formValues.confirm !== this.state.formValues.password) {
        this.setState({
          errors: {
            password: false,
            confirm: false,
            general: true
          },
          errorMessages: {
            password: "",
            confirm: "",
            general: "identical"
          }
        });
        return;
      }
      if (!this.state.isConnecting) {
        this.setState({
          isConnecting: true,
          errors: {
            password: false,
            confirm: false,
            general: false
          },
          errorMessages: {
            password: "",
            confirm: "",
            general: ""
          }
        });
        const query = new URLSearchParams(this.props.location.search);
        const resetToken = query.get("resetToken");
        const id = query.get("id");
        axios
          .put(`${AWS_URL}/local/users/${id}/password`, {
            resetToken,
            password: this.state.formValues.password,
          })
          .then(res => {
            this.props.loginWithEmail(
              id,
              this.state.formValues.password,
              this.props.graphQLToken
            );
            console.log(res);
          })
          .catch(err => {
            console.log(err);
            this.setState({
              isConnecting: false,
              errors: {
                password: false,
                confirm: false,
                general: true
              },
              errorMessages: {
                password: "",
                confirm: "",
                general: "error"
              },
              formValues: {
                password: "",
                confirm: ""
              },
              shouldShowPassword: false,
              shouldShowConfirm: false
            });
          });
      }
    } else {
      this.setState({
        errors: {
          password: this.state.formValues.password === "",
          confirm: this.state.formValues.confirm === "",
          general: false
        },
        errorMessages: {
          password: this.state.formValues.password === "" ? "required" : "",
          confirm: this.state.formValues.confirm === "" ? "required" : "",
          general: ""
        }
      });
    }
  }
  showPassword(type) {
    switch (type) {
      case "password":
        if (!this.state.shouldShowPassword) {
          this.setState({ shouldShowPassword: true });
        }
        break;
      case "confirm":
        if (!this.state.shouldShowConfirm) {
          this.setState({ shouldShowConfirm: true });
        }
        break;
      default:
        break;
    }
  }
  hidePassword(type) {
    switch (type) {
      case "password":
        if (this.state.shouldShowPassword) {
          this.setState({ shouldShowPassword: false });
        }
        break;
      case "confirm":
        if (this.state.shouldShowConfirm) {
          this.setState({ shouldShowConfirm: false });
        }
        break;
      default:
        break;
    }
  }
  renderReset() {
    return (
      <div className="signin">
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
              onMouseDown={() => {
                this.showPassword("password");
              }}
              onMouseUp={() => {
                this.hidePassword("password");
              }}
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
          <div className="col-lg-12">
            <p>
              <FormattedMessage
                id="Auth.SignUpConfirmPasswordLabel"
                defaultMessage="Confirm"
                description="Sign up form confirm password label"
              />
            </p>
            <input
              placeholder="xxxxxxx"
              key="confirmPassword"
              type={this.state.shouldShowConfirm ? "text" : "password"}
              className={this.state.errors.confirm ? "isError" : ""}
              value={this.state.formValues.confirm}
              onChange={e => {
                this.setState({
                  formValues: {
                    ...this.state.formValues,
                    confirm: e.target.value
                  }
                });
              }}
            />
            <Eye
              className="eyeIcon"
              onMouseDown={() => {
                this.showPassword("confirm");
              }}
              onMouseUp={() => {
                this.hidePassword("confirm");
              }}
            />
            {this.state.errors.password &&
              this.state.errorMessages.confirm === "required" && (
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
              id="Auth.NewpasswordFormButton"
              defaultMessage="Change password"
              description="Login page change password form button"
            >
              {text => (
                <Button
                  mode="full"
                  className={`email-button ${
                    this.state.isConnecting ? "loading" : ""
                  }`}
                  label={text}
                  onClick={() => {
                    if (!this.state.isConnecting) {
                      this.changePassword();
                    }
                  }}
                  loading={this.state.isConnecting}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
      </div>
    );
  }
  renderHeader() {
    return (
      <div className="header">
        <h2>
          <FormattedMessage
            id="Auth.ChangePasswordHeader"
            defaultMessage="Change your password"
            description="Change password"
          />
        </h2>

        <p>
          <FormattedMessage
            id="Auth.ChangePasswordMessage"
            defaultMessage="Nice to see you back! Enter your password, confirm it and you'll be set for creating awesome unique fonts again!"
            description="Change password header"
          />
        </p>
      </div>
    );
  }
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const resetToken = query.get("resetToken");
    const id = query.get("id");
    axios
      .get(`${AWS_URL}/users/${id}/reset_password?resetToken=${resetToken}`)
      .then(() => {})
      .catch(err => {
        console.log(err);
        this.props.goToSignup();
      });
  }
  render() {
    return (
      <div className="Authenticate">
        <div className="container">
          <Close
            className="closeIcon"
            onClick={() => {
              if (this.props.projectBought === "boughtFont") {
                this.props.goToHome();
              } else {
                this.props.reloadFonts();
              }
            }}
          />
          <div className="row">
            <div className="col-lg-6 left">
              <Logo />
            </div>
            <div className="col-lg-6 right">
              {this.renderHeader()}
              {this.renderReset()}
              <br />
              <br />
              <div className="general-error">
                {this.state.errorMessages.general === "error" && (
                  <FormattedMessage
                    id="Auth.GeneralError"
                    defaultMessage="Woops, something happened"
                    description="Login page general error"
                  />
                )}
                {this.state.errorMessages.general === "identical" && (
                  <FormattedMessage
                    id="Auth.IdenticalPasswordError"
                    defaultMessage="Your passwords do not match."
                    description="Login page password match error"
                  />
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
  authError: state.user.authError,
  graphQLToken: state.user.graphQLToken,
  projectBought: state.user.currentProject.bought,
  projectId: state.user.currentProject.id
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goToHome: () => push("/app/"),
      goToSignup: () => push("/app/auth"),
      reloadFonts,
      loginWithEmail,
    },
    dispatch
  );

NewPassword.propTypes = {
  goToHome: PropTypes.func.isRequired,
  goToSignup: PropTypes.func.isRequired
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewPassword)
);
