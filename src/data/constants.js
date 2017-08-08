export const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_JeXHhY814RGE4IU60rPCMaEw'
  : 'pk_test_JeXHhY814RGE4IU60rPCMaEw';
export const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'http://localhost:3000'
  : 'http://localhost:3000';
