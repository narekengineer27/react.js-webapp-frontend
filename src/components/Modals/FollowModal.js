import React, { Component } from "react";
import { MDBModal, MDBModalHeader } from "mdbreact";
var Translate = require("react-redux-i18n").Translate;

class FollowModal extends Component {
  render = () => {
    const userInfo = this.props.sellerData;
    const userName = userInfo
      ? userInfo.first_name + " " + userInfo.last_name
      : null;
    return (
      <MDBModal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        contentClassName="modal-follow rounded-lg"
        centered
      >
        <MDBModalHeader
          className="modal-follow-header"
          toggle={this.props.toggle}
        />
        <div className="modal-head">
          {userInfo && userInfo.follow
            ? this.renderFollow()
            : this.renderUnFollow()}
        </div>
        <div className="modal-text text-center">
          {userInfo && userInfo.follow
            ? "You are now a follow of " + userName
            : "You are no longer a follower of " + userName}
        </div>
      </MDBModal>
    );
  };

  renderFollow = () => (
    <span className="modal-head-title">
      <i className="icon follow fas fa-check-circle" />
      <div className="title text-center">
        <Translate value="common.follow" />
      </div>
    </span>
  );

  renderUnFollow = () => (
    <span className="modal-head-title">
      <i className="icon unfollow fas fa-exclamation-circle" />
      <div className="title text-center">
        <Translate value="common.unfollow" />
      </div>
    </span>
  );
}

export default FollowModal;
