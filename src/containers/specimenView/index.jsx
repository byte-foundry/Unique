// @flow
import React from 'react';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SpecimenView.css';
import Button from '../../components/button/';

class SpecimenView extends React.Component {
  constructor(props) {
    super(props);
    if (props.step === 0) {
      props.redirectToHome();
    }
  }
  render() {
    return (
      <div className="SpecimenView">
        <Button className="back" label="Back" onClick={() => this.props.goBack()} />
        <h3>Hooray !</h3>
        <h3 className="subtitle"> You have created the perfect bespoke font for your project</h3>
        <div className="specimen" style={{ fontFamily: this.props.fontName }}>
          <div className="left">
            <h2>Hamburgefonstiv - Abc 123</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
          <div className="right">
            <p>0123456789</p>
            <p>abcdefghijklmnopqrstuvwxyz</p>
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p>The quick brown fox jumps over the lazy dog</p>
            <p>Buvez de ce whisky que le patron juge fameux</p>
          </div>
        </div>
        <form>
          <input type="email" placeholder="your email" />
          <button type="button">Download</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fontName: state.font.currentPreset.preset + state.font.currentPreset.variant,
  step: state.font.step,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  goBack: () => push('/customize'),
  redirectToHome: () => push('/'),
}, dispatch);

SpecimenView.propTypes = {
  goBack: PropTypes.func.isRequired,
  redirectToHome: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  fontName: PropTypes.string,
};

SpecimenView.defaultProps = {
  fontName: 'ptypo',
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecimenView));
