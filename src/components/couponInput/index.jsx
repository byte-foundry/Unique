// @flow
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { COUPON_SERVER_URL } from "../../data/constants";
import "./CouponInput.css";

class CouponInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      coupon: "",
      errorCoupon: false,
      validCoupon: false
    };
    this.handleCoupon = this.handleCoupon.bind(this);
    this.checkCoupon = this.checkCoupon.bind(this);
  }
  componentWillMount() {
    this.timer = null;
    if (this.props.coupon.code) {
      this.setState({
        coupon: this.props.coupon.code,
        isOpened: true,
        errorCoupon: false,
        validCoupon: false
      });
      this.checkCoupon(this.props.coupon.code);
    }
  }

  handleCoupon(e) {
    clearTimeout(this.timer);
    if (e.target.value.length > 0) {
      this.setState({ coupon: e.target.value });
      this.timer = setTimeout(this.checkCoupon, 1000);
    } else {
      this.setState({
        isOpened: false,
        coupon: "",
        errorCoupon: false,
        validCoupon: false
      });
      this.props.storeCoupon({});
    }
  }
  checkCoupon(code) {
    axios
      .get(`${COUPON_SERVER_URL}${code || this.state.coupon.toUpperCase()}`)
      .then(res => {
        const { label, percentOff, name } = res.data;
        this.props.storeCoupon({ label, discount: percentOff, code: name });
        this.setState({
          errorCoupon: false,
          validCoupon: true
        });
      })
      .catch(err => {
        console.log(err);
        this.props.storeCoupon({});
        this.setState({
          errorCoupon: true,
          validCoupon: false
        });
      });
  }
  render() {
    return (
      <div className={`CouponInput`}>
        {this.state.isOpened ? (
          <div
            className={`coupon-input ${this.state.errorCoupon ? "error" : ""} ${
              this.state.validCoupon ? "valid" : ""
            }`}
          >
            <input
              type="text"
              autoFocus
              value={this.state.coupon}
              onChange={e => {
                this.handleCoupon(e);
              }}
            />
            {this.state.errorCoupon && (
              <p className="coupon-error">
                <FormattedMessage
                  id="Checkout.sidebarCouponError"
                  defaultMessage="Invalid coupon"
                  description="Checkout - Sidebar coupon error"
                />
              </p>
            )}
          </div>
        ) : (
          <div
            className="coupon-box"
            onClick={() => {
              this.setState({ isOpened: true });
            }}
          >
            <FormattedMessage
              id="Checkout.sidebarCoupon"
              defaultMessage="Got a promocode?"
              description="Checkout - Sidebar coupon button"
            />
          </div>
        )}
      </div>
    );
  }
}

CouponInput.propTypes = {
  storeCoupon: PropTypes.func.isRequired
};

CouponInput.defaultProps = {};

export default CouponInput;
