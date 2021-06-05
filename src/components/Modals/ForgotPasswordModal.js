import React from "react";
import PropTypes from "prop-types";
import {
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBContainer,
  MDBModalBody,
  MDBIcon
} from "mdbreact";

import { isEmail } from "../../utils/validator";
var Translate = require('react-redux-i18n').Translate;

class ForgotPassword extends React.Component {
  state = {
    email: "",
    message: null
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleClickSend = e => {
    if (isEmail(this.state.email)) this.props.sendEmail(this.state.email);
    else
      this.setState({
        message: "Invalid Email."
      });
  };

  toggle = () => {
    this.setState({
      email: "",
      message: null
    });
    
    this.props.toggle();
  }

  render() {
    return (
      <MDBModal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        contentClassName="rounded-lg"
        centered
      >
        <MDBModalHeader toggle={this.props.toggle}>
          <Translate value="auth.forgot_pass" />
        </MDBModalHeader>
        <MDBModalBody>{this.renderResetPasswordForm()}</MDBModalBody>
      </MDBModal>
    );
  }

  renderResetPasswordForm = () => (
    <MDBContainer>
      <div className="text-center m-4 ">
        Enter your email below. Password reset instructions will be sent to your
        email.
        <Translate value="auth.forgot_pass_guide" />
      </div>
      {this.props.user.forgotPswdLoading ? (
        <div className="text-primary"><Translate value="auth.sending" /></div>
      ) : this.props.user.forgotPswdError ? (
        <div className="text-danger"><Translate value="auth.request_fail" /></div>
      ) : (
        <div className="text-danger">{this.state.message}</div>
      )}
      <MDBInput
        type="text"
        value={this.state.email}
        onChange={e => this.onChange("email", e.target.value)}
        label="email"
      />
      <button
        className="w-100 pt-2 mt-3 ml-0 lr-0 mb-0 green-button plastplace-button"
        style={{ height: "40px" }}
        onClick={e => this.handleClickSend(e)}
        disabled={this.props.user.forgotPswdLoading}
      >
        {this.props.user.forgotPswdLoading ? (
          <MDBIcon icon="circle-notch" spin size="2x" fixed />
        ) : (
          <h6><Translate value="common.send" /></h6>
        )}
      </button>
    </MDBContainer>
  );
}

ForgotPassword.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default ForgotPassword;
