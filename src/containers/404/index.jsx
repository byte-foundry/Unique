// @flow
import React from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import Button from '../../components/button';
import {ReactComponent as Visual404} from './404.svg';

import './404.css';
class Page404 extends React.Component {
	constructor(props) {
		super(props);
		this.shuffleTags = this.shuffleTags.bind(this);
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	shuffleTags() {}
	render() {
		return (
			<div className="Page404">
				<div className="container">
					<div className="row">
						<div className="col-sm-12 col-md-12 col-lg-6">
							<div className="page404-title">
								<FormattedMessage
									id="404.Title"
									defaultMessage="Page not found"
									description="Unique 404 Title"
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-6">
							<div className="page404-subtitle">
								<FormattedMessage
									id="404.Subtitle"
									defaultMessage="The page you were looking for doesn’t exist :("
									description="Unique 404 Subtitle"
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<Visual404 className="page404-image" />
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<FormattedMessage
								id="404.homeButton"
								defaultMessage="Home"
								description="404 home button"
							>
								{(text) => (
									<Button
										mode="full"
										label={text}
										className="page404-button"
										onClick={() => {
											this.props.redirectToLanding();
										}}
									/>
								)}
							</FormattedMessage>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			redirectToLanding: () => push('/'),
		},
		dispatch,
	);

Page404.propTypes = {
	redirectToLanding: PropTypes.func.isRequired,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Page404),
);
