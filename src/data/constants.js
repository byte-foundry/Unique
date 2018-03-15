export const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_PkwKlOWOqSoimNJo2vsT21sE'
  : 'pk_test_PkwKlOWOqSoimNJo2vsT21sE';
export const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'http://localhost:3000'
  : 'https://bzawttxlqh.execute-api.eu-west-1.amazonaws.com/local/unique/fonts/buy';
export const DEFAULT_UI_WORD = 'Hamburgefonstiv ABC 123';
export const DEFAULT_UI_GLYPH = 'g';
export const GRAPHQL_API = 'https://api.graph.cool/simple/v1/cj6maa0ib2tud01656t4tp4ej';
export const GRAPHQL_PROTOTYPO_API = process.env.NODE_ENV === 'production'
? 'https://api.graph.cool/simple/v1/prototypo-new-dev'
: 'https://api.graph.cool/simple/v1/prototypo';
export const AUTH0_DOMAIN = 'unique-app.eu.auth0.com';
export const AUTH0_API = 'http://localhost:3000';
export const AUTH0_CLIENTID = 'i4KEy4mGBQIp4Yd55QC4Z1fa35qeIKN7';
export const AUTH0_CALLBACKURL = process.env.NODE_ENV === 'production'
? 'http://peasy-poc.netlify.com/callback'
: 'http://localhost:3000/callback';
export const BASE_PACK_PRICE = 15.00;