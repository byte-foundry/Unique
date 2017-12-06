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
import desktopBackground from './desktop.svg';
import tabletBackground from './tablet.svg';
import mobileBackground from './mobile.svg';

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

const textSpecimen = fontName => (
  <div className="specimen row" style={{ fontFamily: fontName }}>
    <div className="col-sm-12 col-md-6">
      <div className="uppercase">A B C D E F G H I</div>
      <div className="uppercase">J K L M N O P Q R</div>
      <div className="uppercase">S T U V W X Y Z</div>
      <div className="lowercase">
        a b c d e f g h i j k l m n o p q r s t u v w x y z
      </div>
      <div className="lowercase">1 2 3 4 5 6 7 8 9 0 . . . ( & ! ? )</div>
      <div className="text1">
        There is a theory which states that if ever anyone discovers exactly
        what the Universe is for and why it is here, it will instantly disappear
        and be replaced by something even more bizarre and inexplicable. There
        is another theory which states that this has already happened.
      </div>
      <div className="text2">
        Twelve voices were shouting in anger, and they were all alike. No
        question, now, what had happened to the faces of the pigs. The creatures
        outside looked from pig to man, and from man to pig, and from pig to man
        again; but already it was impossible to say which was which.
      </div>
    </div>
    <div className="col-sm-12 col-md-6">
      <StepList specimen />
    </div>
  </div>
);

const websiteSpecimen = fontName => (
  <div className="specimen website" style={{ fontFamily: fontName }}>
    <div className="templates">
      <div className="row">
        <div className="col-sm-12">
          <div className="template desktop-wrapper" style={{ backgroundImage: `url(${desktopBackground})` }}>
            <span className="text">
              There is a theory which states that if ever anyone discovers exactly
              what the Universe is for and why it is here, it will instantly disappear
              and be replaced by something even more bizarre and inexplicable. There
              is another theory which states that this has already happened.
              <br />
              Twelve voices were shouting in anger, and they were all alike. No
              question, now, what had happened to the faces of the pigs. The creatures
              outside looked from pig to man, and from man to pig, and from pig to man
              again; but already it was impossible to say which was which.
              <br />
              The trouble with most forms of transport, he thought, is basically one
              of them not being worth all the bother. On Earth—when there had been an Earth,
              before it was demolished to make way for a new hyperspace bypass—the problem had been with cars.
              The disadvantages involved in pulling lots of black sticky slime from out of the ground where it
              had been safely hidden out of harm's way, turning it into tar to cover the land with, smoke to fill
              the air with and pouring the rest into the sea, all seemed to outweigh the advantages of being able
              to get more quickly from one place to another—particularly when the place you arrived at had probably become,
              as a result of this, very similar to the place you had left, i.e. covered with tar, full of smoke and short of fish.
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-6">
          <div className="template tablet-wrapper" style={{ backgroundImage: `url(${tabletBackground})` }}>
            <span className="text">
              There is a theory which states that if ever anyone discovers exactly
              what the Universe is for and why it is here, it will instantly disappear
              and be replaced by something even more bizarre and inexplicable. There
              is another theory which states that this has already happened.
              <br />
              Twelve voices were shouting in anger, and they were all alike. No
              question, now, what had happened to the faces of the pigs. The creatures
              outside looked from pig to man, and from man to pig, and from pig to man
              again; but already it was impossible to say which was which.
              <br />
              The trouble with most forms of transport, he thought, is basically one
              of them not being worth all the bother. On Earth—when there had been an Earth,
              before it was demolished to make way for a new hyperspace bypass—the problem had been with cars.
            </span>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6">
          <div className="template mobile-wrapper" style={{ backgroundImage: `url(${mobileBackground})` }}>
            <span className="text">
              There is a theory which states that if ever anyone discovers exactly
              what the Universe is for and why it is here, it will instantly disappear
              and be replaced by something even more bizarre and inexplicable. There
              is another theory which states that this has already happened.
              <br />
              Twelve voices were shouting in anger, and they were all alike. No
              question, now, what had happened to the faces of the pigs. The creatures
              outside looked from pig to man, and from man to pig, and from pig to man
              again; but already it was impossible to say which was which.
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12">
        <StepList specimen />
      </div>
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
