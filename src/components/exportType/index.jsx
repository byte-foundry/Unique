// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { storeExportType,
  exportFontToPrototypoWithAccount,
  exportFontToPrototypoWithoutAccount,
} from '../../data/user';
import Checkout from '../checkout';
import Button from '../button';
import './ExportType.css';

const ExportTypeComponent = props => (
  <div>
    {props.choice.direct ? (
      <Checkout
        title="Prototypo Lite"
        amount={props.choice.price}
        description={props.choice.paymentDescription}
      >
        <div
          className={`ExportType ${props.expanded ? 'expanded' : ''}`}
          role="button"
          tabIndex="0"
          onClick={props.expanded ? () => {} : props.selectChoice}
        >
          <div className="card">
            <div className="image" />
            <div className="title">{props.choice.title}</div>
          </div>
        </div>
      </Checkout>
    ) : (
      <div>
        {props.expanded ? (
          <Button className="ExportBack" label="" mode="isBack" onClick={props.removeChoice} />
        ) : (
          false
        )}
        <div
          className={`ExportType ${props.expanded ? 'expanded row' : ''}`}
          role="button"
          tabIndex="0"
          onClick={props.expanded ? () => {} : props.selectChoice}
        >
          <div className={`card ${props.expanded ? 'col-sm-12 col-md-6' : ''}`}>
            <div className="image" />
            <div className="title">{props.choice.title}</div>
          </div>
          <div className={`description ${props.expanded ? 'col-sm-12 col-md-6' : ''}`}>
            {props.choice.description}
            {props.choice.component ? { ...props.choice.component } : false}
          </div>
        </div>
      </div>
    )}
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ storeExportType }, dispatch);

ExportTypeComponent.propTypes = {
  storeExportType: PropTypes.func.isRequired,
  choice: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.element,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    paymentDescription: PropTypes.string.isRequired,
    direct: PropTypes.bool,
    component: PropTypes.node,
  }).isRequired,
  selectChoice: PropTypes.func.isRequired,
  removeChoice: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
};

ExportTypeComponent.defaultProps = {
  expanded: false,
};

export const ExportType = connect(mapStateToProps, mapDispatchToProps)(ExportTypeComponent);

class ExportToPrototypoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      password: '',
      firstName: '',
      lastName: '',
      family: '',
      variant: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFamilyChange = this.handleFamilyChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleVariantChange = this.handleVariantChange.bind(this);
    this.handleSubmitNoAccount = this.handleSubmitNoAccount.bind(this);
    this.handleSubmitWithAccount = this.handleSubmitWithAccount.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleFamilyChange(event) {
    this.setState({ family: event.target.value });
  }

  handleVariantChange(event) {
    this.setState({ variant: event.target.value });
  }

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  handleSubmitNoAccount(event) {
    this.props.exportFontToPrototypoWithoutAccount(
      this.state.email,
      this.state.password,
      this.state.family,
      this.state.variant,
      this.state.firstName,
      this.state.lastName,
    );
    event.preventDefault();
  }

  handleSubmitWithAccount(event) {
    this.props.exportFontToPrototypoWithAccount(
      this.state.email,
      this.state.password,
      this.state.family,
      this.state.variant,
    );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.prototypoAccount).length > 0 ? (
          <div>
            <p>
              We found a Protoypo account under your email.<br />
              Please log-in to export
            </p>
            <form onSubmit={this.handleSubmitWithAccount}>
              <label htmlFor="email">
                email:{' '}
                <input
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </label>
              <br />
              <label htmlFor="password">
                password:{' '}
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </label>
              <br />
              <label htmlFor="family">
                family name:{' '}
                <input
                  name="family"
                  type="text"
                  value={this.state.family}
                  onChange={this.handleFamilyChange}
                />
              </label>
              <br />
              <label htmlFor="variant">
                variant name: {' '}
                <input
                  name="variant"
                  type="text"
                  value={this.state.variant}
                  onChange={this.handleVariantChange}
                />
              </label>
              <br />
              <input type="submit" value="Export to prototypo" />
            </form>
          </div>
        ) : (
          <div>
            <div>No account found. Register</div>
            <form onSubmit={this.handleSubmitNoAccount}>
              <label htmlFor="email">
                email:{' '}
                <input
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </label>
              <br />
              <label htmlFor="password">
                password:{' '}
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </label>
              <br />
              <label htmlFor="firstName">
                first Name:{' '}
                <input
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                />
              </label>
              <br />
              <label htmlFor="lastName">
                last Name:{' '}
                <input
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                />
              </label>
              <br />
              <label htmlFor="family">
                family name:{' '}
                <input
                  name="family"
                  type="text"
                  value={this.state.family}
                  onChange={this.handleFamilyChange}
                />
              </label>
              <br />
              <label htmlFor="variant">
                variant name:{' '}
                <input
                  name="variant"
                  type="text"
                  value={this.state.variant}
                  onChange={this.handleVariantChange}
                />
              </label>
              <br />
              <input type="submit" value="Export to prototypo" />
            </form>
          </div>
        )}
      </div>
    );
  }
}

const ExportToPrototypoComponentMapStateToProps = state => ({
  prototypoAccount: state.user.prototypoUser,
  email: state.user.email,
});

const ExportToPrototypoComponentMapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      exportFontToPrototypoWithAccount,
      exportFontToPrototypoWithoutAccount,
    },
    dispatch,
  );

ExportToPrototypoComponent.propTypes = {
  prototypoAccount: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  exportFontToPrototypoWithAccount: PropTypes.func.isRequired,
  exportFontToPrototypoWithoutAccount: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export const ExportToPrototypo = connect(
  ExportToPrototypoComponentMapStateToProps,
  ExportToPrototypoComponentMapDispatchToProps,
)(ExportToPrototypoComponent);
