import React from "react";
import PropTypes from "prop-types";
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody
} from "mdbreact";

import SignUpForm from "../../components/Forms/SignUp";
var Translate = require("react-redux-i18n").Translate;

class SignUpModal extends React.Component {
  render = () => {
    return (
      <MDBModal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        size="lg"
        contentClassName="rounded-lg"
        centered
      >
        <MDBModalHeader toggle={this.props.toggle}>
          <Translate value="auth.signup" />
        </MDBModalHeader>
        <MDBModalBody>{this.renderSignUpForm()}</MDBModalBody>
      </MDBModal>
    );
  };

  renderSignUpForm = () => (
    <SignUpForm
      user={this.props.user}
      signUp={this.props.signUp}
      sendWantedData={this.props.sendWantedData}
      resendRequest={this.props.resendRequest}
      onClickFinish={e => this.props.toggle()}
      onClickLogIn={this.props.onClickLogIn}
    />
  );
}

SignUpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onClickLogIn: PropTypes.func.isRequired
};

export default SignUpModal;
