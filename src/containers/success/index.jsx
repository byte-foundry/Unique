// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import Button from '../../components/button/';
import { download } from '../../data/font';
import './Success.css';

const Success = props => (
  <div className="Success">
    {(() => {
      switch (props.exportType) {
        case 'download':
          return (
            <div>
              <h1>Congrats!</h1>
              <br />
              <br />
              <Button className="download" label="Download font" onClick={() => props.download()} />
              <br />
              <br />
              <Button
                className="goHome"
                label="Create another font"
                onClick={() => props.redirectToHome()}
              />
            </div>
          );
        case 'prototypo':
          return (
            <div>
              <h1>Thanks for exporting to Prototypo!</h1>
              <br />
              <p>You can now log in to Protypo and refine your font even more</p>
              <br />
              <br />
              <Button
                className="goHome"
                label="Create another font"
                onClick={() => props.redirectToHome()}
              />
            </div>
          );
        default:
          return false;
      }
    })()}
  </div>
);

const mapStateToProps = state => ({
  exportType: state.user.exportType,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      redirectToHome: () => push('/'),
      download,
    },
    dispatch,
  );

Success.propTypes = {
  redirectToHome: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
  exportType: PropTypes.string.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Success));
