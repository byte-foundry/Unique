// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { afterPayment } from '../../data/user';
import './Checkout.css';

import { STRIPE_PUBLISHABLE, PAYMENT_SERVER_URL } from '../../data/constants';

const CURRENCY = 'EUR';

const fromEuroToCent = amount => amount * 100;

const successPayment = (data) => {
  console.log(data);
};

const errorPayment = (data, callback) => {
  console.log(data);
  callback();
};

const onToken = (amount, description, callback) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToCent(amount),
    })
    .then(data => successPayment(data))
    .catch(data => errorPayment(data, callback));

const Checkout = props => (
  <StripeCheckout
    name={props.title}
    description={props.description}
    image="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/338028/594bd5ef47c4f.PNG"
    amount={fromEuroToCent(props.amount)}
    token={onToken(props.amount, 'Buy with stripe', props.afterPayment)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
    email={props.email}
  >
    { props.children }
  </StripeCheckout>
);


const mapStateToProps = state => ({
  email: state.user.email,
});

const mapDispatchToProps = dispatch => bindActionCreators({ afterPayment }, dispatch);

Checkout.propTypes = {
  children: PropTypes.element.isRequired,
  amount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  email: PropTypes.string,
  afterPayment: PropTypes.func.isRequired,
};

Checkout.defaultProps = {
  email: '',
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
