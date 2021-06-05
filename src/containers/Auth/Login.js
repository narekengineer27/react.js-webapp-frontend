import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoginModal from "../../components/Modals/LoginModal";
import { userLoginRequest, setLoginStatus } from "../../actions/user";

class Login extends React.Component {
  logIn = async userInfo => {
    await this.props.userLoginRequest(userInfo);
    this.props.history.push("/");
  };

  render() {
    const {
      isOpen,
      toggle,
      onClickSignUp,
      onClickForgotPassword,
      user,
      setLoginStatus
    } = this.props;
    return (
      <LoginModal
        isOpen={isOpen}
        toggle={toggle}
        onClickSignUp={onClickSignUp}
        onClickForgotPassword={onClickForgotPassword}
        logIn={this.logIn}
        user={user}
        setLoginStatus={setLoginStatus}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      userLoginRequest,
      setLoginStatus: status => setLoginStatus(status)
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
