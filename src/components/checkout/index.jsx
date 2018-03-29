// @flow
import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { afterPayment } from "../../data/user";
import { setUnstable, setStable } from "../../data/ui";
import { getArrayBuffer } from "../../data/font";
import "./Checkout.css";

import { STRIPE_PUBLISHABLE, PAYMENT_SERVER_URL } from "../../data/constants";

const fromValueToCent = amount => amount.toFixed(2) * 100;

const successPayment = (data, callback) => {
  console.log(data);
  callback(data);
};

const errorPayment = data => {
  console.log(data);
};

const onToken = (amount, description, callback, setUnstable, setStable, currency, getArrayBuffer, userFontName, checkoutOptions) => token => {
  setUnstable();
  console.log(token)
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: currency,
      amount: fromValueToCent(amount)
    })
    .then(res => {
      const paymentNumber = res.data.id;
      const family = userFontName;
      const invoice = {
        currency,
        choices: checkoutOptions
      }
      //successPayment(data, callback))
      //   {
      //     "family": "familyName",
      //     "fonts": [
      //         {
      //             "variant": "blah",
      //             "data": ArrayBuffer
      //         }
      //     ],
      //     "invoice": {
      //         "choices": [
      //             {
      //                 "name": "specimen",
      //                 "price": 0
      //             },
      //             {
      //                 "name": "otf",
      //                 "price": 15
      //             }
      //         ],
      //         "currency": "$"
      //     },
      //     "paymentNumber": "ch_mkljqdfml",
      //     "customerId": "cus_mjsqmdfl"
      // }
    })
    .catch(data => {
      setStable();
      errorPayment(data);
    });
};

const Checkout = props => (
  <StripeCheckout
    name={props.title}
    description={props.description}
    image="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/338028/594bd5ef47c4f.PNG"
    amount={fromValueToCent(props.amount)}
    token={onToken(
      props.amount,
      "Buy with stripe",
      props.afterPayment,
      props.setUnstable,
      props.setStable,
      props.currency,
      props.getArrayBuffer,
      props.userFontName,
      props.checkoutOptions,
    )}
    currency={props.currency}
    stripeKey={STRIPE_PUBLISHABLE}
    email={props.email}
  >
    {props.children}
  </StripeCheckout>
);

const mapStateToProps = state => ({
  email: state.user.email,
  currency: state.ui.currency,
  userFontName: state.user.userFontName,
  checkoutOptions: state.user.checkoutOptions,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ afterPayment, setUnstable, setStable, getArrayBuffer }, dispatch);

Checkout.propTypes = {
  children: PropTypes.element.isRequired,
  amount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  email: PropTypes.string,
  afterPayment: PropTypes.func.isRequired,
  setUnstable: PropTypes.func.isRequired,
  setStable: PropTypes.func.isRequired,
  userFontName: PropTypes.string.isRequired,
};

Checkout.defaultProps = {
  email: ""
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);