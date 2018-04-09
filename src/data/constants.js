export const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_PkwKlOWOqSoimNJo2vsT21sE'
    : 'pk_test_PkwKlOWOqSoimNJo2vsT21sE';
export const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://unique-back.prototypo.io/create-package/';
    : 'https://unique-back.prototypo.io/dev/create-package/';
// : 'https://bzawttxlqh.execute-api.eu-west-1.amazonaws.com/local/unique/fonts/buy';
export const VALIDATION_SERVER_URL = 'https://unique-back.prototypo.io/create-package/';
export const DEFAULT_UI_WORD = 'Hamburgefonstiv ABC 123';
export const DEFAULT_UI_GLYPH = 'g';
export const GRAPHQL_API = 'https://api.graph.cool/simple/v1/prototypo-new-dev';
export const BASE_PACK_PRICE = 35.0;
// const AWS_URL = `https://${
//   process.env.NODE_ENV === "production" ? "e4jpj60rk8" : "tc1b6vq6o8"
// }.execute-api.eu-west-1.amazonaws.com/${
//   process.env.NODE_ENV === "production" ? "prod" : "dev"
// }`;
const AWS_URL = `https://${
  process.env.NODE_ENV === 'production' ? 'tc1b6vq6o8' : 'tc1b6vq6o8'
}.execute-api.eu-west-1.amazonaws.com/${
  process.env.NODE_ENV === 'production' ? 'dev' : 'dev'
}`;
export const TWITTER_REQUEST_TOKEN_URL = `${AWS_URL}/auth/twitter/requestToken`;
// export const FACEBOOK_APP_ID =
//   process.env.NODE_ENV === "production" ? "360143951128760" : "569126220107317";
export const FACEBOOK_APP_ID =
  process.env.NODE_ENV === 'production' ? '569126220107317' : '569126220107317';
// export const GOOGLE_CLIENT_ID = `498899515436-${
//   process.env.NODE_ENV === "production"
//     ? "aiq68iif29l3dh8pcrjgn8uvpht180vv"
//     : "7c84imarpufkvf56olbpodnks3d3kg2p"
// }.apps.googleusercontent.com`;

export const GOOGLE_CLIENT_ID = `498899515436-${
  process.env.NODE_ENV === 'production'
    ? '7c84imarpufkvf56olbpodnks3d3kg2p'
    : '7c84imarpufkvf56olbpodnks3d3kg2p'
}.apps.googleusercontent.com`;
