// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveAs from 'save-as';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { afterPayment } from '../../data/user';
import { setUnstable, setStable } from '../../data/ui';
import { getArrayBuffer } from '../../data/font';
import { EXPORT_SUBSET } from '../../data/constants';
import './Checkout.css';

import {
  STRIPE_PUBLISHABLE,
  PAYMENT_SERVER_URL,
  VALIDATION_SERVER_URL,
} from '../../data/constants';

const fromValueToCent = amount => parseInt(amount.toFixed(2) * 100);

const successPayment = (data, callback) => {
  console.log(data);
  callback(data);
};

const errorPayment = (data) => {
  console.log(data);
};

const onToken = (
  amount,
  description,
  callback,
  setUnstable,
  setStable,
  currency,
  getArrayBuffer,
  userFontName,
  checkoutOptions,
  coupon
) => (token) => {
  setUnstable();
  const fonts = [];
  const fontsSelected = checkoutOptions.filter(e => e.type === 'font' || e.dbName === 'baseFont');
  const promiseArray = [];
  fontsSelected.forEach((fontSelected) => {
    promiseArray.push(getArrayBuffer(
      fontSelected.fontName,
      userFontName,
      fontSelected.type === 'font' ? fontSelected.name : fontSelected.styleName,
      EXPORT_SUBSET,
    ));
  });
  Promise.all(promiseArray).then((buffers) => {
    console.log(buffers);
    const fonts = buffers.map((buffer, index) => {
      const intArray = new Uint8Array(buffer);
      return {
        variant: fontsSelected[index].type === 'font' ? fontsSelected[index].name : fontsSelected[index].styleName,
        data: Array.from(intArray),
      };
    });
    const family = userFontName || 'unique_font';
    const invoice = {
      currency,
      choices: checkoutOptions,
    };
    axios
      .post(
        PAYMENT_SERVER_URL,
        {
          description,
          source: token.id,
          currency,
          amount: fromValueToCent(amount),
          family,
          invoice,
          fonts,
          email: token.email,
          coupon: coupon.code,
        },
        { responseType: 'arraybuffer' },
      )
      .then((pack) => {
        console.log(pack);
        const blob = new Blob([new DataView(pack.data)], { type: 'application/zip' });
        saveAs(blob, 'purchase.zip');
        successPayment({
          data: {
            paid: true,
            email: token.email,
          },
        }, callback);
      })
      .catch((err) => {
        setStable();
        errorPayment(err);
        console.log(err);
      });
  });
};

const Checkout = props => (
  <StripeCheckout
    name={props.title}
    description={props.description}
    image="https://assets.awwwards.com/awards/media/cache/thumb_user_70/avatar/338028/594bd5ef47c4f.PNG"
    amount={props.coupon.discount ? fromValueToCent(props.amount - props.amount * props.coupon.discount/100) : fromValueToCent(props.amount) }
    token={onToken(
      props.amount,
      'Buy with stripe',
      props.afterPayment,
      props.setUnstable,
      props.setStable,
      props.currency,
      props.getArrayBuffer,
      props.userFontName,
      props.checkoutOptions,
      props.coupon,
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
  coupon: state.user.coupon,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      afterPayment, setUnstable, setStable, getArrayBuffer,
    },
    dispatch,
  );

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
  email: '',
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
