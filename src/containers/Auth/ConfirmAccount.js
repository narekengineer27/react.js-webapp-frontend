import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { confirmAccountRequest } from "../../actions/user";
var Translate = require('react-redux-i18n').Translate;

class ConfirmAccount extends React.Component {
  componentDidMount = () => {
    this.props.confirmAccount(this.props.match.params.id);
  };

  renderMessage = () => {
    const {
      isConfirmAccountSuccess,
      confirmAccountLoading,
      confirmAccountError
    } = this.props.user;

    let message = null;

    if (isConfirmAccountSuccess)
      message = (
        <div className="text-success m-4">
          <h3><Translate value="auth.confirm_message" /></h3>
        </div>
      );
    else if (confirmAccountLoading)
      message = (
        <div className="text-primary m-4">
          <h3><Translate value="auth.confirming" /></h3>
        </div>
      );
    else if (confirmAccountError)
      message = (
        <div className="text-danger m-4">
          <h3><Translate value="auth.confirm_fail" /></h3>
        </div>
      );

    return message;
  };

  renderLink = () =>
    !this.props.user.confirmAccountLoading ? (
      <Link to="/">Go to landing page.</Link>
    ) : null;

  render = () => {
    return (
      <div className="text-center">
        {this.renderMessage()}
        {this.renderLink()}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      confirmAccount: id => confirmAccountRequest(id)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmAccount);
