import React from "react";
import PropTypes from "prop-types";
import {
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBContainer,
  MDBModalBody
} from "mdbreact";
var I18n = require("react-redux-i18n").I18n;
var Translate = require("react-redux-i18n").Translate;

class SendMessageModal extends React.Component {
  state = {
    message: "",
    alert: null
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleClickSend = e => {
    this.props.sendMessage(this.state.message);
  };

  toggle = () => {
    this.setState({
      message: "",
      alert: null
    });

    this.props.toggle();
  };

  render() {
    return (
      <MDBModal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        contentClassName="rounded-lg"
        centered
      >
        <MDBModalHeader toggle={this.props.toggle}>
          <Translate value="message.new_message" />
        </MDBModalHeader>
        <MDBModalBody>{this.renderResetPasswordForm()}</MDBModalBody>
      </MDBModal>
    );
  }

  renderResetPasswordForm = () => (
    <MDBContainer>
      <div className="mt-4">
        <h5>To&nbsp;{this.props.sellerName}</h5>
      </div>
      <MDBInput
        type="textarea"
        value={this.state.message}
        onChange={e => this.onChange("message", e.target.value)}
        rows={3}
        label={I18n.t("message.messages")}
      />
      <button
        className="w-100 pt-2 mt-3 ml-0 lr-0 mb-0 green-button plastplace-button"
        style={{ height: "40px" }}
        onClick={e => this.handleClickSend(e)}
      >
        <h6>
          <Translate value="common.send" />
        </h6>
      </button>
    </MDBContainer>
  );
}

SendMessageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  username: PropTypes.string
};

export default SendMessageModal;
