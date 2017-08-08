// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ExportType from '../../components/exportType/';
import './ExportTypes.css';


const choices = [
  {
    type: 'download',
    title: 'Download your font',
    checkoutTitle: 'Font download',
    description: (<span>
      <p>
        Télécharger une font,
        l&apos;utiliser sur son ordinateur, indesign, toshop ou la remodifier
      </p>
      <p>
        La mettre sur son serveur, la vendre, etc
      </p>
    </span>),
    price: 15,
    paymentDescription: 'One time payment',
  },
  {
    type: 'host',
    title: 'Host as a responsive font',
    checkoutTitle: 'Font hosting service',
    description: (<span>
      <p>
        Les avantages d&apos;utiliser une font en responsive et pourquoi c&apos;est cool
      </p>
      <p>
        Aussi dire qu&apos;on peut juste la mettre sur un cdn rapide et trop bien
      </p>
    </span>),
    price: 99,
    paymentDescription: 'Billed annualy',
  },
  {
    type: 'prototypo',
    title: 'Refine it with Prototypo',
    checkoutTitle: 'Protypo subscription',
    description: (<span>
      <p>
        Prototypo c&apos;est super cool
      </p>
      <p>
        On peut tout modifier a fond {'<Demo>'}
      </p>
    </span>),
    price: 99,
    paymentDescription: 'Billed annually',
  },
];

class ExportTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenType: undefined,
    };
  }
  selectChoice(type) {
    this.setState({ chosenType: type });
  }
  removeChoice() {
    this.setState({ chosenType: undefined });
  }
  render() {
    return (
      <div className={`ExportTypes ${this.state.chosenType ? 'expanded' : ''}`}>
        <h1>{this.state.chosenType
          ? this.state.chosenType.title
          : 'What do you want to do with your font?'
        }</h1>
        <div className="needs">
          {this.state.chosenType
          ? (
            <ExportType
              choice={this.state.chosenType}
              expanded
              selectChoice={() => this.selectChoice(this.state.chosenType)}
              removeChoice={() => this.removeChoice()}
            />
          )
          : choices.map(choice => (
            <ExportType
              choice={choice}
              key={choice.title}
              selectChoice={() => this.selectChoice(choice)}
              removeChoice={() => this.removeChoice()}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

ExportTypes.propTypes = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExportTypes));
