// @flow
import React from "react";
import { FormattedMessage } from "react-intl";
import "./Banner.css";

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldDisplayBanner: true
    };
  }
  render() {
    return (
      this.state.shouldDisplayBanner && (
        <div
          className="Banner"
          onClick={() => {
            this.setState({ shouldDisplayBanner: false });
          }}
        >
          <FormattedMessage
            id="Banner.beta"
            defaultMessage="Say hello to Unique’s beta! Let us know what you think!"
            description="Banner beta message"
          />
        </div>
      )
    );
  }
}

Banner.propTypes = {};

Banner.defaultProps = {};

export default Banner;
