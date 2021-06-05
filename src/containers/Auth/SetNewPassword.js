import React from "react";
import { connect } from "react-redux";
import { MDBInput, MDBBtn, MDBContainer, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";

import { isPasswordValid } from "../../utils/validator";
import { sendResetPswdRequest } from "../../actions/user";
var I18n = require("react-redux-i18n").I18n;
var Translate = require("react-redux-i18n").Translate;

class SetNewPassword extends React.Component {
  state = {
    newPassword: "",
    reenterNewPassword: "",
    message: null
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleClickSave = e => {
    if (!isPasswordValid(this.state.newPassword)) {
      this.setState({
        message: "The password should be at least 8 letters."
      });
    } else if (this.state.newPassword !== this.state.reenterNewPassword) {
      this.setState({
        message: "Confirm password correctly."
      });
    } else {
      this.props.resetPassword({
        password: this.state.newPassword,
        token: this.props.match.params.id
      });
    }
  };

  renderTitle = () => (
    <div className="text-center text-primary font-weight-bold m-4">
      <h4>
        <Translate value="auth.reset_password" />
      </h4>
    </div>
  );

  renderMessage = () =>
    this.props.user.isResetPswdSuccess ? (
      <div className="text-success m-4">
        <Translate value="auth.reset_pass_success" />
      </div>
    ) : this.props.user.resetPswdError ? (
      <div className="text-danger m-4">
        <Translate value="auth.reset_pass_fail" />
      </div>
    ) : this.props.user.resetPswdLoading ? (
      <div className="text-primary m-4">
        <Translate value="auth.reseting_pass" />
      </div>
    ) : (
      <div className="text-danger m-4">{this.state.message}</div>
    );

  renderNewPasswordInput = () => (
    <MDBInput
      type="password"
      value={this.state.email}
      onChange={e => this.onChange("newPassword", e.target.value)}
      label={I18n.t("auth.enter_new_pass")}
    />
  );

  renderReenterPasswordInput = () => (
    <MDBInput
      type="password"
      value={this.state.email}
      onChange={e => this.onChange("reenterNewPassword", e.target.value)}
      label={I18n.t("auth.reenter_new_pass")}
    />
  );

  renderSaveBtn = () => (
    <MDBBtn
      color="primary"
      style={{ width: "100%" }}
      className="mt-3 ml-0 lr-0 mb-3"
      onClick={e => this.handleClickSave(e)}
    >
      {this.props.user.resetPswdLoading ? (
        <MDBIcon icon="circle-notch" spin size="2x" fixed />
      ) : (
        <h6>
          <Translate value="common.save" />
        </h6>
      )}
    </MDBBtn>
  );

  renderLink = () =>
    !this.props.user.confirmAccountLoading ? (
      <Link to="/">
        <Translate value="auth.goto_landing" />
      </Link>
    ) : null;

  render() {
    return (
      <MDBContainer className="col-sm-12 col-lg-4 align-self-center">
        {this.renderTitle()}
        {this.renderMessage()}
        {this.renderNewPasswordInput()}
        {this.renderReenterPasswordInput()}
        {this.renderSaveBtn()}
        {this.renderLink()}
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  resetPassword: data => dispatch(sendResetPswdRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetNewPassword);
