import React from "react";
import { MDBTabPane, MDBRow, MDBCol, MDBContainer, MDBInput } from "mdbreact";
import { Link } from "react-router-dom";

import { isEmail, isPasswordValid } from "../../../utils/validator";
var I18n = require('react-redux-i18n').I18n;
var Translate = require('react-redux-i18n').Translate;

class UserInfoForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    company: "",
    businessEmail: "",
    password: "",
    reenterPassword: "",
    formError: {
      firstName: "",
      lastName: "",
      company: "",
      businessEmail: "",
      password: "",
      reenterPassword: "",
      isCheckedAgree: false
    },
    invalidAlert: false,
    message: null,
    isCheckedAgree: false
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  validate = (key, value) => {
    if (key === "isCheckedAgree" && !this.state.isCheckedAgree) {
      this.setState({
        invalidAlert: true,
        message: I18n.t("auth.terms")
      });
      return true;
    }

    if (this.state[key] === value) {
      this.setState({
        invalidAlert: true,
        message: I18n.t("auth.field_error")
      });
      return true;
    }

    if (key === "businessEmail" && !isEmail(this.state[key])) {
      this.setState({
        invalidAlert: true,
        message: I18n.t("auth.invalid_email")
      });
      return true;
    }

    if (key === "password" && !isPasswordValid(this.state[key])) {
      this.setState({
        invalidAlert: true,
        message: I18n.t("auth.invalid_password")
      });
      return true;
    }

    return false;
  };

  handleClickNext = () => {
    if (this.state.password !== this.state.reenterPassword) {
      this.setState({
        invalidAlert: true,
        message: I18n.t("auth.confirm_password")
      });

      return;
    }

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

        const userInfo = {
          firstname: this.state.firstName,
          lastname: this.state.lastName,
          company: this.state.company,
          email: this.state.businessEmail,
          password: this.state.password
        };
        this.props.signUp({
          userInfo,
          handleSuccess: () => this.props.onClickNext()
        });
      }
    );
  };

  renderSignUpForm = () => (
    <MDBContainer>
      {this.renderMessage()}
      {this.renderInputGroup()}
      {this.renderFooter()}
    </MDBContainer>
  );

  renderMessage = () => (
    <div>
      {this.props.user.signUpError ? (
        <span className="text-danger">
          <Translate value="auth.signup_faild" />
        </span>
      ) : null}
      {this.props.user.signUpLoading ? (
        <span className="text-primary">
          <Translate value="auth.signing_up" />
        </span>
      ) : null}
      {this.state.invalidAlert ? (
        <span className="text-danger">{this.state.message}</span>
      ) : null}
    </div>
  );

  renderInputGroup = () => {
    const inputs = [
      { type: "text", name: "firstName", label: I18n.t("common.first_name") },
      { type: "text", name: "lastName", label: I18n.t("common.last_name")},
      { type: "text", name: "company", label: I18n.t("common.company") },
      { type: "text", name: "businessEmail", label: I18n.t("common.email") },
      { type: "password", name: "password", label: I18n.t("common.password") },
      { type: "password", name: "reenterPassword", label: I18n.t("common.reenter_password") }
    ];

    const inlineInputGroups = [];

    for (let i = 0; i < inputs.length; i += 2) {
      inlineInputGroups.push([
        inputs[i],
        i < inputs.length - 1 ? inputs[i + 1] : null
      ]);
    }

    return (
      <div>
        {inlineInputGroups.map((group, index) => (
          <div key={index}>
            {this.renderInlineInputGroup(group[0], group[1])}
          </div>
        ))}
      </div>
    );
  };

  renderInlineInputGroup = (left, right) => (
    <MDBRow>
      {this.renderInput(left)}
      {right ? this.renderInput(right) : null}
    </MDBRow>
  );

  renderInput = data => (
    <MDBCol sm="6">
      <MDBInput
        type={data.type}
        value={this.state[data.name]}
        onChange={e => this.onChange(data.name, e.target.value)}
        label={data.label}
      />
    </MDBCol>
  );

  renderFooter = () => (
    <div className="text-center mt-3 mb-1 ">
      <div className="custom-control custom-checkbox mb-2">
        <input
          type="checkbox"
          className="custom-control-input"
          id="checkRemember"
          name="remember-password"
          value={this.state.isCheckedAgree}
          onChange={e => this.onChange("isCheckedAgree", e.target.checked)}
        />
        <label className="custom-control-label" htmlFor="checkRemember">
          <Translate value="auth.terms_head" />&nbsp;
          <Link to="/terms" target="_blank">
            <u><Translate value="auth.terms_body" /></u>
          </Link>
        </label>
      </div>
      <div style={{ color: "#656565" }}>
        <Translate value="auth.alreay_exist" />&nbsp;
        <Link to="#" onClick={this.props.onClickLogIn}><Translate value="auth.login" /></Link>
      </div>
    </div>
  );

  renderNextButton = () => (
    <div className="d-flex justify-content-end mr-3 pb-3">
      <button className="button button-primary" onClick={this.handleClickNext}>
        <Translate value="common.next" />
      </button>
    </div>
  );

  render = () => (
    <MDBTabPane tabId="1" role="tabpanel">
      {this.renderSignUpForm()}
      {this.renderNextButton()}
    </MDBTabPane>
  );
}

export default UserInfoForm;
