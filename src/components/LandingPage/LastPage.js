import React from "react";
import { MDBBtn } from "mdbreact";
var Translate = require('react-redux-i18n').Translate;

class LastPage extends React.Component {
  render() {
    return (
      <div className="landing-main" style={{overflow: "hidden"}}>
        <div className="main-content">
          <div className="last-title">
            <Translate value="landing.last_title" />
          </div>
          <MDBBtn
            className="landing-btn"
            onClick={this.props.signup}
          >
            <Translate value="auth.signup" />
          </MDBBtn>
        </div>
        <div className="circle-side">
          <div className="green-circle-last" />
        </div>
      </div>
    );
  }
}

export default LastPage;
