// @flow
import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { FormattedMessage } from "react-intl";
import "./SpecimenView.css";
import Button from "../../components/button/";
import { storeEmail, storeProject } from "../../data/user";
import desktopBackground from "./desktop.svg";
import tabletBackground from "./tablet.svg";
import mobileBackground from "./mobile.svg";

class SpecimenView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      shouldChangeEmail: false,
      isCustomLogo: false,
      showCustomLogoControls: true,
      shouldContinueUnregistered: false,
      fontName: props.projectName,
      isInputFocused: false
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  componentDidMount() {
    this.specimenViewWrapper.focus();
  }
  onFocus() {
    this.setState({ isInputFocused: true });
  }
  onBlur() {
    this.setState({ isInputFocused: false });
  }
  render() {
    return (
      <div
        className="SpecimenView"
        ref={c => {
          this.specimenViewWrapper = c;
        }}
        tabIndex="-1"
      >
        <div className="container">
          <div className="hooray">
            <h2>
              <FormattedMessage
                id="SpecimenView.title"
                defaultMessage="Congrats, you're almost done!"
                description="Speciem view title"
              />
            </h2>
            <p className="subtitle">
              <FormattedMessage
                id="SpecimenView.subtitle"
                defaultMessage="Embark on new adventures with your complete glyph set! But before you move on, let's give your font a name"
                description="Speciem view subtitle"
              />
            </p>
            <p className="fontName">
              <FormattedMessage
                id="SpecimenView.nameActionLabel"
                defaultMessage="Give your font a name:"
                description="SpecimenView - Name action label"
              />
              <FormattedMessage
                id="SpecimenView.nameAction"
                defaultMessage="My font name"
                description="SpecimenView - Name action"
              >
                {text => (
                  <input
                    type="text"
                    value={this.state.fontName}
                    placeholder={text}
                    className="input-fontname"
                    onChange={e => this.setState({ fontName: e.target.value })}
                  />
                )}
              </FormattedMessage>
            </p>
            <p className="subtitle-two">
              <FormattedMessage
                id="SpecimenView.subtitleBack"
                defaultMessage="Not quite right? Just click trough the menu to edit"
                description="Speciem view back subtitle"
              />
            </p>
            <div className="buttons">
              <FormattedMessage
                id="SpecimenView.downloadAction"
                defaultMessage="Download"
                description="SpecimenView - Download action"
              >
                {text => (
                  <Button
                    className="button-download"
                    onClick={() => {
                      this.props.goToCheckout(this.state.fontName);
                    }}
                    mode="full"
                    label={text}
                  />
                )}
              </FormattedMessage>

              <FormattedMessage
                id="SpecimenView.saveAction"
                defaultMessage="Save it for later"
                description="SpecimenView - Save action"
              >
                {text => (
                  <Button
                    className="button-save"
                    onClick={() => {
                      this.props.storeProject(this.state.fontName);
                    }}
                    mode="light"
                    label={text}
                  />
                )}
              </FormattedMessage>
            </div>
          </div>
          <div
            className="specimen row"
            style={{ fontFamily: `'${this.props.fontName}'` }}
          >
            <div className="col-sm-12 ">
              <h3>
                <FormattedMessage
                  id="SpecimenView.display"
                  defaultMessage="Display"
                  description="Specimen view display"
                />
              </h3>
              <p className="word">{this.props.word}</p>
              <h3>
                <FormattedMessage
                  id="SpecimenView.characters"
                  defaultMessage="Characters"
                  description="Speciem view characters"
                />
              </h3>
              <div className="characters">
                <div className="uppercase">A B C D E F G H I J K L M</div>
                <div className="uppercase">N O P Q R S T U V W X Y Z</div>
                <div className="lowercase">a b c d e f g h i j k l m</div>
                <div className="lowercase">n o p q r s t u v w x y z</div>
                <div className="lowercase">1 2 3 4 5 6 7 8 9 0 & @ .</div>
                <div className="lowercase">{", ? ! “ ” ( ) < > ° + - $"}</div>
              </div>
              <h3>
                <FormattedMessage
                  id="SpecimenView.text"
                  defaultMessage="Text"
                  description="Speciem view text"
                />
              </h3>
              <div className="row">
                <div className="col-md-4 col-sm-12 text-wrapper">
                  <p className="text text-small">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Pretium nibh ipsum consequat nisl vel pretium lectus
                    quam. Diam in arcu cursus euismod quis viverra nibh cras.
                    Donec pretium vulputate sapien nec. Amet aliquam id diam
                    maecenas. Et magnis dis parturient montes nascetur ridiculus
                    mus mauris. Integer feugiat scelerisque varius morbi enim
                    nunc. Nisl condimentum id venenatis a condimentum vitae
                    sapien. Facilisi morbi tempus iaculis urna id. Congue mauris
                    rhoncus aenean vel elit. Arcu cursus euismod quis viverra
                    nibh cras pulvinar. Pellentesque elit eget gravida cum. Sed
                    adipiscing diam donec adipiscing. Pretium nibh ipsum
                    consequat nisl. Elementum pulvinar etiam non quam lacus
                    suspendisse faucibus interdum posuere. Arcu dui vivamus arcu
                    felis bibendum ut. Viverra ipsum nunc aliquet bibendum enim
                    facilisis gravida neque convallis. Aliquet sagittis id
                    consectetur purus ut faucibus pulvinar elementum. Laoreet
                    suspendisse interdum consectetur libero id. Nibh tellus
                    molestie nunc non blandit massa enim nec. Leo duis ut diam
                    quam nulla porttitor massa. Ipsum a arcu cursus vitae congue
                    mauris rhoncus aenean. In arcu cursus euismod quis viverra
                    nibh cras. At volutpat diam ut venenatis. Volutpat blandit
                    aliquam etiam erat velit scelerisque in dictum. Faucibus
                    interdum posuere lorem ipsum dolor sit amet. Montes nascetur
                    ridiculus mus mauris vitae ultricies leo. Massa enim nec dui
                    nunc mattis enim ut tellus. Dui sapien eget mi proin sed.
                    Suspendisse potenti nullam ac tortor vitae purus faucibus.
                    Gravida cum sociis natoque penatibus et magnis dis
                    parturient montes. Sed ullamcorper morbi tincidunt ornare
                    massa eget egestas purus viverra. Aliquam malesuada bibendum
                    arcu vitae elementum curabitur vitae nunc. Non arcu risus
                    quis varius quam quisque id. Odio euismod lacinia at quis
                    risus sed vulputate odio. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Pretium nibh
                    ipsum consequat nisl vel pretium lectus quam. Diam in arcu
                    cursus euismod quis viverra nibh cras. Donec pretium
                    vulputate sapien nec. Amet aliquam id diam maecenas. Et
                    magnis dis parturient montes nascetur ridiculus mus mauris.
                    Integer feugiat scelerisque varius morbi enim nunc. Nisl
                    condimentum id venenatis a condimentum vitae sapien.
                    Facilisi morbi tempus iaculis urna id. Congue mauris rhoncus
                    aenean vel elit. Arcu cursus euismod quis viverra nibh cras
                    pulvinar. Pellentesque elit eget gravida cum. Sed adipiscing
                    diam donec adipiscing. Pretium nibh ipsum consequat nisl.
                    Elementum pulvinar etiam non quam lacus suspendisse faucibus
                    interdum posuere. Arcu dui vivamus arcu felis bibendum ut.
                    Viverra ipsum nunc aliquet bibendum enim facilisis gravida
                    neque convallis. Aliquet sagittis id consectetur purus ut
                    faucibus pulvinar elementum. Laoreet suspendisse interdum
                    consectetur libero id. Nibh tellus molestie nunc non blandit
                    massa enim nec. Leo duis ut diam quam nulla porttitor massa.
                    Ipsum a arcu cursus vitae congue mauris rhoncus aenean. In
                    arcu cursus euismod quis viverra nibh cras. At volutpat diam
                    ut venenatis. Volutpat blandit aliquam etiam erat velit
                    scelerisque in dictum. Faucibus interdum posuere lorem ipsum
                    dolor sit amet. Montes nascetur ridiculus mus mauris vitae
                    ultricies leo. Massa enim nec dui nunc mattis enim ut
                    tellus. Dui sapien eget mi proin sed. Suspendisse potenti
                    nullam ac tortor vitae purus faucibus. Gravida cum sociis
                    natoque penatibus et magnis dis parturient montes. Sed
                    ullamcorper morbi tincidunt ornare massa eget egestas purus
                    viverra. Aliquam malesuada bibendum arcu vitae elementum
                    curabitur vitae nunc. Non arcu risus quis varius quam
                    quisque id. Odio euismod lacinia at quis risus sed vulputate
                    odio.
                  </p>
                </div>
                <div className="col-md-4 col-sm-12 text-wrapper">
                  <p className="text text-medium">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Pretium nibh ipsum consequat nisl vel pretium lectus
                    quam. Diam in arcu cursus euismod quis viverra nibh cras.
                    Donec pretium vulputate sapien nec. Amet aliquam id diam
                    maecenas. Et magnis dis parturient montes nascetur ridiculus
                    mus mauris. Integer feugiat scelerisque varius morbi enim
                    nunc. Nisl condimentum id venenatis a condimentum vitae
                    sapien. Facilisi morbi tempus iaculis urna id. Congue mauris
                    rhoncus aenean vel elit. Arcu cursus euismod quis viverra
                    nibh cras pulvinar. Pellentesque elit eget gravida cum. Sed
                    adipiscing diam donec adipiscing. Pretium nibh ipsum
                    consequat nisl. Elementum pulvinar etiam non quam lacus
                    suspendisse faucibus interdum posuere. Arcu dui vivamus arcu
                    felis bibendum ut. Viverra ipsum nunc aliquet bibendum enim
                    facilisis gravida neque convallis. Aliquet sagittis id
                    consectetur purus ut faucibus pulvinar elementum. Laoreet
                    suspendisse interdum consectetur libero id. Nibh tellus
                    molestie nunc non blandit massa enim nec. Leo duis ut diam
                    quam nulla porttitor massa. Ipsum a arcu cursus vitae congue
                    mauris rhoncus aenean. In arcu cursus euismod quis viverra
                    nibh cras. At volutpat diam ut venenatis. Volutpat blandit
                    aliquam etiam erat velit scelerisque in dictum. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Pretium
                    nibh ipsum consequat nisl vel pretium lectus quam. Diam in
                    arcu cursus euismod quis viverra nibh cras. Donec pretium
                    vulputate sapien nec. Amet aliquam id diam maecenas. Et
                    magnis dis parturient montes nascetur ridiculus mus mauris.
                    Integer feugiat scelerisque varius morbi enim nunc. Nisl
                    condimentum id venenatis a condimentum vitae sapien.
                    Facilisi morbi tempus iaculis urna id. Congue mauris rhoncus
                    aenean vel elit. Arcu cursus euismod quis viverra nibh cras
                    pulvinar. Pellentesque elit eget gravida cum. Sed adipiscing
                    diam donec adipiscing. Pretium nibh ipsum consequat nisl.
                    Elementum pulvinar etiam non quam lacus suspendisse faucibus
                    interdum posuere. Arcu dui vivamus arcu felis bibendum ut.
                    Viverra ipsum nunc aliquet bibendum enim facilisis gravida
                    neque convallis. Aliquet sagittis id consectetur purus ut
                    faucibus pulvinar elementum. Laoreet suspendisse interdum
                    consectetur libero id. Nibh tellus molestie nunc non blandit
                    massa enim nec. Leo duis ut diam quam nulla porttitor massa.
                    Ipsum a arcu cursus vitae congue mauris rhoncus aenean. In
                    arcu cursus euismod quis viverra nibh cras. At volutpat diam
                    ut venenatis. Volutpat blandit aliquam etiam erat velit
                    scelerisque in dictum.
                  </p>
                </div>
                <div className="col-md-4 col-sm-12 text-wrapper">
                  <p className="text text-big">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Pretium nibh ipsum consequat nisl vel pretium lectus
                    quam. Diam in arcu cursus euismod quis viverra nibh cras.
                    Donec pretium vulputate sapien nec. Amet aliquam id diam
                    maecenas. Et magnis dis parturient montes nascetur ridiculus
                    mus mauris. Integer feugiat scelerisque varius morbi enim
                    nunc. Nisl condimentum id venenatis a condimentum vitae
                    sapien. Facilisi morbi tempus iaculis urna id. Congue mauris
                    rhoncus aenean vel elit. Arcu cursus euismod quis viverra
                    nibh cras pulvinar. Pellentesque elit eget gravida cum. Sed
                    adipiscing diam donec adipiscing. Pretium nibh ipsum
                    consequat nisl. Elementum pulvinar etiam non quam lacus
                    suspendisse faucibus interdum posuere. Arcu dui vivamus arcu
                    felis bibendum ut. Viverra ipsum nunc aliquet bibendum enim
                    facilisis gravida neque convallis. Aliquet sagittis id
                    consectetur purus ut faucibus pulvinar elementum. Laoreet
                    suspendisse interdum consectetur libero id. Nibh tellus
                    molestie nunc non blandit massa enim nec. Leo duis ut diam
                    quam nulla porttitor massa. Ipsum a arcu cursus vitae congue
                    mauris rhoncus aenean. In arcu cursus euismod quis viverra
                    nibh cras. At volutpat diam ut venenatis. Volutpat blandit
                    aliquam etiam erat velit scelerisque in dictum. Faucibus
                    interdum posuere lorem ipsum dolor sit amet. Montes nascetur
                    ridiculus mus mauris vitae ultricies leo. Massa enim nec dui
                    nunc mattis enim ut tellus. Dui sapien eget mi proin sed.
                    Suspendisse potenti nullam ac tortor vitae purus faucibus.
                    Gravida cum sociis natoque penatibus et magnis dis
                    parturient montes. Sed ullamcorper morbi tincidunt ornare
                    massa eget egestas purus viverra. Aliquam malesuada bibendum
                    arcu vitae elementum curabitur vitae nunc. Non arcu risus
                    quis varius quam quisque id. Odio euismod lacinia at quis
                    risus sed vulputate odio. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Pretium nibh
                    ipsum consequat nisl vel pretium lectus quam. Diam in arcu
                    cursus euismod quis viverra nibh cras. Donec pretium
                    vulputate sapien nec. Amet aliquam id diam maecenas. Et
                    magnis dis parturient montes nascetur ridiculus mus mauris.
                    Integer feugiat scelerisque varius morbi enim nunc. Nisl
                    condimentum id venenatis a condimentum vitae sapien.
                    Facilisi morbi tempus iaculis urna id. Congue mauris rhoncus
                    aenean vel elit. Arcu cursus euismod quis viverra nibh cras
                    pulvinar. Pellentesque elit eget gravida cum. Sed adipiscing
                    diam donec adipiscing. Pretium nibh ipsum consequat nisl.
                    Elementum pulvinar etiam non quam lacus suspendisse faucibus
                    interdum posuere. Arcu dui vivamus arcu felis bibendum ut.
                    Viverra ipsum nunc aliquet bibendum enim facilisis gravida
                    neque convallis. Aliquet sagittis id consectetur purus ut
                    faucibus pulvinar elementum. Laoreet suspendisse interdum
                    consectetur libero id. Nibh tellus molestie nunc non blandit
                    massa enim nec. Leo duis ut diam quam nulla porttitor massa.
                    Ipsum a arcu cursus vitae congue mauris rhoncus aenean. In
                    arcu cursus euismod quis viverra nibh cras. At volutpat diam
                    ut venenatis. Volutpat blandit aliquam etiam erat velit
                    scelerisque in dictum. Faucibus interdum posuere lorem ipsum
                    dolor sit amet. Montes nascetur ridiculus mus mauris vitae
                    ultricies leo. Massa enim nec dui nunc mattis enim ut
                    tellus. Dui sapien eget mi proin sed. Suspendisse potenti
                    nullam ac tortor vitae purus faucibus. Gravida cum sociis
                    natoque penatibus et magnis dis parturient montes. Sed
                    ullamcorper morbi tincidunt ornare massa eget egestas purus
                    viverra. Aliquam malesuada bibendum arcu vitae elementum
                    curabitur vitae nunc. Non arcu risus quis varius quam
                    quisque id. Odio euismod lacinia at quis risus sed vulputate
                    odio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fontName: state.font.currentPreset.variant.family.name + state.font.currentPreset.variant.name,
  step: state.font.step,
  email: state.user.email,
  need: state.font.need,
  word: state.user.chosenWord,
  projectName: state.user.projectName
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      storeEmail,
      storeProject,
      goToCheckout: (fontName) => push({ pathname: '/checkout', fontName})
    },
    dispatch
  );

SpecimenView.propTypes = {
  storeEmail: PropTypes.func.isRequired,
  storeProject: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  fontName: PropTypes.string,
  email: PropTypes.string,
  need: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  }).isRequired,
  projectName: PropTypes.string,
  goToCheckout: PropTypes.func.isRequired
};

SpecimenView.defaultProps = {
  fontName: "ptypo",
  email: "",
  projectName: ""
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SpecimenView)
);
