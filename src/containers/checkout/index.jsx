// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Masonry from '../../components/masonry';
import { updateCheckoutOptions } from '../../data/user';
import { createFontVariants } from '../../data/font';
import { ReactComponent as OtfLogo } from './otf.svg';
import { ReactComponent as SpecimenLogo } from './specimen.svg';
import { ReactComponent as Back } from '../stepView/back.svg';

import './Checkout.css';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    const { steps, choicesMade } = props;
    const thicknessStepIndex = steps.findIndex(step => step.name.toUpperCase() === 'THICKNESS');
    const defaultThicknessName = choicesMade[thicknessStepIndex]
      ? choicesMade[thicknessStepIndex].name
      : 'regular';
    this.state = {
      selectedOptions: [
        {
          name: (
            <FormattedMessage
              id="CheckoutView.OtfOption"
              defaultMessage="Font package"
              description="Otf"
            />
          ),
          class: 'otf-logo',
          logo: <OtfLogo style={{ fontFamily: `'${props.fontName}'` }} />,
          type: 'logo',
          price: 0,
          selected: true,
          dbName: 'baseFont',
          visible: true,
          styleName: defaultThicknessName,
        },
        {
          name: (
            <FormattedMessage
              id="CheckoutView.LaunchDiscountOption"
              defaultMessage="Launch discount"
              description="Launch discount"
            />
          ),
          class: 'discount',
          dbName: 'launchDiscount',
          type: 'discount',
          price: -20,
          selected: true,
          visible: false,
        },
      ],
      defaultThicknessName,
    };
    props.updateCheckoutOptions(
      this.state.selectedOptions,
      props.history.location.fontName,
    );
    props.createFontVariants();
    this.toggleChoice = this.toggleChoice.bind(this);
  }
  componentDidUpdate() {
    document.querySelector('.otfLogoTextSpecimenName').innerHTML = this.props.familyName;
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.querySelector('.otfLogoTextSpecimenName').innerHTML = this.props.familyName;
    document.querySelector('.otfLogoTextSpecimenVariant').innerHTML = this.state.defaultThicknessName;
  }
  toggleChoice(name) {
    const { selectedOptions } = this.state;
    const selectedIndex = selectedOptions.findIndex(option => option.name === name);
    selectedOptions[selectedIndex].selected = !this.state.selectedOptions[
      selectedIndex
    ].selected;
    this.setState({ selectedOptions });
    this.props.updateCheckoutOptions(
      selectedOptions,
      this.props.history.location.fontName,
    );
  }
  componentWillMount() {
    this.props.updateCheckoutOptions(
      this.state.selectedOptions,
      this.props.history.location.fontName,
    );
  }
  componentWillReceiveProps(newProps) {
    const { selectedOptions } = this.state;
    const filteredSelectedOption = selectedOptions.filter(e => e.type !== 'font');
    newProps.possibleVariants.forEach((option) => {
      filteredSelectedOption.push({
        name: option.variant,
        class: 'variant',
        type: 'font',
        dbName: 'italicOption',
        fontName: option.name,
        price: 5,
        selected: false,
        visible: true,
      });
    });
    this.setState({ selectedOptions: filteredSelectedOption });
  }
  render() {
    console.log(this.props);
    return (
      <div className="Checkout">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h2>
                <FormattedMessage
                  id="CheckoutView.title"
                  defaultMessage="Create your Unique package:"
                  description="Checkout view title"
                />
              </h2>
              <p className="checkout-description">
                <FormattedMessage
                  id="CheckoutView.description"
                  defaultMessage="Your font is ready for download as an OTF file and you get your font sample included in your package. Feel free to add variants of your font by selecting the ones you’d like to buy."
                  description="Checkout view description"
                />
              </p>
              <p
                className="checkout-goback"
                onClick={() => {
                  this.props.goBack();
                }}
              >
                <FormattedMessage
                  id="CheckoutView.goBack"
                  defaultMessage="Back to edit mode"
                  description="Checkout view go back text"
                />
              </p>
              <div className="checkout-options row">
                {this.state.selectedOptions
                  .filter(e => e.visible)
                  .map((checkoutOption, index) => (
                    <div
                      className={`option col-sm-12 ${checkoutOption.class} ${
                        checkoutOption.selected ? 'selected' : ''
                      }`}
                      onClick={() => {
                        if (index !== 0) {
                          this.toggleChoice(checkoutOption.name);
                        }
                      }}
                    >
                      {checkoutOption.type === 'logo' && (
                        <div className="logo">{checkoutOption.logo}</div>
                      )}
                      {checkoutOption.type === 'font' && (
                        <div className="font-wrapper">
                          <span
                            style={{
                              fontFamily: `'${checkoutOption.fontName}'`,
                            }}
                          >
                            {this.props.chosenWord}
                          </span>
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
                      <p className="option-title">
                        {checkoutOption.type === 'font' && (
                          <span>
                            {this.props.history.location.fontName}&nbsp;
                          </span>
                        )}
                        {checkoutOption.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chosenWord: state.user.chosenWord,
  possibleVariants: state.font.possibleVariants,
  choicesMade: state.font.choicesMade,
  steps: state.font.currentPreset.steps,
  familyName: state.user.currentProject.name,
  fontName:
    state.font.currentPreset.variant.family.name +
    state.font.currentPreset.variant.name,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      goBack: () => push('/app/specimen'),
      updateCheckoutOptions,
      createFontVariants,
    },
    dispatch,
  );

Checkout.propTypes = {
  updateCheckoutOptions: PropTypes.func.isRequired,
  chosenWord: PropTypes.string.isRequired,
  fontName: PropTypes.string,
  createFontVariants: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
