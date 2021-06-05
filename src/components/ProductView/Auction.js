import React from "react";
import { MDBContainer } from "mdbreact";
import { createNotification } from "../../utils/notification";
import BidderListModal from "../Modals/BidderListModal";
var Translate = require("react-redux-i18n").Translate;
var I18n = require("react-redux-i18n").I18n;

class AuctionForm extends React.Component {
  state = {
    price: "",
    alert: false,
    isBidderListModalOpen: false,
    timeLeft: 0
  };

  componentDidMount = () => {
    const timer = data => () => this.timerForTimeLeft(data);
    this.auctionTimer = setInterval(
      timer(this.props.data.listing.auctionDateTime),
      1000
    );
  };

  componentWillUnmount = () => {
    clearInterval(this.auctionTimer);
  };

  timerForTimeLeft = data => {
    this.setState({
      timeLeft: new Date(data) - new Date()
    });
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  onClickBid = e => {
    const highestPrice =
      this.props.data.highestPrice === 0
        ? this.props.initialPrice
        : this.props.data.highestPrice;

    if (new Date() > new Date(this.props.data.listing.auctionDateTime)) {
      createNotification("Sorry, auction has ended.");
      return;
    }

    if (
      parseFloat(this.state.price) + 0.005 >=
      highestPrice + this.props.data.listing.auctionInterval
    ) {
      this.props.bidAuction(this.state.price);
      this.props.getCurrentListing();
    } else {
      this.setState({ alert: true });
    }
  };

  toggleBidderListModal = () => {
    this.setState({
      isBidderListModalOpen: !this.state.isBidderListModalOpen
    });
  };

  render() {
    return (
      <div className="auction-form-container">
        {this.props.data ? this.renderAuctionForm() : null}
        <BidderListModal
          isOpen={this.state.isBidderListModalOpen}
          toggle={this.toggleBidderListModal}
          bidders={this.props.data.bidders}
          listingCurrency={this.props.data.listing.currency}
          biddersOnlineStatus={this.props.biddersOnlineStatus}
          isAdmin={this.props.isAdmin}
        />
      </div>
    );
  }

  renderAuctionForm = () => {
    const textStyle = { fontSize: "18px" };

    return (
      <MDBContainer>
        <div style={{height: this.props.sellerBlockHeight}}>
          {this.renderTimeLeft()}
          {/* {this.renderStartingPrice(textStyle)} */}
          {this.renderCurrentBid(textStyle)}
          {this.state.timeLeft > 0 && this.renderUSDPrice()}
          {this.state.timeLeft > 0 && !this.props.isMyListing
            ? this.renderBidContainer()
            : null}
        </div>
      </MDBContainer>
    );
  };

  renderTimeLeft = () => {
    let formattedText;
    let timeLeft = this.state.timeLeft;

    if (this.state.timeLeft < 0) {
      formattedText = I18n.t("auction.auction_ended");
    } else {
      formattedText = "";
      timeLeft /= 1000;

      const sec = Math.floor(timeLeft) % 60;
      timeLeft /= 60;
      if (sec) formattedText = ` ${sec} ${sec === 1 ? "sec" : "secs"}`;
      const min = Math.floor(timeLeft) % 60;
      timeLeft /= 60;
      if (min)
        formattedText = ` ${min} ${min === 1 ? "min" : "mins"}${formattedText}`;
      const hour = Math.floor(timeLeft) % 24;
      timeLeft /= 24;
      if (hour)
        formattedText = ` ${hour} ${
          hour === 1 ? "hour" : "hours"
        }${formattedText}`;
      timeLeft = Math.floor(timeLeft);
      if (timeLeft)
        formattedText = ` ${timeLeft} ${
          timeLeft === 1 ? "day" : "days"
        }${formattedText}`;

      formattedText = `Time remains ${formattedText}`;
    }

    return <div className="mb-2">{formattedText}</div>;
  };

  renderStartingPrice = textStyle => (
    <div>
      <Translate value="auction.start_price" />:{" "}
      <span className="text-default" style={textStyle}>
        {`${this.props.data.listing.currency} ${this.props.initialPrice}`}
      </span>
    </div>
  );

  renderCurrentBid = textStyle => (
    <div className="d-flex justify-content-between">
      <span>
        <Translate value="auction.current_bid" />:{" "}
        <span className="text-default" style={textStyle}>{`${
          this.props.data.listing.currency
        } ${this.props.data.highestPrice.toFixed(2)}`}</span>
      </span>
      <span
        onClick={e => {
          if (this.props.data.count) this.toggleBidderListModal();
        }}
        className="auction-bids"
      >{`[${this.props.data.count} bids]`}</span>
    </div>
  );

  renderUSDPrice = () => (
    <p>
      <Translate value="auction.approximately" /> $
      {this.props.usdPrice.toFixed(2)}
    </p>
  );

  renderBidContainer = () => (
    <div>
      <div className="input-bid">
        <input
          className="w-50 pt-0"
          type="number"
          value={this.state.price}
          onChange={e => this.onChange("price", e.target.value)}
          style={{ height: "40px" }}
        /> 
        <button
          className="w-50 pt-2 lr-0 green-button plastplace-button"
          style={{ height: "40px" }}
          onClick={this.onClickBid}
        >
          <h6>Place Bid</h6>
        </button>
      </div>
      <div className={this.state.alert ? "text-danger" : null}>
        Enter{" "}
        {`${this.props.data.listing.currency} ${(
          (this.props.data.highestPrice === 0
            ? this.props.initialPrice
            : this.props.data.highestPrice) +
          this.props.data.listing.auctionInterval
        ).toFixed(2)}`}{" "}
        or more.
      </div>
    </div>
  );
}

export default AuctionForm;
