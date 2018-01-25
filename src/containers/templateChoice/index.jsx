// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
import { Shortcuts } from 'react-shortcuts';
import './TemplateChoice.css';
import ShortcutsHelper from '../../components/shortcutsHelper';
import Template from '../../components/template/';
import Button from '../../components/button/';

import { selectFont } from '../../data/font';

const isMostSelected = (presets, font) => {
  let most = presets[0].id;
  let value = 0;
  presets.forEach((preset) => {
    if (preset.selected > value) {
      value = preset.selected;
      most = preset.id;
    }
  });
  return font.id === most && value > 0;
};

class TemplateChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templateIndex: -1,
    }
    this.handleShortcuts = this.handleShortcuts.bind(this);
  }
  componentDidMount() {
    this.templateChoiceWrapper.focus();
  }
  handleShortcuts(action, event) {
    switch (action) {
      case 'CHOICE_PREVIOUS':
        if (this.state.templateIndex !== -1) {
          if (this.state.templateIndex === 0) {
            this.setState({ templateIndex: this.props.presets.length - 1 });
            break;
          } else {
            this.setState({ templateIndex: this.state.templateIndex - 1 });
            break;
          }
        } else {
          this.setState({ templateIndex: this.props.presets.length - 1 });
          break;
        }
      case 'CHOICE_NEXT':
        if (this.state.templateIndex !== -1) {
          if (this.state.templateIndex === this.props.presets.length - 1) {
            this.setState({ templateIndex: 0 });
            break;
          } else {
            this.setState({ templateIndex: this.state.templateIndex + 1 });
            break;
          }
        } else {
          this.setState({ templateIndex: 0 });
          break;
        }
      case 'CHOICE_SELECT':
        if (this.state.templateIndex !== -1 && !this.props.isLoading) {
          this.props.selectFont(this.props.presets[this.state.templateIndex]);
        }
        break;
      case 'STEP_BACK':
        this.props.redirectToHome();
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <Shortcuts
        name="CHOICES"
        handler={this.handleShortcuts}
      >
        <div className="TemplateChoice" ref={(c) => { this.templateChoiceWrapper = c; }} tabIndex="-1">
          <Button label="Back" className="back" mode="isBack" onClick={() => this.props.redirectToHome()} />
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1>Pick something that you like and edit it!</h1>
              </div>
            </div>
            <div className="template-wrapper">
              <FlipMove
                duration={200}
                easing="ease"
                appearAnimation="accordionHorizontal"
                enterAnimation="accordionHorizontal"
                leaveAnimation="accordionHorizontal"
                staggerDurationBy="20"
                staggerDelayBy="40"
              >
                {this.props.presets.map((font) => {
                  return (
                    <div className="row" key={`${font.preset}${font.variant}`}>
                      <div className="col-sm-12">
                        <Template
                          font={font}
                          selectFont={this.props.selectFont}
                          selected={
                            this.state.templateIndex !== -1
                            &&
                            `${this.props.presets[this.state.templateIndex].preset}${this.props.presets[this.state.templateIndex].variant}` === `${font.preset}${font.variant}`}
                          text={this.props.chosenWord}
                          mostSelected={isMostSelected(this.props.presets, font)}
                          isLoading={this.props.isLoading}
                        />
                      </div>
                    </div>
                  );
                })}
              </FlipMove>
            </div>
            {this.props.isLoading
            ? (<h2>Loading font...</h2>)
            : false}
          </div>
        </div>
        <ShortcutsHelper
          shortcuts={[
            { name: 'Select previous choice', key: 'up' },
            { name: 'Select next choice', key: 'down' },
            { name: 'Validate choice selected', key: 'enter' },
            { name: 'Step back', key: 'b, backspace, left' },
          ]}
        />
      </Shortcuts>
    );
  }
} 

const mapStateToProps = state => ({
  presets: state.presets.importedPresets,
  isLoading: state.font.isLoading,
  chosenWord: state.user.chosenWord,
});
const mapDispatchToProps = dispatch => bindActionCreators({ selectFont, redirectToHome: () => push('/') }, dispatch);

TemplateChoice.propTypes = {
  selectFont: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  redirectToHome: PropTypes.func.isRequired,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      preset: PropTypes.string.isRequired,
      variant: PropTypes.string.isRequired,
    }),
  ).isRequired,
  chosenWord: PropTypes.string,
};

TemplateChoice.defaultProps = {
  chosenWord: 'Hamburgefonstiv - Abc 123',
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateChoice);
