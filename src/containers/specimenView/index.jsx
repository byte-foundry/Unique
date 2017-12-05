// @flow
import React from 'react';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SpecimenView.css';
import StepList from '../stepList/';
import Button from '../../components/button/';
import { storeEmail } from '../../data/user';

const isEmail = string => new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(string);

const logoSpecimen = (fontName, word) => (
  <div className="specimen row" style={{ fontFamily: fontName }}>
    <div className="col-sm-12 col-md-8">
      <div className="logo">
        {word}
      </div>
    </div>
    <div className="col-sm-12 col-md-3">
      <StepList specimen />
    </div>
  </div>
);

const textSpecimen = (fontName) => (
  <div className="specimen row" style={{ fontFamily: fontName }}>
    <div className="col-sm-12 col-md-6">
      <h2>Hamburgefonstiv - Abc 123</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
        ea commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
        ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
    <div className="col-sm-12 col-md-3">
      <p>0123456789</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
      <p>The quick brown fox jumps over the lazy dog</p>
      <p>Buvez de ce whisky que le patron juge fameux</p>
    </div>
    <div className="col-sm-12 col-md-3">
      <StepList specimen />
    </div>
  </div>
);

const websiteSpecimen = (fontName) => (
  <div className="specimen row" style={{ fontFamily: fontName }}>
    <div className="col-sm-12 col-md-6">
      <div className="uppercase">A B C D E F G H I</div>
      <div className="uppercase">J K L M N O P Q R</div>
      <div className="uppercase">S T U V W X Y Z</div>
      <div className="lowercase">a b c d e f g h i j k l m n o p q r s t u v w x y z</div>
      <div className="lowercase">1 2 3 4 5 6 7 8 9 0 . . . ( & ! ? )</div>
      <div className="text1">
        There is a theory which states that  if ever anyone discovers exactly
        what the Universe is for and why it is here,
        it will instantly disappear and be replaced by something even more bizarre and inexplicable.
        There is another theory which states that this has already happened.
      </div>
      <div className="text2">
        Twelve voices were shouting in anger, and they were all alike. No question, now,
        what had happened to the faces of the pigs.
        The creatures outside looked from pig to man, and from man to pig, and from pig to man again;
        but already it was impossible to say which was which.
      </div>
    </div>
    <div className="col-sm-12 col-md-6">
      <StepList specimen />
    </div>
  </div>
);

class SpecimenView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      shouldChangeEmail: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ email: event.target.value });
  }
  handleSubmit(event) {
    if (isEmail(this.state.email)) {
      this.props.storeEmail(this.state.email);
    }
    event.preventDefault();
  }
  changeEmail() {
    this.setState({ shouldChangeEmail: true });
  }
  sendEmail() {
    this.props.storeEmail(this.props.email);
  }
  render() {
    return (
      <div className="SpecimenView">
        <Button className="back" mode="isBack" label="Back" onClick={() => this.props.goBack()} />
        <div className="container">
        <h3>Hooray ! You have created the perfect bespoke font for your project</h3>
        {(() => {
          switch (this.props.need) {
            case 'logo':
              return logoSpecimen(this.props.fontName, this.props.word);
            case 'text':
              return textSpecimen(this.props.fontName);
            case 'website':
              return websiteSpecimen(this.props.fontName);
            default: 
              return textSpecimen(this.props.fontName);
          }
        })()}
        <h3>If you like your work, download it!</h3>
        {this.props.email === '' || !this.props.email || this.state.shouldChangeEmail
        ? (
          <form onSubmit={this.handleSubmit}>
            <input type="email" placeholder="your email" name="email" onChange={this.handleChange} />
            <button type="submit">Download</button>
          </form>
        )
        : (
          <div>
            <p>You are currently registered as {this.props.email}.</p><br />
            <Button label="Change email" onClick={() => this.changeEmail()} /><Button label="Download your font" onClick={() => this.sendEmail()} />
          </div>
        )}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fontName: state.font.currentPreset.preset + state.font.currentPreset.variant,
  step: state.font.step,
  email: state.user.email,
  need: state.font.need,
  word: state.user.chosenWord,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  goBack: () => push('/customize'),
  storeEmail,
}, dispatch);

SpecimenView.propTypes = {
  storeEmail: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  fontName: PropTypes.string,
  email: PropTypes.string,
  need: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
};

SpecimenView.defaultProps = {
  fontName: 'ptypo',
  email: '',
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecimenView));
