// @flow
import React from "react";
import PropTypes from "prop-types";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import "./CustomLogo.css";

class CustomLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTextColorPicker: false,
      displayShadowColorPicker: false,
      textColor: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
      shadowColor: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick(picker) {
    switch (picker) {
      case 'text':
        this.setState({
          displayTextColorPicker: !this.state.displayTextColorPicker,
        });
        break;
      case 'shadow':
        this.setState({
          displayShadowColorPicker: !this.state.displayShadowColorPicker,
        });
        break;
      default:
        break;
    }
  }
  handleClose(picker) {
    switch (picker) {
      case 'text':
        this.setState({
          displayTextColorPicker: !this.state.displayTextColorPicker,
        });
        break;
      case 'shadow':
        this.setState({
          displayShadowColorPicker: !this.state.displayShadowColorPicker,
        });
        break;
      default:
        break;
    }
  }
  handleChange(color) {
    if (this.state.displayTextColorPicker) {
        this.setState({
            textColor: color.rgb,
          });
    }
    else {
        this.setState({
            shadowColor: color.rgb,
          });
    }
  }
  render() {
    const styles = reactCSS({
      default: {
        textColor: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.textColor.r}, ${
            this.state.textColor.g
          }, ${this.state.textColor.b}, ${this.state.textColor.a})`,
        },
        shadowColor: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgba(${this.state.shadowColor.r}, ${
              this.state.shadowColor.g
            }, ${this.state.shadowColor.b}, ${this.state.shadowColor.a})`,
          },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    return (
      <div className="CustomLogo">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="620px"
          height="100px"
          xmlSpace="preserve"
        >
          <defs>
            <pattern
              id="pattern"
              width="1"
              height="3"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect x="0" y="0" width="1" height=".8" fill={`rgba(${this.state.shadowColor.r}, ${this.state.shadowColor.g}, ${
              this.state.shadowColor.b
            }, ${this.state.shadowColor.a})`} />
            </pattern>

            <text
              id="text"
              x="310"
              y="70"
              fontFamily={this.props.fontName}
              fontSize="70"
              letterSpacing="15px"
              textAnchor="middle"
            >
              {this.props.word}
            </text>

            <mask id="mask">
              <rect x="0" y="0" width="100%" height="100%" fill={`rgba(${this.state.shadowColor.r}, ${this.state.shadowColor.g}, ${
              this.state.shadowColor.b
            }, ${this.state.shadowColor.a})`} />
              <use
                x="-6"
                y="-6"
                stroke={`rgba(${this.state.shadowColor.r}, ${this.state.shadowColor.g}, ${
                    this.state.shadowColor.b
                  }, ${this.state.shadowColor.a})`}
                strokeWidth="5"
                xlinkHref="#text"
                opacity="1"
                fill={`rgba(${this.state.shadowColor.r}, ${this.state.shadowColor.g}, ${
              this.state.shadowColor.b
            }, ${this.state.shadowColor.a})`}
              />
            </mask>
          </defs>

          <use
            x="6"
            y="6"
            xlinkHref="#text"
            opacity="1"
            fill="url(#pattern)"
            mask="url(#mask)"
          />

          <use
            x="0"
            y="0"
            xlinkHref="#text"
            fill={`rgba(${this.state.textColor.r}, ${this.state.textColor.g}, ${
              this.state.textColor.b
            }, ${this.state.textColor.a})`}
          />
        </svg>
        <div className="config">
          <div>
            Text color:
            <div style={styles.swatch} onClick={() => { this.handleClick('text'); }}>
              <div style={styles.textColor} />
            </div>
            {this.state.displayTextColorPicker ? (
              <div style={styles.popover}>
                <div style={styles.cover} onClick={() => { this.handleClose('text'); }} />
                <SketchPicker
                  color={this.state.textColor}
                  onChange={this.handleChange}
                />
              </div>
            ) : null}
          </div>
          <div>
            Shadow color:
            <div style={styles.swatch} onClick={() => { this.handleClick('shadow'); }}>
              <div style={styles.shadowColor} />
            </div>
            {this.state.displayShadowColorPicker ? (
              <div style={styles.popover}>
                <div style={styles.cover} onClick={() => { this.handleClose('shadow'); }} />
                <SketchPicker
                  color={this.state.shadowColor}
                  onChange={this.handleChange}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CustomLogo.propTypes = {
  word: PropTypes.string.isRequired,
  fontName: PropTypes.string.isRequired,
};

CustomLogo.defaultProps = {};

export default CustomLogo;
