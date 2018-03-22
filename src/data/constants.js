export const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === "production"
    ? "pk_test_PkwKlOWOqSoimNJo2vsT21sE"
    : "pk_test_PkwKlOWOqSoimNJo2vsT21sE";
export const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3000"
    : "https://bzawttxlqh.execute-api.eu-west-1.amazonaws.com/local/unique/fonts/buy";
export const DEFAULT_UI_WORD = "Hamburgefonstiv ABC 123";
export const DEFAULT_UI_GLYPH = "g";
export const GRAPHQL_API = "https://api.graph.cool/simple/v1/prototypo-new-dev";
export const GRAPHQL_PROTOTYPO_API =
  process.env.NODE_ENV === "production"
    ? "https://api.graph.cool/simple/v1/prototypo-new-dev"
    : "https://api.graph.cool/simple/v1/prototypo";
export const AUTH0_DOMAIN = "unique-app.eu.auth0.com";
export const AUTH0_API = "http://localhost:3000";
export const AUTH0_CLIENTID = "i4KEy4mGBQIp4Yd55QC4Z1fa35qeIKN7";
export const AUTH0_CALLBACKURL =
  process.env.NODE_ENV === "production"
    ? "http://peasy-poc.netlify.com/callback"
    : "http://localhost:3000/callback";
export const BASE_PACK_PRICE = 15.0;
const AWS_URL = `https://${
  process.env.NODE_ENV === "production" ? "e4jpj60rk8" : "tc1b6vq6o8"
}.execute-api.eu-west-1.amazonaws.com/${
  process.env.NODE_ENV === "production" ? "prod" : "dev"
}`;
export const TWITTER_REQUEST_TOKEN_URL = `${AWS_URL}/auth/twitter/requestToken`;
export const FACEBOOK_APP_ID =
  process.env.NODE_ENV === "production" ? "360143951128760" : "569126220107317";
export const GOOGLE_CLIENT_ID = `498899515436-${
  process.env.NODE_ENV === "production"
    ? "aiq68iif29l3dh8pcrjgn8uvpht180vv"
    : "7c84imarpufkvf56olbpodnks3d3kg2p"
}.apps.googleusercontent.com`;
