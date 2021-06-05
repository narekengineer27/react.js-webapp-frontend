import React from "react";
import PropTypes from "prop-types";

import { MDBModal, MDBModalHeader, MDBContainer, MDBModalBody } from "mdbreact";
var Translate = require("react-redux-i18n").Translate;

const PasswordResetNote = props => {
  return (
    <MDBModal
      isOpen={props.isOpen}
      toggle={props.toggle}
      contentClassName="rounded-lg"
      centered
    >
      <MDBModalHeader toggle={props.toggle}></MDBModalHeader>
      <MDBModalBody>
        <MDBContainer>
          <div className="text-center m-4 text-success">
            <h5 className="font-weight-bold"><Translate value="auth.reset_password" /></h5>
          </div>
          <div className="text-center m-4">
            <Translate value="auth.reset_password_text" />
          </div>
        </MDBContainer>
      </MDBModalBody>
    </MDBModal>
  );
};

PasswordResetNote.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default PasswordResetNote;
