import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ProductView from "../components/ProductView";
import ProductsSlider from "../components/ProductsSlider";
import LoadingCard from "../components/LoadingCard";
import {
  getListing,
  getListingsByUserId,
  getListingsByCategoryId,
  setListingsData,
  getExchangeRates,
  sendWishStatus,
  getListingsByWishList
} from "../actions/listing";
import {
  getUserProfile,
  changeFollowStatus,
  getFollowings,
  setCurrentPage
} from "../actions/user";
import SendMessageModal from "../components/Modals/SendMessageModal";
import { addContact, getOnlineStatusArraySuccess } from "../actions/message";
import {
  sendGetOnlineStatusRequest,
  sendGetOnlineStatusArrayRequest
} from "../utils/socket";
import { bidAuction, getAuction } from "../actions/buyer";
import AuctionModal from "../components/Modals/AuctionModal";
import FollowModal from "../components/Modals/FollowModal";

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      isWish: false,
      loadingData: false,
      listingData: null,
      sellerData: null,
      sellerListingsData: null,
      similarListingsData: null,
      isSendMessageModalOpen: false,
      isAuctionModalOpen: false,
      isFollowModalOpen: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.setCurrentPage("/");
    this.loadListingData(id);
  }

  componentWillUnmount = () => {
    clearInterval(this.getOnlineStatusTimer);
    clearInterval(this.getBiddersOnlineStatusTimer);
  };

  getOpponentOnlineStatus = opponentId => {
    sendGetOnlineStatusRequest({ opponentId });
  };

  getBidderUsersOnlineStatus = bidderUserIds => {
    sendGetOnlineStatusArrayRequest(bidderUserIds);
  };

  getBiddersUserIds = () => {
    const bidders = this.props.currentAuction
      ? this.props.currentAuction.bidders
      : null;
    let bidderUserIds = [];
    for (let i = 0; i < bidders.length; i++) {
      bidderUserIds.push(bidders[i].User.id);
    }
    return bidderUserIds;
  };

  loadListingData = async id => {
    try {
      this.props.getExchangeRates();

      this.setState({ loadingData: true });
      const listingData = await this.props.getListing(id);

      if (listingData.isAuction)
        await this.props.getAuction({ ListingId: listingData.id });

      if (listingData.isAuction) {
        this.getBiddersOnlineStatus = () =>
          this.getBidderUsersOnlineStatus(this.getBiddersUserIds());
        this.getBiddersOnlineStatusTimer = setInterval(
          this.getBiddersOnlineStatus,
          3000
        );
      }

      this.getOnlineStatus = () =>
        this.getOpponentOnlineStatus(listingData.UserId);
      this.getOnlineStatusTimer = setInterval(this.getOnlineStatus, 3000);

      const sellerData = await this.props.getUserProfile(listingData.UserId);
      const sellerListingsData = await this.props.getListingsByUserId({
        userId: listingData.UserId,
        productIdSelected: id
      });
      const similarListingsData = await this.props.getListingsByCategoryId({
        categoryId: listingData.CategoryId,
        productIdSelected: id
      });

      this.setState({
        listingData,
        sellerData,
        loadingData: false,
        sellerListingsData,
        similarListingsData,
        isWish: listingData.isWish
      });
    } catch (err) {
      console.log(err);
      this.setState({ loadingData: false });
    }
  };

  toggleModal = async name => {
    if (!this.state[name] && name === "isAuctionModalOpen")
      await this.props.getAuction({ ListingId: this.state.listingData.id });

    if (this.props.currentAuction) {
      this.getBiddersOnlineStatus = () =>
        this.getBidderUsersOnlineStatus(this.getBiddersUserIds());
      this.getOnlineStatusTimer = setInterval(
        this.getBiddersOnlineStatus,
        3000
      );
    }

    if (!this.state[name] && name === "isFollowModalOpen")
      await this.props
        .changeFollowStatus(this.state.sellerData.id)
        .then(res => {
          let sellerData = { ...this.state.sellerData };
          sellerData.follow = res.follow;
          this.props.getFollowings(this.props.userId, "all");
          this.setState({ sellerData });
        });

    this.setState({
      [name]: !this.state[name]
    });
  };

  sendMessage = async message => {
    if (this.state.listingData && this.state.sellerData) {
      await this.props.addContact({
        ListingId: this.state.listingData.id,
        SellerId: this.state.sellerData.id,
        content: message
      });
      this.toggleModal();
      this.props.history.push("/messages");
    }
  };

  render() {
    const {
      loadingData,
      listingData,
      sellerData,
      sellerListingsData,
      similarListingsData
    } = this.state;
    if (!listingData && !loadingData) return null;

    const auctionData = {
      bidAuction: this.bidAuction,
      initialPrice: this.state.listingData
        ? this.state.listingData.pricePerUnit
        : null,
      data: this.props.currentAuction,
      isMyListing: this.state.listingData
        ? this.props.userEmail === "t.litjens@cabka.com"
          ? false
          : this.state.listingData.UserId === this.props.userId
        : true,

      usdPrice: this.getUSDPrice(),
      getCurrentListing: () => this.loadListingData(this.props.match.params.id)
    };
    return (
      <div className="wrapper-margin">
        <div className="product-view">
          {loadingData && <LoadingCard />}
          {!loadingData && (
            <React.Fragment>
              <ProductView
                history={this.props.history}
                productDetail={listingData}
                sellerData={sellerData}
                onClick={this.onWishList}
                wishCheck={this.state.isWish}
                onClickChat={e => this.toggleModal("isSendMessageModalOpen")}
                onlineStatus={this.props.onlineStatus}
                auctionData={auctionData}
                userId={this.props.userId}
                onClickFollow={e => this.toggleModal("isFollowModalOpen")}
                biddersOnlineStatus={this.props.biddersOnlineStatus}
                isAdmin={this.props.isAdmin}
              />
              <ProductsSlider
                productList={sellerListingsData}
                userName={sellerData.first_name}
                history={this.props.history}
                setListingsData={this.props.setListingsData}
                loadListingData={this.loadListingData}
              />
              <ProductsSlider
                productList={similarListingsData}
                history={this.props.history}
                setListingsData={this.props.setListingsData}
                loadListingData={this.loadListingData}
              />
            </React.Fragment>
          )}
          <SendMessageModal
            isOpen={this.state.isSendMessageModalOpen}
            toggle={() => this.toggleModal("isSendMessageModalOpen")}
            sellerName={
              sellerData
                ? sellerData.first_name + " " + sellerData.last_name
                : null
            }
            sendMessage={this.sendMessage}
          />
          <FollowModal
            isOpen={this.state.isFollowModalOpen}
            toggle={() => this.toggleModal("isFollowModalOpen")}
            sellerData={this.state.sellerData}
          />
          {this.props.currentAuction && (
            <AuctionModal
              isOpen={this.state.isAuctionModalOpen}
              toggle={() => this.toggleModal("isAuctionModalOpen")}
              bidAuction={this.bidAuction}
              initialPrice={
                this.state.listingData
                  ? this.state.listingData.pricePerUnit
                  : null
              }
              data={this.props.currentAuction}
              isMyListing={
                this.state.listingData
                  ? this.state.listingData.UserId === this.props.userId
                  : true
              }
              usdPrice={this.getUSDPrice()}
              getCurrentListing={() =>
                this.loadListingData(this.props.match.params.id)
              }
              biddersOnlineStatus={this.props.biddersOnlineStatus}
              isAdmin={this.props.isAdmin}
            />
          )}
        </div>
      </div>
    );
  }

  getUSDPrice = () => {
    if (
      !this.state.listingData ||
      !this.props.exchangeRates ||
      !this.props.currentAuction
    )
      return 0;
    if (this.state.listingData.Country.Currency.code === "EUR")
      return (
        this.props.currentAuction.highestPrice * this.props.exchangeRates["USD"]
      );
    return (
      (this.props.currentAuction.highestPrice *
        this.props.exchangeRates["USD"]) /
      this.props.exchangeRates[this.state.listingData.Country.Currency.code]
    );
  };

  onWishList = e => {
    this.props.sendWishStatus(this.props.match.params.id).then(res => {
      this.props.getListingsByWishList();

      this.setState({
        isWish: res.isWish
      });
    });
  };

  bidAuction = price => {
    this.props.bidAuction({ ListingId: this.state.listingData.id, price });
  };
}

const mapStateToProps = state => ({
  onlineStatus: state.message.currentOpponentOnlineStatus,
  biddersOnlineStatus: state.message.currentBidderArrayOnlineStatus,
  currentAuction: state.buyer.currentAuction,
  userId: state.user.currentUser ? state.user.currentUser.id : -1,
  userEmail: state.user.currentUser ? state.user.currentUser.email : "",
  exchangeRates: state.listing.exchangeRates,
  isAdmin: state.user.isAdmin
});

// import action here and send to props
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getListing,
      getUserProfile,
      getListingsByUserId,
      getListingsByCategoryId,
      setListingsData,
      getExchangeRates,
      addContact,
      bidAuction,
      getAuction,
      sendWishStatus,
      changeFollowStatus,
      getFollowings,
      getListingsByWishList,
      getOnlineStatusArraySuccess,
      setCurrentPage
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
