// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { storeExportType } from '../../data/user';
import Checkout from '../checkout';
import Button from '../button';
import './ExportType.css';

const ExportType = props =>
  (<div>
    {props.choice.direct
      ? <Checkout
        title="Prototypo Lite"
        amount={props.choice.price}
        description={props.choice.paymentDescription}
      >
        <div
          className={`ExportType ${props.expanded ? 'expanded' : ''}`}
          role="button"
          tabIndex="0"
          onClick={props.expanded ? () => {} : props.selectChoice}
        >
          <div className="card">
            <div className="image" />
            <div className="title">
              {props.choice.title}
            </div>
          </div>
        </div>
      </Checkout>
      : <div>
        {props.expanded
            ? <Button className="ExportBack" label="Go back" onClick={props.removeChoice} />
            : false}
        <div
          className={`ExportType ${props.expanded ? 'expanded' : ''}`}
          role="button"
          tabIndex="0"
          onClick={props.expanded ? () => {} : props.selectChoice}
        >
          <div className="card">
            <div className="image" />
            <div className="title">
              {props.choice.title}
            </div>
          </div>
          <div className="description">
            {props.choice.description}
            <Checkout
              title="Prototypo Lite"
              amount={props.choice.price}
              description={props.choice.paymentDescription}
            >
              <Button
                className="select"
                label="Go for it"
                onClick={() => {
                  props.storeExportType(props.choice.type);
                }}
              />
            </Checkout>
          </div>
        </div>
      </div>}
  </div>);

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ storeExportType }, dispatch);

ExportType.propTypes = {
  storeExportType: PropTypes.func.isRequired,
  choice: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.element.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    paymentDescription: PropTypes.string.isRequired,
    direct: PropTypes.bool,
  }).isRequired,
  selectChoice: PropTypes.func.isRequired,
  removeChoice: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
};

ExportType.defaultProps = {
  expanded: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportType);
