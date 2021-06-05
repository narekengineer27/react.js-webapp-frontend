import React from "react";
import { MDBTabPane, MDBRow } from "mdbreact";
import { Link } from "react-router-dom";
var Translate = require("react-redux-i18n").Translate;

class SignUpSuccessForm extends React.Component {
  render = () => (
    <MDBTabPane tabId="3" role="tabpanel">
      {this.renderGreeting()}
      {this.renderExplanation()}
      {this.renderResendButton()}
      {this.renderFinishButton()}
    </MDBTabPane>
  );

  renderGreeting = () => (
    <div className="text-center m-4 text-success">
      <h5 className="font-weight-bold">
        <Translate value="auth.thank_signup" />
      </h5>
    </div>
  );

  renderExplanation = () => (
    <div className="text-center m-4">
      <Translate value="auth.email_sent" />
      <br />
      <Translate value="auth.click_link" />
      <hr />
      <Translate value="auth.resend_email" />
    </div>
  );

  renderResendButton = () => (
    <MDBRow className="d-flex justify-content-center pb-3 mt-3">
      <button
        className="button button-primary m-3"
        onClick={this.props.onClickResend}
      >
        <Translate value="common.resend" />
      </button>
    </MDBRow>
  );

  renderFinishButton = () => (
    <MDBRow className="d-flex justify-content-end pb-3">
      <Link
        to="#"
        onClick={this.props.onClickFinish}
        className="button button-outline-primary mt-3 ml-3 mr-3"
      >
        <Translate value="common.finish" />
      </Link>
    </MDBRow>
  );
}
export default SignUpSuccessForm;
