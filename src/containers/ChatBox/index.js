import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MDBBtn } from "mdbreact"

import Contact from "../../components/Message/Contact";
import MessageBox from "../../components/Message/MessageBox";
import {
  getContactList,
  getUnreadMessages,
  getMessages,
  sendNewMessage
} from "../../actions/message";
var I18n = require("react-redux-i18n").I18n;
//var Translate = require("react-redux-i18n").Translate;

class ChatBox extends React.Component {
  state = {
    draft: "",
    currentListingId: null,
    currentOpponentId: null,
    currentOpponentName: "",
    currentSeller: null,
    searchValue: "",
    currentContact: null,
    currentOpponent: null,
    isMobileMaterial: false,
    isMobileSeller: false,
    isMobile: window.innerWidth < 1200 ? true : false,
    isFollowModalOpen: false,
    isListCollpased: true,
    isMessageBoxCollapsed: true,
    isSelf: false
  };

  componentDidMount = async () => {
    this.props.getContactList();
  };

  componentDidUpdate = () => {
    if (this.boxRef) this.boxRef.scrollTop = this.boxRef.scrollHeight;
  };

  render = () => {
    return window.innerWidth > 1200 ? (
      <div className="chat-area">
        <div className="chatbox-main">
          {this.renderHeader()}
          {this.state.isListCollapsed ? this.renderContactList() : null}
          {this.state.isListCollapsed ? this.renderSearch() : null}
        </div>
        <div
          className="contactbox-container"
          style={{ display: this.state.currentContact ? "block" : "none" }}
          onClick={e => this.clearNotification()}
        >
          {this.renderMessageBoxHeader()}
          {this.state.isMessageBoxCollapsed
            ? this.renderShowMessageBox()
            : null}
          {this.state.isMessageBoxCollapsed
            ? this.renderMessageInputArea()
            : null}
        </div>
      </div>
    ) : null;
  };

  renderHeader = () => (
    <div
      className="header"
      onClick={e =>
        this.handleChange("isListCollapsed", !this.state.isListCollapsed)
      }
    >
      Chat
    </div>
  );

  renderContactList = () => {
    const filteredContactList = this.getFilteredContactList();

    return (
      <div className="chatbox-list">
        {filteredContactList.map((contact, index) => (
          <React.Fragment key={index}>
            {this.renderContact(contact)}
          </React.Fragment>
        ))}
      </div>
    );
  };

  renderContact = contact => {
    let opponentName;

    if (this.props.user.currentUser)
      if (contact.SellerId === this.props.user.currentUser.id) {
        opponentName =
          contact.Customer.first_name + " " + contact.Customer.last_name;
      } else if (contact.CustomerId === this.props.user.currentUser.id) {
        opponentName =
          contact.Seller.first_name + " " + contact.Seller.last_name;
      }

    return (
      <Contact
        contact={contact}
        onClickContact={this.handleClickContact}
        opponentName={opponentName}
        isCurrent={
          this.state.currentContact
            ? this.state.currentContact.id === contact.id
            : false
        }
        unreadMessagesCount={this.getUnreadMessagesCountByContact(contact)}
      />
    );
  };

  getUnreadMessagesCountByContact = contact => {
    return this.props.message.unreadMessages.filter(
      (msg, index) =>
        msg.ListingId === contact.ListingId &&
        ((msg.Sender === contact.SellerId &&
          msg.Recipient === contact.CustomerId) ||
          (msg.Sender === contact.CustomerId &&
            msg.Recipient === contact.SellerId))
    ).length;
  };

  getFilteredContactList = () => {
    let contactList = this.props.message.contactList;
    let filteredContactList;
    let currentUser = this.props.user.currentUser;

    if (!contactList) contactList = [];
    if (!currentUser) currentUser = {};

    const searchValue = this.state.searchValue.toLowerCase();

    filteredContactList = contactList.filter((contact, index) =>
      contact.Listing
        ? contact.Listing.title.toLowerCase().includes(searchValue) ||
          (currentUser.id === contact.SellerId
            ? (contact.Customer.first_name + contact.Customer.last_name)
                .toLowerCase()
                .includes(searchValue)
            : (contact.Seller.first_name + contact.Seller.last_name)
                .toLowerCase()
                .includes(searchValue))
        : false
    );

    return filteredContactList;
  };

