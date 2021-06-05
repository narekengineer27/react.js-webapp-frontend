import React from "react";
import PropTypes from "prop-types";
import {
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBContainer,
  MDBIcon
} from "mdbreact";
import { Link } from "react-router-dom";

import { isEmail } from "../../utils/validator";
var I18n = require("react-redux-i18n").I18n;
var Translate = require("react-redux-i18n").Translate;

class LoginModal extends React.Component {
  state = {
    email: "",
    password: "",
    formError: { email: "", password: "" },
    invalidAlert: false,
    isCheckedRemember: false,
    message: null
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  validate = (key, value) => {
    if (this.state[key] === value) {
      this.setState({
        invalidAlert: true,
        message: I18n.t("auth.field_error")
      });
      return true;
    }
    if (key === "email" && !isEmail(this.state[key])) {
      this.setState({
        invalidAlert: true,
        message: I18n.t("auth.invalid_email")
      });
      return true;
    }

    return false;
  };

  handleClickLogIn = e => {
    let flag = false;

    this.setState(
      {
        invalidAlert: false
      },
      () => {
        Object.entries(this.state.formError).forEach(error => {
          flag = flag || this.validate(error[0], error[1]);
        });

        if (flag === true) return;

        this.props.logIn({
          email: this.state.email,
          password: this.state.password
        });
      }
    );
  };

  toggle = () => {
    this.setState({
      email: "",
      password: "",
      invalidAlert: false,
      isCheckedRemember: false,
      message: null
    });

    this.props.setLoginStatus(false);

    this.props.toggle();
  };

  keyPress = e => {
    if (e.keyCode === 13) {
      this.handleClickLogIn(e);
    }
  };

  render = () => (
    <MDBModal
      isOpen={this.props.isOpen}
      toggle={this.toggle}
      contentClassName="rounded-lg"
      centered
    >
      <MDBModalHeader toggle={this.props.toggle}>
        <Translate value="auth.login" />
      </MDBModalHeader>
      <MDBModalBody>{this.renderLoginForm()}</MDBModalBody>
    </MDBModal>
  );

  renderLoginForm = () => (
    <MDBContainer>
      {this.renderMessage()}
      {this.renderEmailInput()}
      {this.renderPasswordInput()}
      {this.renderCheckBox()}
      {this.renderLogInButton()}
      {this.renderFooter()}
    </MDBContainer>
  );

  renderMessage = () => (
    <div>
      {this.props.user.loginError ? (
        <span className="text-danger">
          <Translate value="auth.login_fail" />
        </span>
      ) : null}
      {this.props.user.loginLoading ? (
        <span className="text-primary">
          <Translate value="auth.loging_in" />
        </span>
      ) : null}
      {this.state.invalidAlert ? (
        <span className="text-danger">{this.state.message}</span>
      ) : null}
    </div>
  );

  renderEmailInput = () => (
    <MDBInput
      type="email"
      value={this.state.email}
      onChange={e => this.onChange("email", e.target.value)}
      onKeyDown={this.keyPress}
      label={I18n.t("common.email")}
    />
  );

  renderPasswordInput = () => (
    <MDBInput
      type="password"
      value={this.state.password}
      onChange={e => this.onChange("password", e.target.value)}
      onKeyDown={this.keyPress}
      label={I18n.t("common.password")}
    />
  );

  renderCheckBox = () => (
    <div className="custom-control custom-checkbox mb-2">
      <input
        type="checkbox"
        className="custom-control-input"
        id="checkRemember"
        name="remember-password"
        value={this.state.isCheckedRemember}
        onChange={e => this.onChange("isCheckedRemember", e.target.checked)}
      />
      <label className="custom-control-label" htmlFor="checkRemember">
        <Translate value="auth.remember_pass" />
      </label>
    </div>
  );

  renderLogInButton = () => (
    <button
      className="w-100 pt-2 mt-3 ml-0 lr-0 mb-0 plastplace-button"
      onClick={this.handleClickLogIn}
      disabled={this.props.user.loginLoading}
      style={{ height: "40px" }}
    >
      {this.props.user.loginLoading ? (
        <MDBIcon icon="circle-notch" spin size="2x" fixed />
      ) : (
        <h6>
          <Translate value="auth.login" />
        </h6>
      )}
    </button>
  );

  renderFooter = () => (
    <div className="mt-3 mb-1">
      <span>
        <Translate value="auth.alreay_not_exist" />
        &nbsp;
        <Link to="#" onClick={this.props.onClickSignUp}>
          <Translate value="auth.signup" />
        </Link>
      </span>
      <br />
      <Link to="#" onClick={this.props.onClickForgotPassword}>
        <Translate value="auth.forgot_pass" /> ?
      </Link>
    </div>
  );
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  setSignUpStatus: PropTypes.func
};

export default LoginModal;
