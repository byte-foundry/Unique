// @flow
import React from 'react';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import FlipMove from 'react-flip-move';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import Button from '../../components/button/';
import {loadProject, download, reloadFonts} from '../../data/font';
import {deleteUserProject, logout} from '../../data/user';
import './Library.css';
import {S3_URL} from '../../data/constants.js';

class Library extends React.Component {
	constructor(props) {
		super(props);
		const payedProjects = props.projects.filter(
			(project) => project.bought === true,
		);
		const savedProjects = props.projects.filter(
			(project) => project.bought === false,
		);
		this.state = {
			payedProjects,
			savedProjects,
		};
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	componentWillReceiveProps(newProps) {
		const payedProjects = newProps.projects.filter(
			(project) => project.bought === true,
		);
		const savedProjects = newProps.projects.filter(
			(project) => project.bought === false,
		);
		this.setState({
			payedProjects,
			savedProjects,
		});
	}
	render() {
		return (
			<div className="Library">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<h1>
								<FormattedMessage
									id="Library.title"
									defaultMessage="Hello!"
									description="Library page title"
								/>
							</h1>
						</div>
					</div>
					<div className="row actions">
						<div className="col-sm-12">
							<p className="action" onClick={() => this.props.goToHome()}>
								<FormattedMessage
									id="Library.actionCreate"
									defaultMessage="Create a new project"
									description="Library action new project"
								/>
							</p>
							<p
								className="action"
								onClick={() => this.props.reloadFonts(true)}
							>
								<FormattedMessage
									id="Library.actionReload"
									defaultMessage="Restart your project"
									description="Libraryaction restart project"
								/>
							</p>
							<p className="action" onClick={() => this.props.logout()}>
								<FormattedMessage
									id="Library.actionLogout"
									defaultMessage="Logout"
									description="Libraryaction logout"
								/>
							</p>
						</div>
					</div>
					<div className="row projects">
						<div className="col-sm-12">
							<h2>
								<FormattedMessage
									id="Library.savedProjectsTitle"
									defaultMessage="Saved Projects"
									description="Library saved projects title"
								/>
							</h2>
						</div>
						<FlipMove
							duration={100}
							easing="ease"
							appearAnimation="elevator"
							leaveAnimation="elevator"
							staggerDurationBy="10"
							staggerDelayBy="20"
							style={{width: '100%'}}
						>
							{this.state.savedProjects.map((project) => (
								<div className="col-sm-3 project" key={project.id}>
									<div
										className="preview"
										style={{fontFamily: `project${project.id}`}}
									>
										AaBbCc
									</div>
									<div className="need">{project.need}</div>
									<div className="fontName">
										{decodeURI(project.name) || 'Undefined'}
									</div>
									<div className="actions">
										<FormattedMessage
											id="Library.deleteAction"
											defaultMessage="Delete"
											description="Library delete project button"
										>
											{(text) => (
												<Button
													onClick={() =>
														this.props.deleteUserProject(project.id)
													}
													label={text}
													mode="text"
													className="action-delete"
												/>
											)}
										</FormattedMessage>
										<FormattedMessage
											id="Library.buyAction"
											defaultMessage="Buy"
											description="Library buy project button"
										>
											{(text) => (
												<Button
													onClick={() =>
														this.props.loadProject(
                              project.id,
                              '/app/checkout',
														)
													}
													label={text}
													mode="full"
													className="action-buy"
												/>
											)}
										</FormattedMessage>
										<FormattedMessage
											id="Library.openAction"
											defaultMessage="Open"
											description="Library open project button"
										>
											{(text) => (
												<Button
													onClick={() =>
														this.props.loadProject(
															project.id,
														)
													}
													label={text}
													mode="full"
													className="action-open"
												/>
											)}
										</FormattedMessage>
									</div>
								</div>
							))}
						</FlipMove>
						{this.state.savedProjects.length === 0 && (
							<div className="col-sm-12">
								<p>
									<FormattedMessage
										id="Library.emptySavedProject"
										defaultMessage="Oops, no projects yet. Let's get to work!"
										description="Library no project saved"
									/>
								</p>
							</div>
						)}
					</div>
					<div className="row projects">
						<div className="col-sm-12">
							<h2>
								<FormattedMessage
									id="Library.boughtProjectsTitle"
									defaultMessage="Bought Projects"
									description="Library bought projects title"
								/>
							</h2>
						</div>
						<FlipMove
							duration={100}
							easing="ease"
							appearAnimation="elevator"
							leaveAnimation="elevator"
							staggerDurationBy="10"
							staggerDelayBy="20"
							style={{width: '100%'}}
						>
							{this.state.payedProjects.map((project) => (
								<div className="col-sm-3 project" key={project.id}>
									<div
										className="preview"
										style={{fontFamily: `project${project.id}`}}
									>
										AaBbCc
									</div>
									<div className="need">{project.need}</div>
									<div className="fontName">
										{decodeURI(project.name) || 'Undefined'}
									</div>
									<div className="actions">
										<FormattedMessage
											id="Library.downloadAction"
											defaultMessage="Download"
											description="Library download project button"
										>
											{(text) => (
												<Button
													onClick={() => {
														const tempLink = document.createElement('a');
														tempLink.href = `${S3_URL}${project.id}.zip`;
														tempLink.download = `${project.name}.zip`;
														tempLink.dispatchEvent(new MouseEvent('click'));
													}}
													label={text}
													mode="full"
													className="action-open"
												/>
											)}
										</FormattedMessage>
									</div>
								</div>
							))}
						</FlipMove>
						{this.state.payedProjects.length === 0 && (
							<div className="col-sm-12">
								<p>
									<FormattedMessage
										id="Library.emptyBoughtProject"
										defaultMessage="Aw, nothing here yet...Go on then, make a font:)"
										description="Library no project bought"
									/>
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

Library.propTypes = {
	projects: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			bought: PropTypes.bool.isRequired,
			name: PropTypes.string.isRequired,
		}),
	).isRequired,
	goToHome: PropTypes.func.isRequired,
	loadProject: PropTypes.func.isRequired,
	download: PropTypes.func.isRequired,
	deleteUserProject: PropTypes.func.isRequired,
	reloadFonts: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	userId: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
	projects: state.user.projects,
	userId: state.user.graphqlID,
});
const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			goToHome: () => push('/app/need'),
			loadProject,
			download,
			deleteUserProject,
			reloadFonts,
			logout,
		},
		dispatch,
	);

export default connect(mapStateToProps, mapDispatchToProps)(Library);
