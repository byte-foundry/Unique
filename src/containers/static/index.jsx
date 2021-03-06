import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import LanguageSelect from '../../components/languageSelect';

import {ReactComponent as FacebookLogo} from './facebook.svg';
import {ReactComponent as TwitterLogo} from './twitter.svg';
import {ReactComponent as InstagramLogo} from './instagram.svg';

import {setLocale} from '../../data/ui';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './Static.css';

const Static = (props) => (
	<div className="Static">
		{props.children}

		<div className="footer">
			<div className="container">
				<div className="row block clearfix">
					<div className="pages float-left">
						<Link to="/faq">
							<FormattedMessage
								id="Landing.footerFAQ"
								defaultMessage="FAQ"
								description="Unique FAQ footer"
							/>
						</Link>
						<p
							onClick={() => {
								window.Intercom('show');
							}}
						>
							<FormattedMessage
								id="Landing.footerSupport"
								defaultMessage="Support"
								description="Unique Support footer"
							/>
						</p>
						<Link to="/tos">
							<FormattedMessage
								id="Landing.footerTOS"
								defaultMessage="Terms of use"
								description="Unique TOS footer"
							/>
						</Link>
					</div>
					<div className="social float-right">
						<a
							title="Unique Facebool"
							href="https://www.facebook.com/fontsbyunique/"
							rel="noopener noreferrer"
							target="_blank"
						>
							<FacebookLogo className="social-icon facebook" />
						</a>
						<a
							title="Unique Instagram"
							href="https://www.instagram.com/fontsbyunique/"
							rel="noopener noreferrer"
							target="_blank"
						>
							<InstagramLogo className="social-icon instagram" />
						</a>
						<a
							title="Unique Twitter"
							rel="noopener noreferrer"
							href="https://twitter.com/fontsbyUnique/"
							target="_blank"
						>
							<TwitterLogo className="social-icon twitter" />
						</a>
					</div>
				</div>
				<div className="row block clearfix">
					<LanguageSelect
						pathname={props.location.pathname}
						isBlackOnWhite={false}
						setLocale={props.setLocale}
						locale={props.locale}
					/>
					<div className="credits float-right">
						{new Date().getFullYear()} -{' '}
						<FormattedMessage
							id="Landing.footerCopyright"
							defaultMessage="Unique © Powered by "
							description="Unique copyright footer"
						/>
						<a
							title="Prototypo website"
							href="https://www.prototypo.io"
							rel="noopener noreferrer"
							target="_blank"
						>
							Prototypo
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const mapStateToProps = (state) => ({
	isBlackOnWhite: state.user.isBlackOnWhite,
	locale: state.ui.locale,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			goToApp: () => push('/app/need'),
			setLocale,
		},
		dispatch,
	);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Static));
