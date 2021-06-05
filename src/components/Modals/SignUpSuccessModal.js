import React from "react";
import PropTypes from "prop-types";

import { MDBModal, MDBModalHeader, MDBContainer, MDBModalBody } from "mdbreact";
var Translate = require("react-redux-i18n").Translate;

const SignUpSuccessModal = props => {
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
            <h5 className="font-weight-bold">
              <Translate value="auth.thank_signup" />
            </h5>
          </div>
          <div className="text-center m-4">
            <Translate value="auth.email_sent" />
            <br />
            <Translate value="auth.click_link" />
            <hr />
            <Translate value="auth.resend_email" />
            <button
              className="w-100 pt-2 mt-3 ml-0 lr-0 mb-0 plastplace-button"
              style={{ height: "40px" }}
              onClick={props.onClickResend}
            >
              <h6>
                <Translate value="common.resend" />
              </h6>
            </button>
          </div>
        </MDBContainer>
      </MDBModalBody>
    </MDBModal>
  );
};

SignUpSuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default SignUpSuccessModal;
