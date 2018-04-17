// @flow
import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
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
    recommanded: "Condensed",
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
    recommanded: "Extended",
    message: (
      <FormattedMessage
        id="Tips.widthExtended"
        defaultMessage="WidthExtended Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odio recusandae deleniti ut optio est adipisci nobis similique laudantium natus, fugiat libero quisquam nesciunt sequi aperiam ullam quas deserunt. Velit!"
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
          tips.push({ message: tip.message, weight: tipWeight });
        }
      }
    });
    tips.sort((a, b) => a.weight >= b.weight);
    this.setState({ tips, tipIndex: 0 });
  }
  componentWillMount() {
    this.generateTips(this.props);
  }
  componentDidMount() {}
  componentWillReceiveProps(newProps) {
    this.generateTips(newProps);
  }
  render() {
    return this.state.tips.length > 0 ? (
      <div className="tips-wrapper">
        <div
          className="tips-button"
          onClick={() => this.setState({ opened: !this.state.opened })}
        >
          {this.state.opened ? "x" : "?"}
        </div>
        <div className={`Tips ${this.state.opened ? "opened" : ""}`}>
          <h4>
            <FormattedMessage
              id="Tips.title"
              defaultMessage="We recommend"
              description="Tips box title"
            />{" "}
          </h4>
          {this.state.tips[0].message}
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
