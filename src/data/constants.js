export const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_JeXHhY814RGE4IU60rPCMaEw'
  : 'pk_test_JeXHhY814RGE4IU60rPCMaEw';
export const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'http://localhost:3000'
  : 'http://localhost:3000';
export const DEFAULT_UI_WORD = 'Hamburgefonstiv - ABC 123';
export const GRAPHQL_API = 'https://api.graph.cool/simple/v1/cj6maa0ib2tud01656t4tp4ej';
export const GRAPHQL_PROTOTYPO_API = process.env.NODE_ENV === 'production'
? 'https://api.graph.cool/simple/v1/prototypo-new-dev'
: 'https://api.graph.cool/simple/v1/prototypo';
