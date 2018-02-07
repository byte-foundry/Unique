// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { resetSliderFont } from '../../data/font';
import { params } from '../../data/labels';
import './Sliders.css';

const getBaseParams = (values, choices, controls) => {
  const customParams = [];
  const keys = {};
  choices.forEach((choice) => {
    Object.keys(choice.values).forEach((key) => {
      console.log('> Adding custom slider')
      console.log(key)
      console.log(params[key])
      if (!keys[key] && key !== 'manualChanges' && key !== 'name' && key !== 'glyphComponentChoice' && key !== 'glyphSpecialProps' && key !== 'indiv_group_param' && key !== 'indiv_glyphs') {
        customParams.push({ name: params[key].title, initialValue: values[key], key });
        keys[key] = true;
      }
    });
  });

  customParams.forEach((param) => {
    controls.forEach((control) => {
      control.parameters.forEach((controlParam) => {
        if (param.key === controlParam.name) {
          param.minValue = controlParam.minAdvised;
          param.maxValue = controlParam.maxAdvised;
          param.step = controlParam.step;
        }
      });
    });
  });
  return customParams;
};

class Sliders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: getBaseParams(props.currentFontValues, props.choices, props.controls),
      values: {},
    };
    this.onSliderChange = debounce(this.onSliderChange, 50).bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      params: getBaseParams(newProps.currentFontValues, newProps.choices, newProps.controls),
    });
  }

  componentWillUnmount() {
    this.props.resetSliderFont();
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
              onChange={(event) => { event.persist(); this.onSliderChange(event, param.key); }}
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
  controls: state.createdFonts.fonts[state.font.fontName].json.controls,
});

const mapDispatchToProps = dispatch => bindActionCreators({ resetSliderFont }, dispatch);

Sliders.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  resetSliderFont: PropTypes.func.isRequired,
};

Sliders.defaultProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sliders));
