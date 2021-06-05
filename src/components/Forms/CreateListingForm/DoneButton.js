import React from "react";
import PropTypes from "prop-types";
import { MDBIcon } from "mdbreact";
var Translate = require('react-redux-i18n').Translate;

const DoneButton = props => (
  <div className="container mt-5 pb-4 text-center">
    <button
      className="plastplace-button ml-0 pt-2 pb-1"
      onClick={props.onClick}
      disabled={props.isCreatingListing}
      style={{ width: "200px" }}
    >
      {props.isCreatingListing ? (
        <MDBIcon icon="circle-notch" spin size="2x" fixed />
      ) : (
        <h6><Translate value="common.done" /></h6>
      )}
    </button>
  </div>
);

DoneButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCreatingListing: PropTypes.bool.isRequired
};

export default DoneButton;
