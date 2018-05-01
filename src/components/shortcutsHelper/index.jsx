// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './ShortcutsHelper.css';

const ShortcutsHelper = props => (
  <div className="ShortcutsHelper">
    {props.shouldShowTooltips ?
      (<div className="tooltip-backdrop" onClick={() => { props.toggleTooltips() }} />)
      : false
    }
    <div className="tooltip-button" onClick={() => { props.toggleTooltips() }}>
      {props.isBlackOnWhite ? 'c' : 'b'}
    </div>
  </div>
);

ShortcutsHelper.propTypes = {
  shouldShowTooltips: PropTypes.bool.isRequired,
  toggleTooltips: PropTypes.func.isRequired,
};

export default ShortcutsHelper;
