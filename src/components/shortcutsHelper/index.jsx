// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './ShortcutsHelper.css';

const ShortcutsHelper = props => (
  <div className="ShortcutsHelper">
    <ul>
      {props.shortcuts.map(shortcut => (
        <li key={`key${shortcut.name}`}>
          <span className="name">{shortcut.name}:</span>
          <span className="key">{' '}{shortcut.key}</span>
        </li>
      ))}
    </ul>
  </div>
);

ShortcutsHelper.propTypes = {
  shortcuts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
      }),
  ).isRequired,
};

export default ShortcutsHelper;
