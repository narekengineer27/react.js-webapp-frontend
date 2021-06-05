import React from "react";
import { connect } from "react-redux";
import ForgotPasswordModal from "../../components/Modals/ForgotPasswordModal";
import { sendForgotPswdEmail } from "../../actions/user";

const ForgotPassword = props => (
  <ForgotPasswordModal
    isOpen={props.isOpen}
    toggle={props.toggle}
    sendEmail={props.sendEmail}
    user={props.user}
  />
);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  sendEmail: email => dispatch(sendForgotPswdEmail({ email }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