  handleChangeSearch = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  handleChange = (name, value) => {
    this.clearNotification();

    this.setState({
      [name]: value
    });
  };

  handleSend = () => {
    if (this.props.user.currentUser && this.state.draft !== "") {
      this.props.sendNewMessage({
        ListingId: this.state.currentListingId,
        from: this.props.user.currentUser.id,
        to: this.state.currentOpponentId,
        message: this.state.draft,
        time: new Date().toString()
      });
      this.setState({
        draft: ""
      });
    }
  };

  clearNotification = () => {
    if (
      this.state.currentContact &&
      this.getUnreadMessagesCountByContact(this.state.currentContact) > 0
    )
      this.handleClickContact(this.state.currentContact)(null);
  };

  renderSearch = () => (
    <div className="messages-menu-search">
      <input
        className="messages-menu-search-input"
        value={this.state.searchValue}
        onChange={this.handleChangeSearch}
        placeholder={I18n.t("message.search_message")}
      />
    </div>
  );

  handleClickContact = contact => async e => {
    let {
      opponentId,
      opponentName,
      currentOpponent
    } = this.getCurrentOpponentInfo(contact);

    await this.props.getMessages({
      ListingId: contact.ListingId,
      opponentId
    });

    await this.props.getUnreadMessages();
    const isSelf = this.props.user.currentUser.id === contact.Seller.id;

    this.setState({
      currentListingId: contact.ListingId,
      currentOpponentId: opponentId,
      currentOpponentName: opponentName,
      currentSeller: contact.Seller,
      currentContact: contact,
      currentOpponent,
      isSelf,
      isMessageBoxCollapsed: true
    });
  };

  getCurrentOpponentInfo = contact => {
    let opponentId, opponentName, currentOpponent;

    if (this.props.user.currentUser)
      if (contact.SellerId === this.props.user.currentUser.id) {
        opponentId = contact.CustomerId;
        opponentName =
          contact.Customer.first_name + " " + contact.Customer.last_name;
        currentOpponent = contact.Customer;
      } else if (contact.CustomerId === this.props.user.currentUser.id) {
        opponentId = contact.SellerId;
        opponentName =
          contact.Seller.first_name + " " + contact.Seller.last_name;
        currentOpponent = contact.Seller;
      }

    return { opponentId, opponentName, currentOpponent };
  };

  renderMessageBoxHeader = () => {
    return (
      <div
        className="header"
        onClick={e =>
          this.handleChange(
            "isMessageBoxCollapsed",
            !this.state.isMessageBoxCollapsed
          )
        }
      >
        <div className="seller-name">{this.state.currentOpponentName}</div>
        <div
          className="close-button"
          onClick={e => this.handleChange("currentContact", null)}
        >
          <i className="fas fa-times close-button" />
        </div>
      </div>
    );
  };

  renderShowMessageBox = () => {
    const myId = this.props.user.currentUser
      ? this.props.user.currentUser.id
      : null;

    return (
      <MessageBox
        myId={myId}
        currentOpponent={this.state.currentOpponent}
        currentListingId={this.state.currentListingId}
        messages={this.props.message.messages}
        setBoxRef={this.setBoxRef}
      />
    );
  };

  renderMessageInputArea = () => (
    <div className="messages-input-area">
      <textarea
        value={this.state.draft}
        onChange={e => this.handleChange("draft", e.target.value)}
        onKeyDown={this.handleKeyDownMessage}
      ></textarea>
      <div className="send-button-container">
        <MDBBtn color="success" onClick={e => this.handleSend()}>
          <i className="far fa-paper-plane" style={{fontSize: "20px"}}></i>
        </MDBBtn>
      </div>
    </div>
  );

  handleKeyDownMessage = e => {
    if (e.key === "Enter" && !e.shiftKey && this.state.draft !== "") {
      e.preventDefault();
      this.handleSend();
    }
  };

  setBoxRef = ref => {
    this.boxRef = ref;
  };
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getContactList, getUnreadMessages, getMessages, sendNewMessage },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
