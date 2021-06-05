import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MDBBtn } from "mdbreact"
import { getCurrencies, getExchangeRates } from "../../actions/listing";
import {
  getContactList,
  getMessages,
  sendNewMessage,
  getUnreadMessages
} from "../../actions/message";
import { changeFollowStatus, getFollowings, setCurrentPage } from "../../actions/user";
import PriceConverter from "../../components/Message/PriceConverter";
import Contact from "../../components/Message/Contact";
import SellerInfo from "../../components/Message/SellerInfo";
import ListingDetail from "../../components/Message/ListingDetail";
import MessageBox from "../../components/Message/MessageBox";
import { unitRates } from "../../utils/constants";
import FollowModal from "../../components/Modals/FollowModal";
var I18n = require("react-redux-i18n").I18n;
var Translate = require("react-redux-i18n").Translate;

class Messages extends React.Component {
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
    isSelf: false
  };
  componentDidMount = async () => {
    this.props.setCurrentPage("/messages")
    this.props.getContactList();
    if (this.props.listing.currencies.length === 0) {
      this.props.getExchangeRates();
      this.props.getCurrencies();
    }
  };

  componentDidUpdate = () => {
    this.boxRef.scrollTop = this.boxRef.scrollHeight;
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
      isMobileMaterial: this.state.isMobile
        ? !this.state.isMobileMaterial
        : this.state.isMobileMaterial
    });
  };

  setBoxRef = ref => {
    this.boxRef = ref;
  };

  toggleModal = async () => {
    if (!this.state.isFollowModalOpen)
      await this.props.changeFollowStatus(this.state.currentSeller.id).then(res => {
        let currentSeller = { ...this.state.currentSeller };
        currentSeller.follow = res.follow;
        this.props.getFollowings(this.props.user.currentUser.id, "all")
        this.setState({ currentSeller });
      });

      this.setState({ isFollowModalOpen: !this.state.isFollowModalOpen });
  };

  render = () => {
    return (
      <div className="wrapper-margin">
        <div className="message-block">
          {this.renderHeader()}
          {this.renderBody()}
          <FollowModal
            isOpen={this.state.isFollowModalOpen}
            toggle={this.toggleModal}
            sellerData={this.state.currentSeller}
          />
        </div>
      </div>
    );
  };

  renderHeader = () => (
    <div className="messages-header">
      <h4>
        <Translate value="message.messages" />
      </h4>
      <div className="row button-group">
        <div className="material" onClick={this.handleMobileOpenMenu}>
          {this.state.isMobileMaterial ? (
            <i className="fas fa-times" />
          ) : (
            <i className="far fa-calendar" />
          )}
        </div>
        <div className="seller" onClick={this.handleMobileOpenSeller}>
          {this.state.isMobileSeller ? (
            <i className="fas fa-times" />
          ) : (
            <i className="far fa-address-book" />
          )}
        </div>
      </div>
    </div>
  );

  renderBody = () => (
    <div className="messages-body">
      {this.renderMenu()}
      {this.renderMainBox()}
      {this.renderSellerContainer()}
    </div>
  );

  renderMenu = () => (
    <div
      className={
        this.state.isMobileMaterial ? "messages-menu-mobile" : "messages-menu"
      }
    >
      {this.renderSearch()}
      {this.renderMenuBody()}
    </div>
  );

  renderMainBox = () => (
    <div
      className="messages-main-box"
      style={
        this.state.isMobileMaterial || this.state.isMobileSeller
          ? { display: "none" }
          : { display: "block" }
      }
      onClick={e => this.clearNotification()}
    >
      {this.renderSellerName()}
      {this.renderShowMessageBox()}
      {this.state.currentContact ? this.renderMessageInputArea() : null}
    </div>
  );

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

  renderSellerName = () => (
    <div className="seller-name">{this.state.currentOpponentName}</div>
  );

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

  renderMenuBody = () => {
    const filteredContactList = this.getFilteredContactList();

    return (
      <div className="messages-menu-body">
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

  clearNotification = () => {
    if (
      this.state.currentContact &&
      this.getUnreadMessagesCountByContact(this.state.currentContact) > 0
    )
      this.handleClickContact(this.state.currentContact)(null);
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

  renderSellerContainer = () => {
    const sellerInfo = this.getSellerInfo();

    return this.state.currentContact ? (
      this.state.isMobileSeller ? (
        <div className="message-seller-container-mobile">
          {this.renderSellerInfo(sellerInfo)}
          {this.renderProductDetail()}
          {this.renderPriceConverter()}
        </div>
      ) : (
        <div className="message-seller-container">
          {this.renderSellerInfo(sellerInfo)}
          {this.renderProductDetail()}
          {this.renderPriceConverter()}
        </div>
      )
    ) : null;
  };

  renderSellerInfo = sellerInfo => (
    <SellerInfo {...sellerInfo} onClickFollow={this.toggleModal} />
  );

  renderProductDetail = () => {
    const listingInfo = this.getListingInfo();

    return <ListingDetail {...listingInfo} />;
  };

  renderPriceConverter = () => (
    <PriceConverter
      currencies={this.props.listing.currencies}
      exchangeRates={this.props.listing.exchangeRates}
      units={unitRates}
      price={
        this.state.currentContact
          ? this.state.currentContact.Listing.pricePerUnit
          : 0
      }
      quantity={
        this.state.currentContact
          ? this.state.currentContact.Listing.quantity
          : 0
      }
      unit={
        this.state.currentContact
          ? this.state.currentContact.Listing.unit
          : "kg"
      }
      currency={
        this.state.currentContact
          ? this.state.currentContact.Listing.Country.Currency.code
          : this.props.listing.currencies[0].code
      }
    />
  );

  handleKeyDownMessage = e => {
    if (e.key === "Enter" && !e.shiftKey && this.state.draft !== "") {
      e.preventDefault();
      this.handleSend();
    }
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

  handleMobileOpenMenu = e => {
    this.setState({
      isMobileMaterial: !this.state.isMobileMaterial
    });
  };

  handleMobileOpenSeller = e => {
    this.setState({
      isMobileSeller: !this.state.isMobileSeller
    });
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

  getSellerInfo = () => {
    const { currentSeller, currentContact } = this.state;

    if (!currentSeller) return {};
    return {
      sellerId: currentContact.SellerId,
      sellerName: `${currentSeller.first_name} ${currentSeller.last_name}`,
      sellerCompany: currentSeller.Company.name,
      sellerCountry: currentSeller.Company.Country,
      sellerAvatar: currentSeller.avatar,
      sellerFollow: currentSeller.follow,
      sellerContractedName: `${currentSeller.first_name
        .charAt(0)
        .toUpperCase()}${currentSeller.last_name.charAt(0).toUpperCase()}`,
      isSelf: this.state.isSelf
    };
  };

  getListingInfo = () => {
    const { currentContact } = this.state;

    if (!currentContact) return {};
    const listing = currentContact.Listing;

    return {
      listingId: listing.id,
      listingImage: listing.ListingImage,
      listingName: listing.title,
      listingPrice: `${listing.pricePerUnit}/${listing.unit === "mt" ? "t" : listing.unit}`,
      location: `${listing.address}, ${listing.city}, ${listing.Country.name}`,
      description: listing.description
    };
  };
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      sendNewMessage,
      getContactList,
      getMessages,
      getCurrencies,
      getExchangeRates,
      getUnreadMessages,
      changeFollowStatus,
      getFollowings,
      setCurrentPage
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
