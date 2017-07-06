// @flow
import React from 'react';
import './FinalView.css';

class FinalView extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = () => {
      props.history.push(`/template/${props.match.params.template}/${parseInt(props.match.params.step, 10)}`);
    };
  }
  render() {
    return (
      <div className="FinalView">
        <div className="back" role="button" tabIndex="0" onClick={() => this.goBack()}>
          Back
        </div>
        <h1>Congrats!</h1>
      </div>
    );
  }
}

export default FinalView;
