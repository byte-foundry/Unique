export const STRIPE_PUBLISHABLE =
  process.env.REACT_APP_UNIQUE_ENV === 'production'
    ? 'pk_live_CVrzdDZTEowrAZaRizc4G14c'
    : 'pk_test_PkwKlOWOqSoimNJo2vsT21sE';
export const PAYMENT_SERVER_URL =
  process.env.REACT_APP_UNIQUE_ENV === 'production'
    ? 'https://unique-back.prototypo.io/create-package/'
    //    : 'http://localhost:8004/create-package/';
    : 'https://unique-back.prototypo.io/dev/create-package/';
export const S3_URL =
  process.env.REACT_APP_UNIQUE_ENV === 'production'
    ? 'https://cdn.prototypo.io/unique/'
    : 'https://cdn-dev.prototypo.io/unique/';
export const DEFAULT_UI_WORD = 'Hamburgefonstiv ABC 123';
export const DEFAULT_UI_GLYPH = 'g';
export const GRAPHQL_API = process.env.REACT_APP_UNIQUE_ENV === 'production'
  ? 'https://api.graph.cool/simple/v1/prototypo'
  : 'https://api.graph.cool/simple/v1/prototypo-new-dev';
export const BASE_PACK_PRICE = 35.0;
export const AWS_URL = `https://${
  process.env.REACT_APP_UNIQUE_ENV === 'production' ? 'e4jpj60rk8' : 'tc1b6vq6o8'
}.execute-api.eu-west-1.amazonaws.com/${
  process.env.REACT_APP_UNIQUE_ENV === 'production' ? 'prod' : 'dev'
}`;
export const TWITTER_REQUEST_TOKEN_URL = `${AWS_URL}/auth/twitter/requestToken`;
export const FACEBOOK_APP_ID =
  process.env.REACT_APP_UNIQUE_ENV === 'production' ? '360143951128760' : '569126220107317';
export const GOOGLE_CLIENT_ID = `498899515436-${
  process.env.REACT_APP_UNIQUE_ENV === 'production'
    ? 'aiq68iif29l3dh8pcrjgn8uvpht180vv'
    : '7c84imarpufkvf56olbpodnks3d3kg2p'
}.apps.googleusercontent.com`;

export const EXPORT_SUBSET =
  ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890$€¢%‰#<+=−>¡!¿?.:;…-–—()[]{}/\\&*@“”‘’«»‹›ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöøùúûüýÿ,';

export const COUPON_SERVER_URL = `${AWS_URL}/unique/coupons/`;
export const TEMPLATE_URL = `${AWS_URL}/fonts/`;

const dblTouchTapMaxDelay = 300;
let latestTouchTap = {
  time: 0,
  target: null,
};

export const isDblTouchTap = function (event) {
  const touchTap = {
    time: new Date().getTime(),
    target: event.currentTarget,
  };
  const isFastDblTouchTap = (
    touchTap.target === latestTouchTap.target &&
    touchTap.time - latestTouchTap.time < dblTouchTapMaxDelay
  );
  latestTouchTap = touchTap;
  return isFastDblTouchTap;
};
