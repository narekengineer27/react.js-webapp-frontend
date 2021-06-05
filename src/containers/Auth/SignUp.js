import React from "react";

import SignUpModal from "../../components/Modals/SignUpModal";

const SignUp = props => (
  <SignUpModal
    isOpen={props.isOpen}
    toggle={props.toggle}
    onClickLogIn={props.onClickLogIn}
    signUp={props.signUp}
    user={props.user}
    sendWantedData={props.sendWantedData}
    resendRequest={() => props.resendRequest(props.user.signUpUser.id)}
  />
);

export default SignUp;
