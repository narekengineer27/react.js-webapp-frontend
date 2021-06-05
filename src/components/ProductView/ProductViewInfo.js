import React, { Component } from "react";
import { Link } from "react-router-dom";
import Star from "../../assets/img/svg/star-alt.svg";
import AuctionForm from "./Auction";
var Translate = require("react-redux-i18n").Translate;

class ProductViewInfo extends Component {
  render = () => {
    const userInfo = this.props.sellerData;
    const userId = this.props.userId;

    return userInfo ? (
      <div className="row product-view-info">
        {this.renderAdditionalInfo()}
        {this.renderSellerBlc(userInfo, userId)}
      </div>
    ) : null;
  };

  renderAdditionalInfo = () => {
    const { productDetail } = this.props;
    return (
      productDetail.isAuction && (
        <div className="col-sm-12 col-md-6 auction-blc">
          <h4 className="info-title">
            <Translate value="auction.auction" />
          </h4>
          {this.renderAuction(this.props.auctionData)}
        </div>
      )
    );
  };

  renderSellerBlc = (userInfo, userId) => (
    <div className="col-sm-12 col-md-6 seller-blc">
      <h4 className="info-title">
        <Translate value="common.seller" />
      </h4>
      <div
        className="user-info"
        ref={divRef => {
          if (divRef) this.sellerBlockHeight = divRef.offsetHeight - 20;
        }}
      >
        {this.renderUserInfoAvatar(userInfo)}
        {this.renderUserInfoFooter(userInfo, userId)}
      </div>
    </div>
  );

  renderUserInfoAvatar = userInfo => (
    <div className="user-info-avatar">
      <Link
        className={this.props.onlineStatus ? "online" : "offline"}
        to={`/profile/${userInfo.id}`}
      >
        {userInfo.avatar ? (
          <img
            className="colorful-placeholder s232"
            src={userInfo.avatar}
            alt=""
          />
        ) : (
          <div
            className="colorful-placeholder s232"
            style={{ background: "grey" }}
          >
            {userInfo.first_name.charAt(0).toUpperCase() +
              userInfo.last_name.charAt(0).toUpperCase()}
          </div>
        )}
      </Link>
      {this.renderUserInfoNameBlc(userInfo)}
    </div>
  );

  renderUserInfoNameBlc = userInfo => {
    return (
      <div className="user-info-name-blc">
        <div className="user-info-name">
          {userInfo.first_name}&nbsp;{userInfo.last_name}
        </div>
        <div className="location">
          <p className="company-name">{userInfo.Company.name}</p>
          <p className="country-name">
            {userInfo.Company.Country ? userInfo.Company.Country.name : null}
          </p>
          {userInfo.type === "PREMIUM" || userInfo.type === "ADMIN"
            ? this.renderPremium()
            : null}
        </div>
      </div>
    );
  };

  renderPremium = () => (
    <div className="premium">
      <span className="icon">
        <img src={Star} width="19px" height="18px" alt="" />
      </span>
      <Translate value="product_detail.premium_member" />
    </div>
  );

  renderUserInfoFooter = (userInfo, userId) => (
    <div className="user-info-footer">
      {userInfo && userInfo.id !== userId ? (
        <Link
          className="button button-blue follow"
          onClick={this.props.onClickFollow}
          to="#"
        >
          {!userInfo.follow ? (
            <Translate value="common.follow" />
          ) : (
            <Translate value="common.unfollow" />
          )}
        </Link>
      ) : null}

      <Link
        className="button button-outline-blue follow"
        to={`/profile/${userInfo.id}`}
      >
        <Translate value="product_detail.view_profile" />
      </Link>
    </div>
  );

  renderAuction = data => (
    <AuctionForm
      sellerBlockHeight={this.sellerBlockHeight}
      bidAuction={data.bidAuction}
      initialPrice={data.initialPrice}
      data={data.data}
      isMyListing={data.isMyListing}
      usdPrice={data.usdPrice}
      getCurrentListing={data.getCurrentListing}
      biddersOnlineStatus={this.props.biddersOnlineStatus}
      isAdmin={this.props.isAdmin}
    />
  );
}

export default ProductViewInfo;
