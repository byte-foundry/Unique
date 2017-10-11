// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { storeExportType } from '../../data/user';
import { ExportType, ExportToPrototypo } from '../../components/exportType/';
import Button from '../../components/button/';

import './ExportTypes.css';


const choices = [
  {
    type: 'download',
    title: 'Download your font',
    price: 15,
    paymentDescription: 'One time payment',
    direct: true,
  },
  {
    type: 'host',
    title: 'Host as a responsive font',
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
    component: <ExportToPrototypo />,
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
    if (type.type === 'download') {
      this.props.storeExportType(type.type);
    }
  }
  removeChoice() {
    this.setState({ chosenType: undefined });
  }
  render() {
    return (
      <div className={`ExportTypes ${this.state.chosenType && !this.state.chosenType.direct ? 'expanded' : ''}`}>
        <h1>{this.state.chosenType
          ? this.state.chosenType.title
          : 'What do you want to do with your font?'
        }</h1>
        <Button className="back" label="Back" onClick={() => this.props.goBack()} />
        <div className="needs">
          {this.state.chosenType && !this.state.chosenType.direct
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

const mapDispatchToProps = dispatch => bindActionCreators({ storeExportType, goBack: () => push('/specimen'), }, dispatch);

ExportTypes.propTypes = {
  goBack: PropTypes.func.isRequired,
  storeExportType: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExportTypes));
