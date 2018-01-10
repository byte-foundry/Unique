import auth0 from 'auth0-js';
import {
  AUTH0_CLIENTID,
  AUTH0_CALLBACKURL,
  AUTH0_DOMAIN,
  AUTH0_API,
} from '../../data/constants';
import { loginToGraphCool, logout } from '../../data/user';
import store, { history } from '../../data/create-store';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      audience: AUTH0_API,
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENTID,
      redirectUri: AUTH0_CALLBACKURL,
      responseType: 'token',
      scope: 'openid email',
    });
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login(redirectTo = '/') {
    this.auth0.authorize({
      state: redirectTo,
    });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.setSession(authResult);
        console.log(authResult);
        store.dispatch(loginToGraphCool(authResult.accessToken));
        history.replace(authResult.state);
      } else if (err) {
        history.replace(authResult.state);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      (authResult.expiresIn * 1000) + new Date().getTime(),
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    store.dispatch(logout());
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
