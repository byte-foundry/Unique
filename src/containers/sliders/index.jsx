// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import PropTypes from 'prop-types';
import { resetSliderFont } from '../../data/font';
import { params } from '../../data/labels';
import './Sliders.css';

const getBaseParams = (values, choices, controls) => {
  const customParams = [];
  const keys = {};
  choices.forEach((choice) => {
    Object.keys(choice.values).forEach((key) => {
      console.log('> Adding custom slider');
      console.log(key);
      console.log(params[key]);
      if (!keys[key] && key !== 'manualChanges' && key !== 'name' && key !== 'glyphComponentChoice' && key !== 'glyphSpecialProps' && key !== 'indiv_group_param' && key !== 'indiv_glyphs' && key !== 'altList') {
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
    const params = getBaseParams(props.currentFontValues, props.choices, props.controls);
    const values = params.reduce(function(result, item) {
      result[item.key] = item.initialValue;
      return result;
    }, {});

    this.state = {
      params,
      values,
    };
    this.onSliderChange = debounce(this.onSliderChange, 40).bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      params: getBaseParams(newProps.currentFontValues, newProps.choices, newProps.controls),
    });
  }

  componentWillUnmount() {
    this.props.resetSliderFont();
  }

  onSliderChange(value, name) {
    const values = this.state.values;
    values[name] = value;
    this.setState({ values });
    this.props.onUpdate({ name, value });
  }

  render() {
    return (
      <div className="Sliders">
        {this.state.params.map(param =>
          (<div className="slider" key={param.name}>
            <label htmlFor={param.name}>
              {param.name}
            </label>
            <Slider
              min={param.minValue}
              max={param.maxValue}
              step={param.step}
              value={this.state.values[param.key]}
              orientation='horizontal'
              tooltip={false}
              onChange={(value) => {this.onSliderChange(value, param.key); }}
            />
          </div>))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentFontValues: { ...state.font.stepBaseValues, ...state.font.currentParams },
  choices: state.font.currentPreset.steps[state.font.step - 1].choices,
  controls: state.createdFonts.fonts[state.font.fontName] ? state.createdFonts.fonts[state.font.fontName].json.controls : [],
});

const mapDispatchToProps = dispatch => bindActionCreators({ resetSliderFont }, dispatch);

Sliders.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  resetSliderFont: PropTypes.func.isRequired,
};

Sliders.defaultProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sliders));
