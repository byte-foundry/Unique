// @flow
import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import {SketchPicker} from 'react-color';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './CustomLogo.css';

class CustomLogo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayTextColorPicker: false,
			displayShadowColorPicker: false,
			hideSettings: false,
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
			letterSpacing: 4,
			fontSize: 70,
			shadowStrokeWidth: 1,
			shadowStrokeAngle: 45,
			shadowOffsetX: 6,
			shadowOffsetY: 6,
			shadowStrokeSpacing: 3,
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
		} else {
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
					height={`${this.state.fontSize * 2}px`}
					xmlSpace="preserve"
				>
					<defs>
						<pattern
							id="pattern"
							width={this.state.shadowStrokeWidth}
							height={this.state.shadowStrokeSpacing}
							patternUnits="userSpaceOnUse"
							patternTransform={`rotate(${this.state.shadowStrokeAngle})`}
						>
							<rect
								x="0"
								y="0"
								width={this.state.shadowStrokeWidth}
								height={this.state.shadowStrokeWidth}
								fill={`rgba(${this.state.shadowColor.r}, ${
									this.state.shadowColor.g
								}, ${this.state.shadowColor.b}, ${this.state.shadowColor.a})`}
							/>
						</pattern>

						<text
							id="text"
							x="310"
							y={this.state.fontSize}
							fontFamily={this.props.fontName}
							fontSize={this.state.fontSize}
							letterSpacing={`${this.state.letterSpacing}px`}
							textAnchor="middle"
						>
							{this.props.word}
						</text>

						<mask id="mask">
							<rect
								x="0"
								y="0"
								width="100%"
								height="100%"
								fill={`rgba(${this.state.shadowColor.r}, ${
									this.state.shadowColor.g
								}, ${this.state.shadowColor.b}, ${this.state.shadowColor.a})`}
							/>
							<use
								x={-this.state.shadowOffsetX}
								y={-this.state.shadowOffsetY}
								stroke={`rgba(${this.state.shadowColor.r}, ${
									this.state.shadowColor.g
								}, ${this.state.shadowColor.b}, ${this.state.shadowColor.a})`}
								strokeWidth="1"
								xlinkHref="#text"
								opacity="1"
								fill={`rgba(${this.state.shadowColor.r}, ${
									this.state.shadowColor.g
								}, ${this.state.shadowColor.b}, ${this.state.shadowColor.a})`}
							/>
						</mask>
					</defs>

					<use
						x={this.state.shadowOffsetX}
						y={this.state.shadowOffsetY}
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
				<div
					className="config"
					style={{display: this.props.shouldShowControls ? 'block' : 'none'}}
				>
					<div>
						Text color:
						<div
							style={styles.swatch}
							onClick={() => {
								this.handleClick('text');
							}}
						>
							<div style={styles.textColor} />
						</div>
						{this.state.displayTextColorPicker ? (
							<div style={styles.popover}>
								<div
									style={styles.cover}
									onClick={() => {
										this.handleClose('text');
									}}
								/>
								<SketchPicker
									color={this.state.textColor}
									onChange={this.handleChange}
								/>
							</div>
						) : null}
					</div>
					<div>
						Shadow color:
						<div
							style={styles.swatch}
							onClick={() => {
								this.handleClick('shadow');
							}}
						>
							<div style={styles.shadowColor} />
						</div>
						{this.state.displayShadowColorPicker ? (
							<div style={styles.popover}>
								<div
									style={styles.cover}
									onClick={() => {
										this.handleClose('shadow');
									}}
								/>
								<SketchPicker
									color={this.state.shadowColor}
									onChange={this.handleChange}
								/>
							</div>
						) : null}
					</div>
					<div>
						Letter spacing :
						<InputRange
							maxValue={20}
							minValue={-20}
							value={this.state.letterSpacing}
							onChange={(letterSpacing) => this.setState({letterSpacing})}
						/>
					</div>
					<div>
						Font size :
						<InputRange
							maxValue={140}
							minValue={10}
							value={this.state.fontSize}
							onChange={(fontSize) => this.setState({fontSize})}
						/>
					</div>
					<div>
						Shadow stroke width :
						<InputRange
							maxValue={20}
							minValue={0}
							value={this.state.shadowStrokeWidth}
							onChange={(shadowStrokeWidth) =>
								this.setState({shadowStrokeWidth})
							}
						/>
					</div>
					<div>
						Shadow stroke spacing :
						<InputRange
							maxValue={20}
							minValue={0}
							value={this.state.shadowStrokeSpacing}
							onChange={(shadowStrokeSpacing) =>
								this.setState({shadowStrokeSpacing})
							}
						/>
					</div>
					<div>
						Shadow stroke angle :
						<InputRange
							maxValue={180}
							minValue={0}
							value={this.state.shadowStrokeAngle}
							onChange={(shadowStrokeAngle) =>
								this.setState({shadowStrokeAngle})
							}
						/>
					</div>
					<div>
						Shadow offset X :
						<InputRange
							maxValue={30}
							minValue={-30}
							value={this.state.shadowOffsetX}
							onChange={(shadowOffsetX) => this.setState({shadowOffsetX})}
						/>
					</div>
					<div>
						Shadow offset Y :
						<InputRange
							maxValue={30}
							minValue={-30}
							value={this.state.shadowOffsetY}
							onChange={(shadowOffsetY) => this.setState({shadowOffsetY})}
						/>
					</div>
				</div>
			</div>
		);
	}
}

CustomLogo.propTypes = {
	word: PropTypes.string.isRequired,
	fontName: PropTypes.string.isRequired,
	shouldShowControls: PropTypes.bool,
};

CustomLogo.defaultProps = {
	shouldShowControls: true,
};

export default CustomLogo;
