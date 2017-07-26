// @flow
import React from 'react';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './FinalView.css';
import Button from '../../components/button/';

class FinalView extends React.Component {
  constructor(props) {
    super(props);
    if (props.step === 0) {
      props.redirectToHome();
    }
  }
  render() {
    return (
      <div className="FinalView">
        <Button className="back" label="Back" onClick={() => this.props.goBack()} />
        <h1 style={{ fontFamily: this.props.fontName }}>Congrats!</h1>
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

FinalView.propTypes = {
  goBack: PropTypes.func.isRequired,
  redirectToHome: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  fontName: PropTypes.string,
};

FinalView.defaultProps = {
  fontName: 'ptypo',
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FinalView));
