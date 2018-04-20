// @flow
import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import unorphan from "unorphan";
import "./Tips.css";

const tipsData = [
  {
    context: [
      {
        stepName: "need",
        choices: ["text", "others"]
      },
      {
        stepName: "Thickness",
        choices: ["Light"]
      }
    ],
    showOn: ["Width", "X-Height"],
    recommanded: ["Condensed"],
    message: (
      <FormattedMessage
        id="Tips.widthCondensed"
        defaultMessage="WidthCondensed Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odio recusandae deleniti ut optio est adipisci nobis similique laudantium natus, fugiat libero quisquam nesciunt sequi aperiam ullam quas deserunt. Velit!"
        description="Test"
      />
    )
  },
  {
    context: [
      {
        stepName: "need",
        choices: ["display"]
      },
      {
        stepName: "Thickness",
        choices: ["Bold"]
      }
    ],
    showOn: ["Width"],
    recommanded: ["Extended"],
    message: (
      <FormattedMessage
        id="Tips.widthExtended"
        defaultMessage="WidthExtended Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odio recusandae deleniti ut optio est adipisci nobis similique laudantium natus, fugiat libero quisquam nesciunt sequi aperiam ullam quas deserunt. Velit!"
        description="Test"
      />
    )
  },
  {
    context: [
      {
        stepName: "Thickness",
        choices: ["Bold"]
      }
    ],
    showOn: ["Width"],
    recommanded: ["Extended"],
    message: (
      <FormattedMessage
        id="Tips.widthExtendedSimple"
        defaultMessage="WidthExtendedSimple Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odio recusandae deleniti ut optio est adipisci nobis similique laudantium natus, fugiat libero quisquam nesciunt sequi aperiam ullam quas deserunt. Velit!"
        description="Test"
      />
    )
  },
  {
    context: [
      {
        stepName: "Width",
        choices: ["Extended"]
      }
    ],
    showOn: ["Slant"],
    recommanded: ["Default"],
    message: (
      <FormattedMessage
        id="Tips.slantDefaultSimple"
        defaultMessage="SlantDefaultSimple Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odio recusandae deleniti ut optio est adipisci nobis similique laudantium natus, fugiat libero quisquam nesciunt sequi aperiam ullam quas deserunt. Velit!"
        description="Test"
      />
    )
  }
];

class Tips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tips: [],
      tipIndex: 0
    };
    this.generateTips = this.generateTips.bind(this);
  }
  generateTips(props) {
    const { choicesMade, stepName, need } = props;
    const tips = [];
    const recommanded = [];
    tipsData.forEach(tip => {
      if (tip.showOn.findIndex(e => e === stepName) !== -1) {
        let shouldIncludeTip = true;
        let tipWeight = 0;
        tip.context.forEach(context => {
          if (context.stepName === "need") {
            if (context.choices.findIndex(e => e === need) !== -1) {
              tipWeight += 1;
            } else {
              shouldIncludeTip = false;
            }
          } else {
            const contextChoiceMade = choicesMade.find(
              e => e.stepName === context.stepName
            );
            if (
              contextChoiceMade &&
              context.choices.findIndex(e => e === contextChoiceMade.name) !==
                -1
            ) {
              tipWeight += 1;
            } else {
              shouldIncludeTip = false;
            }
          }
        });
        if (shouldIncludeTip) {
          tip.recommanded.forEach(reco => recommanded.push(reco));
          tips.push({ message: tip.message, weight: tipWeight });
        }
      }
    });
    tips.sort((a, b) => a.weight <= b.weight);
    this.props.storeRecommandations(recommanded, stepName);
    this.setState({ tips, tipIndex: 0 });
  }
  componentWillMount() {
    this.generateTips(this.props);
  }
  componentDidMount() {
    unorphan("h1, h2, h3, p, span");
  }
  componentWillReceiveProps(newProps) {
    if (this.props.stepName !== newProps.stepName) {
      this.generateTips(newProps);
      unorphan("h1, h2, h3, p, span");
      this.setState({ opened: false });
    }    
  }
  render() {
    return this.state.tips.length > 0 ? (
      <div className="tips-wrapper">
        <div
          className={`tips-button ${this.state.opened ? 'opened' : ''}`}
          onClick={() => this.setState({ opened: !this.state.opened })}
        >
          {this.state.opened ? "x" : this.state.tips.length}
        </div>
        <div className={`Tips ${this.state.opened ? "opened" : ""}`}>
          <h4>
            <FormattedMessage
              id="Tips.title"
              defaultMessage="We recommend"
              description="Tips box title"
            />{" "}
          </h4>
          <p>{this.state.tips[this.state.tipIndex].message}</p>
          {this.state.tips.length > 1 && (
            <div className="tips-pagination">
              <span
                className={`tips-prev ${
                  this.state.tipIndex === 0 ? "disabled" : ""
                }`}
                onClick={() => {
                  if (this.state.tipIndex !== 0) {
                    this.setState({ tipIndex: this.state.tipIndex - 1 });
                  }
                }}
              >
                <FormattedMessage
                  id="Tips.previous"
                  defaultMessage="Prev"
                  description="Tips previous button"
                />
              </span>
              <span
                className={`tips-next ${
                  this.state.tipIndex + 1 === this.state.tips.length
                    ? "disabled"
                    : ""
                }`}
                onClick={() => {
                  if (this.state.tipIndex + 1 < this.state.tips.length) {
                    this.setState({ tipIndex: this.state.tipIndex + 1 });
                  }
                }}
              >
                <FormattedMessage
                  id="Tips.next"
                  defaultMessage="Next"
                  description="Tips next button"
                />
              </span>
            </div>
          )}
        </div>
      </div>
    ) : (
      false
    );
  }
}

Tips.propTypes = {};

Tips.defaultProps = {};

export default Tips;
