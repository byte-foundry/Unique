// @flow
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import {FormattedMessage} from 'react-intl';
import {loadLibrary} from '../../../data/font';
import {ReactComponent as Logo} from '../../app/logo.svg';
import {ReactComponent as Profile} from '../../sidebar/profile.svg';
import './FAQ.css';

const questions = [
	{
		title: (
			<FormattedMessage
				id="FAQ.question1Title"
				defaultMessage="How can you guarantee the uniqueness of my font?"
				description="FAQ question 1 title"
			/>
		),
		answer: (
			<FormattedMessage
				id="FAQ.question1Answer"
				defaultMessage="Just like any other software out there, we cannot guarantee that somebody won’t have the exact same idea. (Unless, you’re psychic, in which case we’d love to learn more about mind control.) Tell you what though, you’re more likely to win the lottery than getting the same outcome as another Unique User. The possibilities are virtually endless, especially if you use the “More customization” option to fine-tune your font."
				description="FAQ question 1 answer"
			/>
		),
	},
	{
		title: (
			<FormattedMessage
				id="FAQ.question2Title"
				defaultMessage="Can I re-edit my fonts in Unique?"
				description="FAQ question 2 title"
			/>
		),
		answer: (
			<FormattedMessage
				id="FAQ.question2Answer"
				defaultMessage="While in the application, you can go back and forth to change your font before you download it. If you choose to save it for later, you can make alterations to it at a later point in time. Once downloaded though, the font cannot be re-imported into Unique."
				description="FAQ question 2 answer"
			/>
		),
	},
	{
		title: (
			<FormattedMessage
				id="FAQ.question3Title"
				defaultMessage="Am I allowed to modify my font after purchase?"
				description="FAQ question 3 title"
			/>
		),
		answer: (
			<FormattedMessage
				id="FAQ.question3Answer"
				defaultMessage="Yes, you most certainly are! Our fonts are sold under the Creative Commons 0 (CC0) licence. This license makes you the sole owner of the fonts you created, giving you all the rights to edit them as much as you like. "
				description="FAQ question 3 answer"
			/>
		),
	},
	{
		title: (
			<FormattedMessage
				id="FAQ.question4Title"
				defaultMessage="Can I save my font, even if I don’t buy it?"
				description="FAQ question 4 title"
			/>
		),
		answer: (
			<FormattedMessage
				id="FAQ.question4Answer"
				defaultMessage="Yes, as long as you have an account, you can save your project to your Unique library and come back to it later on. Don’t fret, the account is free and it’s just a way to save your projects for a later time. "
				description="FAQ question 4 answer"
			/>
		),
	},
	{
		title: (
			<FormattedMessage
				id="FAQ.question5Title"
				defaultMessage="How do I know that my font is “good”? "
				description="FAQ question 5 title"
			/>
		),
		answer: (
			<FormattedMessage
				id="FAQ.question5Answer"
				defaultMessage="There’s no such thing as a bad Unique font. We remind you when you need to look out for some things, like when your font is becoming a tad too thin or thick etc. In general though, do what feels right and it’ll turn out just fine!"
				description="FAQ question 5 answer"
			/>
		),
	},
	{
		title: (
			<FormattedMessage
				id="FAQ.question6Title"
				defaultMessage="Can I sell Unique fonts?"
				description="FAQ question 6 title"
			/>
		),
		answer: (
			<FormattedMessage
				id="FAQ.question6Answer"
				defaultMessage="Yes, of course! You can do whatever you’d like with them! Keep them hidden from the world or use them for commercial purposes, all fine with us!"
				description="FAQ question 6 answer"
			/>
		),
	},
	{
		title: (
			<FormattedMessage
				id="FAQ.question7Title"
				defaultMessage="What is a webfont?"
				description="FAQ question 7 title"
			/>
		),
		answer: (
			<FormattedMessage
				id="FAQ.question7Answer"
				defaultMessage="A webfont is a font especially designed for use in web pages, and is loaded with CSS @ font-face declaration. Basically, all this means is that the user’s browser downloads web fonts and renders text correctly."
				description="FAQ question 7 answer"
			/>
		),
	},
	{
		title: (
			<FormattedMessage
				id="FAQ.question8Title"
				defaultMessage="What is a logotype? "
				description="FAQ question 8 title"
			/>
		),
		answer: (
			<FormattedMessage
				id="FAQ.question8Answer"
				defaultMessage="You have a logo. You have a type. Logotype! All jokes aside, you see logotypes everywhere around you. Officially, a logotype is a single piece of type (font) that prints a certain word, group of letters or a logo. Take Google or Coca-Cola for example, these are very well-known logotypes."
				description="FAQ question 8 answer"
			/>
		),
	},
	{
		title: (
			<FormattedMessage
				id="FAQ.question9Title"
				defaultMessage="What do I need to look out for when making a logotype? "
				description="FAQ question 9 title"
			/>
		),
		answer: (
			<FormattedMessage
				id="FAQ.question9Answer"
				defaultMessage="- Make sure your logotype itself is recognizable and does not rely on a color alone. Also, keep in mind what the logotype might look like on a dark background!
        - Make sure that text and fine lines are still legible when the logotype is scaled down to use it for various sizes
        - We love colors, but they can be distracting. Limit your colour palette, if possible. 
        "
				description="FAQ question 9 answer"
			/>
		),
	},
	{
		title: (
			<FormattedMessage
				id="FAQ.question10Title"
				defaultMessage="What is hosting and why do I need it?"
				description="FAQ question 10 title"
			/>
		),
		answer: (
			<FormattedMessage
				id="FAQ.question10Answer"
				defaultMessage="Web hosting, or simply hosting, is necessary in order to get something live on the Internet. If you build a website that serves a custom font, you will need to host it somewhere. That way your visitors can see it displayed when they will come to your website. When you buy web hosting you basically rent server space on a server where your files will be placed."
				description="FAQ question 10 answer"
			/>
		),
	},
	{
		title: (
			<FormattedMessage
				id="FAQ.question11Title"
				defaultMessage="How do I delete my account?"
				description="FAQ question 11 title"
			/>
		),
		answer: (
			<FormattedMessage
				id="FAQ.question11Answer"
				defaultMessage="We are sad to see you go. Please send us your request at contact@prototypo.io and we will take care of the rest."
				description="FAQ question 11 answer"
			/>
		),
	},
];

class FAQ extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openedIndex: undefined,
		};
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<div className="FAQ">
				<div className="banner">
					<Logo
						className="logos logo"
						onClick={() => this.props.redirectToLanding()}
					/>
					<Profile
						className="logos profile"
						onClick={() => {
							this.props.isAuthenticated
								? this.props.loadLibrary()
								: this.props.goToAuth();
						}}
					/>
				</div>
				<div className="container">
					<h1>
						<FormattedMessage
							id="FAQ.title"
							defaultMessage="Frequently Asqued Questions"
							description="FAQ title"
						/>
					</h1>
					<div className="questions">
						{questions.map((question, index) => (
							<div className="question">
								<div
									className="question-title"
									onClick={() => {
										this.setState({openedIndex: index});
									}}
								>
									{question.title}
								</div>
								<div
									className={`question-answer ${
										this.state.openedIndex === index ? 'opened' : ''
									}`}
									style={{whiteSpace: 'pre-line'}}
								>
									{question.answer}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: typeof state.user.graphqlID === 'string',
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			redirectToLanding: () => push('/'),
			goToAuth: () => push({pathname: '/app/auth', authData: {}}),
			loadLibrary,
		},
		dispatch,
	);

FAQ.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);
