// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { request } from 'graphql-request';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import Button from '../../components/button';
import { defineNeed } from '../../data/font';
import { storeChosenWord, anonymousAuth } from '../../data/user';
import { importPresets } from '../../data/presets';
import { GRAPHQL_API } from '../../data/constants';
import { getAllPresets } from '../../data/queries';
import { setErrorPresets, setFetchingPresets } from '../../data/ui';
import './DefineNeed.css';

import { ReactComponent as DisplayIcon } from './display_icon.svg';
import { ReactComponent as TextIcon } from './text_icon.svg';
import { ReactComponent as LogoIcon } from './logotype_icon.svg';

class DefineNeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      logoNeedOpened: false,
      selected: undefined,
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleLogoNeed = this.toggleLogoNeed.bind(this);
  }
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.anonymousAuth();
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  toggleLogoNeed() {
    this.setState({ logoNeedOpened: !this.state.logoNeedOpened });
  }
  handleChange(event) {
    this.setState({ word: event.target.value });
  }
  handleSubmit(event) {
    if (this.state.word !== '') {
      this.props.storeChosenWord(this.state.word);
    }
    if (!this.state.isLoading && !this.props.errorPresets && !this.props.fetchingPresets) {
      this.setState({ isLoading: true });
      this.props.defineNeed(this.state.selected || 'dunno');
    }
    event.preventDefault();
  }
  render() {
    return (
      <div className="DefineNeed container">
        <div className="row">
          <div className="col-sm-12 col-md-11 col-lg-10">
            <h1>
              <FormattedMessage
                id="DefineNeed.welcome"
                defaultMessage="Welcome to Unique,"
                description="Define need page welcome"
              />
              <br />
              <FormattedMessage
                id="DefineNeed.title"
                defaultMessage="What kind of need do you have?"
                description="Define need page title"
              />
            </h1>
          </div>
        </div>
        <div className="needs row">
          <div
            className="col-sm-12 col-md-4 col-lg-4"
            onClick={() => this.setState({ selected: 'logo' })}
          >
            <div
              className={`need ${
                this.state.selected === 'logo' ? 'selected' : ''
              }`}
            >
              <LogoIcon className="need-icon" />
              <p className="need-title">
                <FormattedMessage
                  id="DefineNeed.logo"
                  defaultMessage="Logotype"
                  description="Logo need"
                />
              </p>
              <p className="need-description">
                <FormattedMessage
                  id="DefineNeed.logoTooltip"
                  defaultMessage="A logo font is blablabla blablabla blablabla"
                  description="logo need tooltip"
                />
              </p>
            </div>
          </div>
          <div
            className="col-sm-12 col-md-4 col-lg-4"
            onClick={() => this.setState({ selected: 'text' })}
            onDoubleClick={(e) => {
              this.setState({ selected: 'text' });
              this.handleSubmit(e);
            }}
          >
            <div
              className={`need ${
                this.state.selected === 'text' ? 'selected' : ''
              }`}
            >
              <TextIcon className="need-icon" />
              <p className="need-title">
                <FormattedMessage
                  id="DefineNeed.text"
                  defaultMessage="Text"
                  description="Text need"
                />
              </p>
              <p className="need-description">
                <FormattedMessage
                  id="DefineNeed.textTooltip"
                  defaultMessage="A text font is blablabla blablabla blablabla"
                  description="text need tooltip"
                />
              </p>
            </div>
          </div>
          <div
            className="col-sm-12 col-md-4 col-lg-4 "
            onClick={() => this.setState({ selected: 'display' })}
            onDoubleClick={(e) => {
              this.setState({ selected: 'display' });
              this.handleSubmit(e);
            }}
          >
            <div
              className={`need ${
                this.state.selected === 'display' ? 'selected' : ''
              }`}
            >
              <DisplayIcon className="need-icon" />
              <p className="need-title">
                <FormattedMessage
                  id="DefineNeed.Display"
                  defaultMessage="Display"
                  description="Display need"
                />
              </p>
              <p className="need-description">
                <FormattedMessage
                  id="DefineNeed.DisplayTooltip"
                  defaultMessage="A display font is blablabla blablabla blablabla"
                  description="Display need tooltip"
                />
              </p>
            </div>
          </div>
        </div>
        {this.state.selected === 'logo' ? (
          <div className="logoName">
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <h1>
                  <FormattedMessage
                    id="DefineNeed.brandTitle"
                    defaultMessage="What is your brand name?"
                    description="Brand name question"
                  />
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <form onSubmit={this.handleSubmit}>
                  <FormattedMessage
                    id="DefineNeed.brandInput"
                    defaultMessage="Type something"
                    description="Brand input placeholder"
                  >
                    {text => (
                      <input
                        type="text"
                        placeholder={text}
                        name="text"
                        onChange={this.handleChange}
                      />
                    )}
                  </FormattedMessage>
                </form>
              </div>
            </div>
          </div>
        ) : (
          false
        )}
        {this.props.errorPresets && (
          <div className="need-errorpresets">
            <FormattedMessage
              id="DefineNeed.error-presets"
              defaultMessage="Something happened while fetching the presets."
              description="Define need error presets text"
            />
            <FormattedMessage
              id="efineNeed.error-presets-text"
              defaultMessage="Retry?"
              description="Define need error presets button"
            >
              {text => (
                <Button
                  mode="text"
                  label={text}
                  className="need-error-presets-button"
                  loading={this.props.fetchingPresets}
                  onClick={(e) => {
                    this.props.setErrorPresets(false);
                    this.props.setFetchingPresets(true);
                    request(GRAPHQL_API, getAllPresets)
                      .then((data) => {
                        this.props.setFetchingPresets(false);
                        this.props.importPresets(data.getAllUniquePresets.presets);
                      })
                      .catch((error) => {
                        this.props.setErrorPresets(true);
                        this.props.setFetchingPresets(false);
                      });
                  }}
                />
              )}
            </FormattedMessage>
          </div>
        )}
        <div className="row actions">
          <div className="col-sm-12">
            <FormattedMessage
              id="DefineNeed.CTA"
              defaultMessage="Let's begin."
              description="Define need CTA"
            >
              {text => (
                <Button
                  mode="full"
                  label={text}
                  loading={this.props.fetchingPresets}
                  className={`need-submit ${
                    this.props.errorPresets || !this.state.selected
                      ? 'disabled'
                      : ''
                  } ${this.props.fetchingPresets ? 'need-submit-loading' : ''}`}
                  onClick={(e) => {
                    this.handleSubmit(e);
                  }}
                />
              )}
            </FormattedMessage>
            <span
              className="need-dunno"
              onClick={(e) => {
                this.setState({ selected: 'dunno' });
                this.handleSubmit(e);
              }}
            >
              <FormattedMessage
                id="DefineNeed.dunno"
                defaultMessage="Dunno"
                description="Dunno need"
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.presets.isLoading,
  errorPresets: state.ui.errorPresets,
  fetchingPresets: state.ui.fetchingPresets,
  isAuthenticated: typeof state.user.graphqlID === 'string',
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      defineNeed,
      storeChosenWord,
      importPresets,
      redirectToLanding: () => push('/'),
      setErrorPresets,
      setFetchingPresets,
      anonymousAuth,
    },
    dispatch,
  );

DefineNeed.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  defineNeed: PropTypes.func.isRequired,
  storeChosenWord: PropTypes.func.isRequired,
  redirectToLanding: PropTypes.func.isRequired,
  setErrorPresets: PropTypes.func.isRequired,
  setFetchingPresets: PropTypes.func.isRequired,
  errorPresets: PropTypes.bool.isRequired,
  fetchingPresets: PropTypes.bool.isRequired,
  anonymousAuth: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefineNeed));
