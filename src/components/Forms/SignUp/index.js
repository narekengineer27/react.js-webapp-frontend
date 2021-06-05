import React, { Component } from "react";
import { MDBContainer, MDBTabContent } from "mdbreact";

import UserInfoForm from "./UserInfoForm";
import WantedForm from "./WantedForm";
import SignUpSuccessForm from "./SignUpSuccessForm";

class SignUpForm extends Component {
  state = {
    activeItem: "1"
  };

  toggle = tab => () => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    return <MDBContainer>{this.renderContent()}</MDBContainer>;
  }

  renderContent = () => (
    <MDBTabContent activeItem={this.state.activeItem}>
      <UserInfoForm
        user={this.props.user}
        onClickNext={this.handleClickNextOnStep1}
        signUp={this.props.signUp}
        onClickLogIn={this.props.onClickLogIn}
      />
      <WantedForm
        UserId={this.props.user.signUpUser ? this.props.user.signUpUser.id : -1}
        sendWantedData={this.props.sendWantedData}
        onClickNext={this.toggle("3")}
      />
      <SignUpSuccessForm
        onClickResend={e => this.props.resendRequest()}
        onClickFinish={this.props.onClickFinish}
      />
    </MDBTabContent>
  );

  handleClickNextOnStep1 = data => {
    this.toggle("2")();
  };
}
export default SignUpForm;
