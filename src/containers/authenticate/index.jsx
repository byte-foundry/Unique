// @flow
import React from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from 'react-twitter-auth';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import Button from '../../components/button/';
import {
	TWITTER_REQUEST_TOKEN_URL,
	GOOGLE_CLIENT_ID,
	FACEBOOK_APP_ID,
} from '../../data/constants';
import {
	loginWithGoogle,
	loginWithFacebook,
	loginWithTwitter,
	loginWithEmail,
	signupWithEmail,
} from '../../data/user/';
import {reloadFonts} from '../../data/font/';
import {ReactComponent as Logo} from '../app/logo.svg';
import {ReactComponent as Eye} from './eye.svg';
import {ReactComponent as Close} from './close.svg';

import {AWS_URL} from '../../data/constants';

import './Authenticate.css';

class Authenticate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSignIn: false,
			isReset: false,
			isConnecting: false,
			serviceConnecting: {
				email: false,
				google: false,
				facebook: false,
				twitter: false,
				reset: false,
			},
			errors: {
				email: false,
				password: false,
				firstName: false,
				lastName: false,
				general: false,
				reset: false,
			},
			errorMessages: {
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				general: '',
				reset: '',
			},
			formValues: {
				email: '',
				password: '',
				firstName: '',
				lastName: '',
			},
			shouldShowPassword: false,
			successReset: false,
		};
		this.renderSignIn = this.renderSignIn.bind(this);
		this.renderSignUp = this.renderSignUp.bind(this);
		this.renderReset = this.renderReset.bind(this);
		this.renderHeader = this.renderHeader.bind(this);
		this.showPassword = this.showPassword.bind(this);
		this.hidePassword = this.hidePassword.bind(this);
		this.loginEmailUser = this.loginEmailUser.bind(this);
		this.signupEmailUser = this.signupEmailUser.bind(this);
		this.loginGoogle = this.loginGoogle.bind(this);
		this.loginFacebook = this.loginFacebook.bind(this);
		this.loginTwitter = this.loginTwitter.bind(this);
		this.resetEmailUser = this.resetEmailUser.bind(this);
	}
	loginEmailUser() {
		// todo : loading, errors
		/*eslint no-useless-escape: 0*/
		const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (
			this.state.formValues.email !== '' &&
			this.state.formValues.password !== ''
		) {
			if (!isEmail.test(this.state.formValues.email)) {
				this.setState({
					errors: {
						email: true,
						password: false,
						firstName: false,
						lastName: false,
						general: false,
						reset: false,
					},
					errorMessages: {
						email: 'invalid',
						password: '',
						firstName: '',
						lastName: '',
						general: '',
						reset: '',
					},
				});
				return;
			}
			if (!this.state.isConnecting) {
				this.props.loginWithEmail(
					this.state.formValues.email,
					this.state.formValues.password,
					this.props.graphQLToken,
				);
				this.setState({
					isConnecting: true,
					serviceConnecting: {
						email: true,
						google: false,
						facebook: false,
						twitter: false,
						reset: false,
					},
					errors: {
						email: false,
						password: false,
						firstName: false,
						lastName: false,
						general: false,
						reset: false,
					},
					errorMessages: {
						email: '',
						password: '',
						firstName: '',
						lastName: '',
						general: '',
						reset: '',
					},
				});
			}
		} else {
			this.setState({
				errors: {
					email:
						this.state.formValues.email === '' ||
						!isEmail.test(this.state.formValues.email),
					password: this.state.formValues.password === '',
					firstName: false,
					lastName: false,
					general: false,
					reset: false,
				},
				errorMessages: {
					email: this.state.formValues.email === '' ? 'required' : 'invalid',
					password: 'required',
					firstName: '',
					lastName: '',
					general: '',
					reset: '',
				},
			});
		}
	}
	resetEmailUser() {
		// todo : loading, errors
		/*eslint no-useless-escape: 0*/
		const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (this.state.formValues.email !== '') {
			if (!isEmail.test(this.state.formValues.email)) {
				this.setState({
					errors: {
						email: false,
						password: false,
						firstName: false,
						lastName: false,
						general: false,
						reset: true,
					},
					errorMessages: {
						email: '',
						password: '',
						firstName: '',
						lastName: '',
						general: '',
						reset: 'invalid',
					},
					successReset: false,
				});
				return;
			}
			if (!this.state.isConnecting) {
				this.setState({
					isConnecting: true,
					serviceConnecting: {
						email: false,
						google: false,
						facebook: false,
						twitter: false,
						reset: true,
					},
					errors: {
						email: false,
						password: false,
						firstName: false,
						lastName: false,
						general: false,
						reset: false,
					},
					errorMessages: {
						email: '',
						password: '',
						firstName: '',
						lastName: '',
						general: '',
						reset: '',
					},
					successReset: false,
				});
				axios
					.put(
						`${AWS_URL}/users/${
							this.state.formValues.email
						}/reset_password?platform=unique`,
					)
					.then(() => {
						this.setState({
							isConnecting: false,
							serviceConnecting: {
								email: false,
								google: false,
								facebook: false,
								twitter: false,
								reset: false,
							},
							isReset: true,
							errors: {
								email: false,
								password: false,
								firstName: false,
								lastName: false,
								general: false,
								reset: false,
							},
							errorMessages: {
								email: '',
								password: '',
								firstName: '',
								lastName: '',
								general: '',
								reset: '',
							},
							successReset: true,
						});
					})
					.catch((err) => {
						console.log(err);
						this.setState({
							isConnecting: false,
							errorMessages: {
								email: '',
								password: '',
								firstName: '',
								lastName: '',
								general: 'invalid',
								reset: '',
							},
						});
					});
			}
		} else {
			this.setState({
				errors: {
					email:
						this.state.formValues.email === '' ||
						!isEmail.test(this.state.formValues.email),
					password: this.state.formValues.password === '',
					firstName: false,
					lastName: false,
					general: false,
					reset: false,
				},
				errorMessages: {
					email: '',
					password: '',
					firstName: '',
					lastName: '',
					general: '',
					reset: this.state.formValues.email === '' ? 'required' : 'invalid',
				},
			});
		}
	}
	signupEmailUser() {
		// todo : loading, errors
		const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (
			this.state.formValues.email !== '' &&
			this.state.formValues.password !== '' &&
			this.state.formValues.firstName !== ''
		) {
			if (!isEmail.test(this.state.formValues.email)) {
				this.setState({
					errors: {
						email: true,
						password: false,
						firstName: false,
						lastName: false,
						general: false,
						reset: false,
					},
					errorMessages: {
						email: 'invalid',
						password: '',
						firstName: '',
						lastName: '',
						general: '',
						reset: '',
					},
				});
				return;
			}
			if (!this.state.isConnecting) {
				this.props.signupWithEmail(
					this.state.formValues.email,
					this.state.formValues.password,
					this.state.formValues.firstName,
					this.state.formValues.lastName,
					this.props.graphQLToken,
				);
				this.setState({
					isConnecting: true,
					serviceConnecting: {
						email: true,
						google: false,
						facebook: false,
						twitter: false,
						reset: false,
					},
					errors: {
						email: false,
						password: false,
						firstName: false,
						lastName: false,
						general: false,
						reset: false,
					},
					errorMessages: {
						email: '',
						password: '',
						firstName: '',
						lastName: '',
						general: '',
						reset: '',
					},
				});
			}
		} else {
			this.setState({
				errors: {
					email:
						this.state.formValues.email === '' ||
						!isEmail.test(this.state.formValues.email),
					password: this.state.formValues.password === '',
					firstName: this.state.formValues.firstName === '',
					lastName: false,
					general: false,
					reset: false,
				},
				errorMessages: {
					email: this.state.formValues.email === '' ? 'required' : 'invalid',
					password: 'required',
					firstName: 'required',
					lastName: '',
					general: '',
					reset: '',
				},
			});
		}
	}
	showPassword() {
		if (!this.state.shouldShowPassword) {
			this.setState({shouldShowPassword: true});
		}
	}
	hidePassword() {
		if (this.state.shouldShowPassword) {
			this.setState({shouldShowPassword: false});
		}
	}
	loginFacebook(response) {
		if (!this.state.isConnecting) {
			this.props.loginWithFacebook(response, this.props.graphQLToken);
			this.setState({
				isConnecting: true,
				serviceConnecting: {
					email: false,
					google: false,
					facebook: true,
					twitter: false,
				},
				errors: {
					email: false,
					password: false,
					firstName: false,
					lastName: false,
					general: false,
				},
				errorMessages: {
					email: '',
					password: '',
					firstName: '',
					lastName: '',
					general: '',
				},
			});
		}
	}
	loginGoogle(response) {
		if (!this.state.isConnecting) {
			this.props.loginWithGoogle(response, this.props.graphQLToken);
			this.setState({
				isConnecting: true,
				serviceConnecting: {
					email: false,
					google: true,
					facebook: false,
					twitter: false,
				},
				errors: {
					email: false,
					password: false,
					firstName: false,
					lastName: false,
					general: false,
				},
				errorMessages: {
					email: '',
					password: '',
					firstName: '',
					lastName: '',
					general: '',
				},
			});
		}
	}
	loginTwitter(response) {
		if (!this.state.isConnecting) {
			this.props.loginWithTwitter(response, this.props.graphQLToken);
			this.setState({
				isConnecting: true,
				serviceConnecting: {
					email: false,
					google: false,
					facebook: false,
					twitter: true,
				},
				errors: {
					email: false,
					password: false,
					firstName: false,
					lastName: false,
					general: false,
				},
				errorMessages: {
					email: '',
					password: '',
					firstName: '',
					lastName: '',
					general: '',
				},
			});
		}
	}
	componentWillReceiveProps(newProps) {
		if (newProps.authError !== '') {
			this.setState({
				errors: {
					email: false,
					password: false,
					firstName: false,
					lastName: false,
					general: true,
				},
				errorMessages: {
					email: '',
					password: '',
					firstName: '',
					lastName: '',
					general: newProps.authError,
				},
				isConnecting: false,
				serviceConnecting: {
					email: false,
					google: false,
					facebook: false,
					twitter: false,
				},
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
							className={this.state.errors.email ? 'isError' : ''}
							value={this.state.formValues.email}
							onChange={(e) => {
								this.setState({
									formValues: {
										...this.state.formValues,
										email: e.target.value,
									},
								});
							}}
						/>
						{this.state.errors.email &&
							this.state.errorMessages.email === 'required' && (
								<p className="error">
									<FormattedMessage
										id="Auth.RequiredEmailError"
										defaultMessage="Email required"
										description="Form error email required"
									/>
								</p>
							)}
						{this.state.errors.email &&
							this.state.errorMessages.email === 'invalid' && (
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
							type={this.state.shouldShowPassword ? 'text' : 'password'}
							className={this.state.errors.password ? 'isError' : ''}
							value={this.state.formValues.password}
							onChange={(e) => {
								this.setState({
									formValues: {
										...this.state.formValues,
										password: e.target.value,
									},
								});
							}}
						/>
						<Eye
							className="eyeIcon"
							onMouseDown={this.showPassword}
							onMouseUp={this.hidePassword}
						/>
						{this.state.errors.password &&
							this.state.errorMessages.password === 'required' && (
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
							id="Auth.lostPasswordButton"
							defaultMessage="Forgot your password?"
							description="Login page log in reset password button"
						>
							{(text) => (
								<Button
									mode="text"
									className="lost-button"
									label={text}
									onClick={() => {
										this.setState({
											isReset: true,
										});
									}}
								/>
							)}
						</FormattedMessage>
						<FormattedMessage
							id="Auth.LogInFormButton"
							defaultMessage="Log in"
							description="Login page log in form button"
						>
							{(text) => (
								<Button
									mode="full"
									className={`email-button ${
										this.state.isConnecting &&
										this.state.serviceConnecting.email
											? 'loading'
											: ''
									}`}
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
	renderReset() {
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
							className={this.state.errors.reset ? 'isError' : ''}
							value={this.state.formValues.email}
							onChange={(e) => {
								this.setState({
									formValues: {
										...this.state.formValues,
										email: e.target.value,
									},
								});
							}}
						/>
						{this.state.errors.reset &&
							this.state.errorMessages.reset === 'required' && (
								<p className="error">
									<FormattedMessage
										id="Auth.RequiredEmailError"
										defaultMessage="Email required"
										description="Form error email required"
									/>
								</p>
							)}
						{this.state.errors.reset &&
							this.state.errorMessages.reset === 'invalid' && (
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
					<div className="col-lg-12 clearfix">
						<FormattedMessage
							id="Auth.ResetCancelButton"
							defaultMessage="Cancel"
							description="Login page reset cancel button"
						>
							{(text) => (
								<Button
									mode="full"
									className={`reset-cancel-button ${
										this.state.isConnecting &&
										this.state.serviceConnecting.email
											? 'loading'
											: ''
									}`}
									label={text}
									onClick={() => {
										this.setState({isReset: false});
									}}
								/>
							)}
						</FormattedMessage>
						<FormattedMessage
							id="Auth.ResetFormButton"
							defaultMessage="Reset password"
							description="Reset page reset form button"
						>
							{(text) => (
								<Button
									mode="full"
									className={`reset-button ${
										this.state.isConnecting &&
										this.state.serviceConnecting.reset
											? 'loading'
											: ''
									}`}
									label={text}
									onClick={() => {
										if (!this.state.isConnecting) {
											this.resetEmailUser();
										}
									}}
									loading={
										this.state.isConnecting &&
										this.state.serviceConnecting.reset
									}
								/>
							)}
						</FormattedMessage>
					</div>
				</div>
				{this.state.successReset && (
					<div className="row">
						<div className="col-lg-12 clearfix">
							<p className="reset-success">
								<br />
								<FormattedMessage
									id="Auth.ResetSuccess"
									defaultMessage="Thanks! We've sent you an email with all the details required in order to reset your password. See you there!"
									description="Reset page reset success test"
								/>
							</p>
						</div>
					</div>
				)}
				<div className="general-error">
					<br />
					{this.state.errorMessages.general !== '' &&
						this.state.errorMessages.general !== 'invalid' && (
							<FormattedMessage
								id="Auth.GeneralError"
								defaultMessage="Woops, something happened"
								description="Login page general error"
							/>
						)}
					{this.state.errorMessages.general !== '' &&
						this.state.errorMessages.general === 'invalid' && (
							<FormattedMessage
								id="Auth.InvalidEmailError"
								defaultMessage="Email invalid"
								description="Login page invalid error"
							/>
						)}
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
							className={this.state.errors.firstName ? 'isError' : ''}
							value={this.state.formValues.firstName}
							onChange={(e) => {
								this.setState({
									formValues: {
										...this.state.formValues,
										firstName: e.target.value,
									},
								});
							}}
						/>
						{this.state.errors.firstName &&
							this.state.errorMessages.firstName === 'required' && (
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
							className={this.state.errors.lastName ? 'isError' : ''}
							value={this.state.formValues.lastName}
							onChange={(e) => {
								this.setState({
									formValues: {
										...this.state.formValues,
										lastName: e.target.value,
									},
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
							className={this.state.errors.email ? 'isError' : ''}
							value={this.state.formValues.email}
							onChange={(e) => {
								this.setState({
									formValues: {
										...this.state.formValues,
										email: e.target.value,
									},
								});
							}}
						/>
						{this.state.errors.email &&
							this.state.errorMessages.email === 'required' && (
								<p className="error">
									<FormattedMessage
										id="Auth.RequiredEmailError"
										defaultMessage="Email required"
										description="Form error email required"
									/>
								</p>
							)}
						{this.state.errors.email &&
							this.state.errorMessages.email === 'invalid' && (
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
							type={this.state.shouldShowPassword ? 'text' : 'password'}
							className={this.state.errors.password ? 'isError' : ''}
							value={this.state.formValues.password}
							onChange={(e) => {
								this.setState({
									formValues: {
										...this.state.formValues,
										password: e.target.value,
									},
								});
							}}
						/>

						<Eye
							className="eyeIcon"
							onMouseDown={this.showPassword}
							onMouseUp={this.hidePassword}
						/>
						{this.state.errors.password &&
							this.state.errorMessages.password === 'required' && (
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
							{(text) => (
								<Button
									mode="full"
									className={`email-button ${
										this.state.isConnecting &&
										this.state.serviceConnecting.email
											? 'loading'
											: ''
									}`}
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
			/>,
		];
		const happyIndex = Math.floor(Math.random() * 3);
		switch (this.props.headerMode) {
			default:
				if (this.state.isSignIn) {
					return (
						<div className="header">
							<h2>
								{this.state.isReset ? (
									<FormattedMessage
										id="Auth.ResetHeader"
										defaultMessage="Don't worry, everything is under control"
										description="Sign in header message if reset password"
									/>
								) : (
									<span>
										{this.props.projectBought ? (
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
									</span>
								)}
							</h2>
							{this.state.isReset ? (
								<p>
									<FormattedMessage
										id="Auth.ResetMessage"
										defaultMessage="Please fill the following input with the email adress you've used to register and we will send you a link by email to reset your password."
										description="Sign in header message if password reset"
									/>
								</p>
							) : (
								<div>
									{this.props.projectId &&
										!this.props.projectBought && (
											<p>
												<FormattedMessage
													id="Auth.SaveFontMessage"
													defaultMessage="Congratulations for creating your font .... - Log in or create an account to save your font ---- [PlaceHolder] ---"
													description="Sign in header message if the user has saved a font"
												/>
											</p>
										)}
									{this.props.projectBought && (
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
							)}
						</div>
					);
				}
				return (
					<div className="header">
						<h2>
							{this.props.projectBought ? (
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
						{this.props.projectId &&
							!this.props.projectBought && (
								<p>
									<FormattedMessage
										id="Auth.SaveFontMessage"
										defaultMessage="Congratulations for creating your font .... - Log in or create an account to save your font ---- [PlaceHolder] ---"
										description="Sign in header message if the user has saved a font"
									/>
								</p>
							)}
						{this.props.projectBought && (
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
	}
	render() {
		return (
			<div className="Authenticate">
				<div className="container">
					<Close
						className="closeIcon"
						onClick={() => {
							if (this.props.projectBought === 'boughtFont') {
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
							{this.state.isReset ? (
								this.renderReset()
							) : (
								<div>
									{this.state.isSignIn
										? this.renderSignIn()
										: this.renderSignUp()}
								</div>
							)}
							{!this.state.isReset && (
								<div>
									<div className="auth-alternative">
										<FormattedMessage
											id="Auth.SocialMessage"
											defaultMessage="Or sign up with"
											description="Login page social auth CTA message"
										/>
									</div>
									<div className="sso-buttons">
										<FacebookLogin
											appId={FACEBOOK_APP_ID}
											autoLoad={false}
											fields="name,email"
											callback={this.loginFacebook}
											render={(renderProps) => (
												<Button
													label="Facebook"
													mode="sso-fa"
													onClick={() => {
														if (!this.state.isConnecting) {
															renderProps.onClick();
														}
													}}
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
											render={(renderProps) => (
												<Button
													label="Twitter"
													mode="sso-tw"
													onClick={() => {
														if (!this.state.isConnecting) {
															renderProps.onClick();
														}
													}}
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
											render={(renderProps) => (
												<Button
													label="Google"
													mode="sso-go"
													onClick={() => {
														if (!this.state.isConnecting) {
															renderProps.onClick();
														}
													}}
													loading={
														this.state.isConnecting &&
														this.state.serviceConnecting.google
													}
												/>
											)}
										/>
									</div>
									<div className="general-error">
										{this.state.errorMessages.general !== '' && (
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
													{(text) => (
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
																		general: false,
																	},
																	errorMessages: {
																		email: '',
																		password: '',
																		firstName: '',
																		lastName: '',
																		general: '',
																	},
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
													{(text) => (
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
																		general: false,
																	},
																	errorMessages: {
																		email: '',
																		password: '',
																		firstName: '',
																		lastName: '',
																		general: '',
																	},
																});
															}}
														/>
													)}
												</FormattedMessage>
											</p>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	authError: state.user.authError,
	graphQLToken: state.user.graphQLToken,
	projectBought: state.user.currentProject.bought,
	projectId: state.user.currentProject.id,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			goToHome: () => push('/app/'),
			loginWithGoogle,
			loginWithFacebook,
			loginWithTwitter,
			loginWithEmail,
			signupWithEmail,
			reloadFonts,
		},
		dispatch,
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
	authError: PropTypes.string.isRequired,
	graphQLToken: PropTypes.string,
	projectBought: PropTypes.bool.isRequired,
	projectId: PropTypes.string,
};

Authenticate.defaultProps = {
	hasBoughtFont: false,
	projectBought: false,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Authenticate),
);
