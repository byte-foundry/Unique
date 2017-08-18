// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import './Sliders.css';

const getBaseParams = (values, choices, controls) => {
  const params = [];
  const keys = {};
  choices.forEach((choice) => {
    Object.keys(choice.values).forEach((key) => {
      if (!keys[key] && key !== 'manualChanges' && key !== 'name') {
        params.push({ name: key, initialValue: values[key] });
        keys[key] = true;
      }
    });
  });

  params.forEach((param) => {
    controls.forEach((control) => {
      control.parameters.forEach((controlParam) => {
        if (param.name === controlParam.name) {
          param.minValue = controlParam.minAdvised;
          param.maxValue = controlParam.maxAdvised;
          param.step = controlParam.step;
        }
      });
    });
  });
  return params;
};

class Sliders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: getBaseParams(props.currentFontValues, props.choices, props.controls),
      values: {},
    };
    this.onSliderChange = debounce(this.onSliderChange, 100).bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      params: getBaseParams(newProps.currentFontValues, newProps.choices, newProps.controls),
    });
  }

  onSliderChange(e, name) {
    const values = this.state.values;
    values[name] = e.target.value;
    this.setState({ values });
    this.props.onUpdate({ name, value: e.target.value });
  }

  render() {
    return (
      <div className="Sliders">
        {this.state.params.map(param =>
          (<div className="slider" key={param.name}>
            <label htmlFor={param.name}>
              {param.name}
            </label>
            <input
              type="range"
              name={param.name}
              min={param.minValue}
              max={param.maxValue}
              step={param.step}
              defaultValue={param.initialValue}
              onChange={(event) => { event.persist(); this.onSliderChange(event, param.name); }}
            />
          </div>),
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentFontValues: { ...state.font.stepBaseValues, ...state.font.currentParams },
  choices: state.font.currentPreset.steps[state.font.step - 1].choices,
  controls: state.font.currentPreset.font.json.controls,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

Sliders.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

Sliders.defaultProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sliders));
