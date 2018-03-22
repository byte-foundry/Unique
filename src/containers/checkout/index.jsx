// @flow
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Masonry from "../../components/masonry";
import { updateCheckoutOptions } from "../../data/user";
import { ReactComponent as OtfLogo } from "./otf.svg";
import { ReactComponent as SpecimenLogo } from "./specimen.svg";

import "./Checkout.css";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: [
        {
          name: (
            <FormattedMessage
              id="CheckoutView.OtfOption"
              defaultMessage="OTF file"
              description="Otf"
            />
          ),
          class: "otf-logo",
          logo: <OtfLogo />,
          type: "logo",
          price: 0,
          selected: true,
          dbName: 'baseFont',
        },
        {
          name: (
            <FormattedMessage
              id="CheckoutView.SpecimenOption"
              defaultMessage="Specimen"
              description="Specimen"
            />
          ),
          logo: <SpecimenLogo />,
          dbName: 'specimen',
          class: "specimen-logo",
          type: "logo",
          price: 0,
          selected: true
        },
        {
          name: (
            <FormattedMessage
              id="CheckoutView.LightOption"
              defaultMessage="Light variant"
              description="Light"
            />
          ),
          class: "variant",
          dbName: 'lightOption',
          type: "font",
          price: 5,
          selected: false
        },
        {
          name: (
            <FormattedMessage
              id="CheckoutView.LightOption"
              defaultMessage="Bold variant"
              description="Bold"
            />
          ),
          class: "variant",
          dbName: 'boldOption',
          type: "font",
          price: 5,
          selected: false
        },
        {
          name: (
            <FormattedMessage
              id="CheckoutView.LightOption"
              defaultMessage="Italic variant"
              description="Italic"
            />
          ),
          class: "variant",
          type: "font",
          dbName: 'italicOption',
          price: 5,
          selected: false
        }
      ],
    };
    this.props.updateCheckoutOptions(this.state.selectedOptions, this.props.history.location.fontName);
    this.toggleChoice = this.toggleChoice.bind(this);
  }
  toggleChoice(name) {
    const { selectedOptions } = this.state;
    const selectedIndex = selectedOptions.findIndex(
      option => option.name === name
    );
    selectedOptions[selectedIndex].selected = !this.state.selectedOptions[
      selectedIndex
    ].selected;
    this.setState({ selectedOptions });
    this.props.updateCheckoutOptions(selectedOptions, this.props.history.location.fontName);
  }
  componentWillMount() {
    this.props.updateCheckoutOptions(this.state.selectedOptions, this.props.history.location.fontName);
  }
  render() {
    return (
      <div className="Checkout">
        <div className="container">
          <h2>
            <FormattedMessage
              id="CheckoutView.title"
              defaultMessage="Create your Unique package:"
              description="Checkout view title"
            />
          </h2>
          <div className="checkout-options">
            <Masonry breakPoints={[350]}>
              {this.state.selectedOptions.map((checkoutOption, index) => (
                <div
                  className={`option ${checkoutOption.class} ${checkoutOption.selected ? 'selected' : ''}`}
                  onClick={() => {
                    if (index !== 0) {
                      this.toggleChoice(checkoutOption.name);
                    }
                  }}
                >
                  {checkoutOption.type === "logo" && (
                    <div className="logo">{checkoutOption.logo}</div>
                  )}
                  {checkoutOption.type === "font" && (
                    <div className="font-wrapper">
                      <span>Chosen word</span>
                    </div>
                  )}
                  <input
                    type="checkbox"
                    id={`${checkoutOption.type}${index}`}
                    value={checkoutOption.selected}
                    checked={checkoutOption.selected}
                  />
                  <label
                    htmlFor={`${checkoutOption.type}${index}`}
                    className="check-box"
                    onClick={() => {
                      if (index !== 0) {
                        this.toggleChoice(checkoutOption.name);
                      }
                    }}
                  />
                  <p className="option-title">{checkoutOption.name}</p>
                </div>
              ))}
            </Masonry>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goBack: () => push("/specimen"), updateCheckoutOptions }, dispatch);

Checkout.propTypes = {updateCheckoutOptions : PropTypes.func.isRequired};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
