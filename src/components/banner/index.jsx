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
    this.banners = {
      beta: (
        <FormattedMessage
            id="Banner.beta"
            defaultMessage="Say hello to Unique’s beta! Let us know what you think!"
            description="Banner beta message"
          />
      ),
      launch: (
        <FormattedMessage
            id="Banner.launch"
            defaultMessage="We’re on Product Hunt today! Vote for us! 👉"
            description="Banner launch message"
          />
      )
    }
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
          {this.banners.launch}
          <a
              title="Unique Product hunt"
              href="https://www.producthunt.com/posts/unique"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://www.producthunt.com/posts/unique
            </a>
        </div>
      )
    );
  }
}

Banner.propTypes = {};

Banner.defaultProps = {};

export default Banner;
