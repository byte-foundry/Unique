// @flow
import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import unorphan from "unorphan";
import "./Cheers.css";

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const cheers = [
  <FormattedMessage
    id="Cheer.simpleCheer1"
    defaultMessage="Looking good!"
    description="Simple cheer 1"
  />,
  <FormattedMessage
    id="Cheer.simpleCheer2"
    defaultMessage="Great choice!"
    description="Simple cheer 2"
  />,
  <FormattedMessage
    id="Cheer.simpleCheer3"
    defaultMessage="It's coming together!"
    description="Simple cheer 3"
  />,
  <FormattedMessage
    id="Cheer.simpleCheer4"
    defaultMessage="Looking fabulous!"
    description="Simple cheer 4"
  />,
  <FormattedMessage
    id="Cheer.simpleCheer5"
    defaultMessage="You have this in the bag!"
    description="Simple cheer 5"
  />,
  <FormattedMessage
    id="Cheer.simpleCheer6"
    defaultMessage="#winning!"
    description="Simple cheer 6"
  />,
  <FormattedMessage
    id="Cheer.simpleCheer7"
    defaultMessage="Nice one!"
    description="Simple cheer 7"
  />,
  <FormattedMessage
    id="Cheer.simpleCheer8"
    defaultMessage="You've got this!"
    description="Simple cheer 8"
  />,
  <FormattedMessage
    id="Cheer.simpleCheer9"
    defaultMessage="Looking sharp!"
    description="Simple cheer 9"
  />
];

class Cheers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cheer: undefined,
      shouldHideCheer: false
    };
    this.generateCheer = this.generateCheer.bind(this);
  }
  generateCheer(props) {
    const { previousChoiceMade, recommandations } = props;
    if (recommandations.findIndex(e => e === previousChoiceMade) !== -1) {
      this.setState({ cheer: shuffleArray(cheers)[0], shouldHideCheer: false });
    } else {
      this.setState({ cheer: undefined, shouldHideCheer: true });
    }
  }
  componentWillMount() {
    console.log('cheer will mount')
    this.generateCheer(this.props);
  }
  componentDidMount() {
    unorphan("h1, h2, h3, p, span");
  }
  componentWillReceiveProps(newProps) {
    console.log('cheer will receive props')
    console.log(newProps)
    if (this.props.previousChoiceMade !== newProps.previousChoiceMade) {
      this.generateCheer(newProps);
      unorphan("h1, h2, h3, p, span");
    }
  }
  render() {
    if (this.state.cheer && !this.state.shouldHideCheer) {
      setTimeout(() => {
        this.setState({ shouldHideCheer: true });
      }, 8000);
    }
    return this.state.cheer ? (
      <div
        className={`cheer-wrapper ${
          this.state.shouldHideCheer ? "hidden" : "visible"
        }`}
        onClick={() => {
          this.setState({ shouldHideCheer: true });
        }}
      >
        <div className="cheer">{this.state.cheer}</div>
      </div>
    ) : (
      false
    );
  }
}

Cheers.propTypes = {};

Cheers.defaultProps = {};

export default Cheers;
