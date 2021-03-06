// @flow
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import backIcon from './return.svg';

const Button = (props) => (
	<span
		role="button"
		className={`Button ${props.className} ${props.mode}`}
		onClick={props.onClick}
		tabIndex="0"
	>
		{(() => {
			switch (props.mode) {
				case 'isBack':
					return <img src={backIcon} alt="Icon back" />;
				case 'isConfigure':
					return <span>{props.label}</span>;
				default:
					if (props.loading) {
						return (
							<svg
								version="1.1"
								id="Layer_1"
								x="0px"
								y="0px"
								width="24px"
								height="30px"
								viewBox="0 0 24 30"
								style={{enableBackground: 'new 0 0 50 50'}}
							>
								<rect x="0" y="13" width="4" height="5" fill="#fff">
									<animate
										attributeName="height"
										attributeType="XML"
										values="5;21;5"
										begin="0s"
										dur="0.6s"
										repeatCount="indefinite"
									/>
									<animate
										attributeName="y"
										attributeType="XML"
										values="13; 5; 13"
										begin="0s"
										dur="0.6s"
										repeatCount="indefinite"
									/>
								</rect>
								<rect x="10" y="13" width="4" height="5" fill="#fff">
									<animate
										attributeName="height"
										attributeType="XML"
										values="5;21;5"
										begin="0.15s"
										dur="0.6s"
										repeatCount="indefinite"
									/>
									<animate
										attributeName="y"
										attributeType="XML"
										values="13; 5; 13"
										begin="0.15s"
										dur="0.6s"
										repeatCount="indefinite"
									/>
								</rect>
								<rect x="20" y="13" width="4" height="5" fill="#fff">
									<animate
										attributeName="height"
										attributeType="XML"
										values="5;21;5"
										begin="0.3s"
										dur="0.6s"
										repeatCount="indefinite"
									/>
									<animate
										attributeName="y"
										attributeType="XML"
										values="13; 5; 13"
										begin="0.3s"
										dur="0.6s"
										repeatCount="indefinite"
									/>
								</rect>
							</svg>
						);
					} else return props.label;
			}
		})()}
	</span>
);

Button.propTypes = {
	onClick: PropTypes.func,
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	mode: PropTypes.string,
	loading: PropTypes.bool,
};

Button.defaultProps = {
	className: '',
	mode: 'default',
	onClick: () => {},
	loading: false,
};

export default Button;
