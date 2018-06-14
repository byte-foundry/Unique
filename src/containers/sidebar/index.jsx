// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage} from 'react-intl';
import {goToStep, loadLibrary} from '../../data/font';
import {storeCoupon} from '../../data/user';
import Button from '../../components/button/';
import Checkout from '../../components/checkout';
import CouponInput from '../../components/couponInput';
import './Sidebar.css';

import {ReactComponent as ProfileIcon} from './profile.svg';

const Sidebar = (props) => (
	<div
		className={`Sidebar ${props.mode !== 'checkout' ? 'small' : ''} ${
			props.mode === 'checkout' ? 'checkout' : ''
		}`}
	>
		<ProfileIcon
			className="icon-profile"
			onClick={() => {
				props.isAuthenticated ? props.loadLibrary() : props.goToAuth();
			}}
		/>
		{props.mode === 'checkout' && (
			<div className="sidebar-checkout">
				<h2 className="sidebar-checkout-title">
					{props.userFontName}&nbsp;
					<FormattedMessage
						id="Checkout.sidebarTitle"
						defaultMessage="Package"
						description="Checkout - Sidebar title"
					/>
				</h2>
				<div className="choices">
					{props.checkoutOptions.map(
						(option) =>
							option.selected && (
								<div className="choice">
									<span className="left">{option.name}</span>
									<span className="right">
										{option.price === 0 ? (
											<FormattedMessage
												id="Checkout.included"
												defaultMessage="included"
												description="Checkout - Included price"
											/>
										) : (
											parseFloat(
												option.type === 'discount'
													? props.option20Price
													: props.option5Price,
											).toLocaleString(props.locale_full, {
												style: 'currency',
												currency: props.currency,
												maximumSignificantDigits: 3,
											})
										)}
									</span>
								</div>
							),
					)}
					{props.coupon.discount && (
						<div className="choice">
							<span className="left">
								<FormattedMessage
									id="Checkout.discount"
									defaultMessage="Coupon"
									description="Checkout - Coupon label"
								/>
							</span>
							<span className="right">{`-${props.coupon.discount}%`}</span>
						</div>
					)}
				</div>
				<h2 className="baseprice">
					{parseFloat(props.basePrice).toLocaleString(props.locale_full, {
						style: 'currency',
						currency: props.currency,
					})}
				</h2>
				<h2 className="price">
					{props.coupon.discount
						? parseFloat(
								props.checkoutPrice -
									props.checkoutPrice * props.coupon.discount / 100,
						  ).toLocaleString(props.locale_full, {
								style: 'currency',
								currency: props.currency,
						  })
						: parseFloat(props.checkoutPrice).toLocaleString(
								props.locale_full,
								{
									style: 'currency',
									currency: props.currency,
								},
						  )}
				</h2>
				<FormattedMessage
					id="Sidebar.checkoutAction"
					defaultMessage="Checkout"
					description="Sidebar - Checkout action"
				>
					{(text) => (
						<Checkout
							title="Unique"
							amount={props.checkoutPrice}
							description="Your unique package"
							skipCard={props.coupon.discount === 100}
							disabled={props.userFontName === ''}
						>
							<Button
								className={`button-checkout ${
									props.userFontName === '' ? 'disabled' : ''
								}`}
								loading={props.userFontName === ''}
								onClick={(e) => {
									if (props.userFontName === '') {
										e.preventDefault();
										e.stopPropagation();
										return;
									}
								}}
								mode="white"
								label={text}
								checkoutOptions={props.checkoutOptions}
							/>
						</Checkout>
					)}
				</FormattedMessage>
				<CouponInput storeCoupon={props.storeCoupon} coupon={props.coupon} />
				{props.errorPayment && (
					<p className="error-payment">
						<FormattedMessage
							id="App.errorPayment"
							defaultMessage="Something happened during the payment process. Do not worry, no charge was issued. Please retry, maybe with another card. If it fails again, please contact us!"
							description="Error payment message"
						/>
					</p>
				)}
			</div>
		)}
	</div>
);

Sidebar.propTypes = {
	step: PropTypes.number.isRequired,
	choicesMade: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
		}),
	).isRequired,
	pathName: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	loadLibrary: PropTypes.func.isRequired,
	mode: PropTypes.string,
	checkoutPrice: PropTypes.number.isRequired,
	currency: PropTypes.string.isRequired,
	locale_full: PropTypes.string.isRequired,
	option5Price: PropTypes.number.isRequired,
	option20Price: PropTypes.number.isRequired,
	basePrice: PropTypes.number.isRequired,
	userFontName: PropTypes.string,
	errorPayment: PropTypes.bool.isRequired,
};

Sidebar.defaultProps = {
	specimen: false,
	mode: 'default',
	userFontName: '',
};

const mapStateToProps = (state) => ({
	step: state.font.step,
	choicesMade: state.font.choicesMade,
	checkoutPrice: state.user.checkoutPrice,
	basePrice: state.user.basePrice,
	checkoutOptions: state.user.checkoutOptions,
	locale_full: state.ui.locale_full,
	currency: state.ui.currency,
	option5Price: state.user.option5Price,
	option20Price: state.user.option20Price,
	coupon: state.user.coupon,
	userFontName: decodeURI(state.user.currentProject.name),
	errorPayment: state.ui.errorPayment,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			goToStep,
			loadLibrary,
			storeCoupon,
			goToAuth: () => push({pathname: '/app/auth'}),
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
