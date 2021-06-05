import React from "react";
import { Link } from "react-router-dom";
var Translate = require("react-redux-i18n").Translate;

const SellerInfo = props => {
  const {
    sellerId,
    sellerAvatar,
    sellerContractedName,
    sellerName,
    sellerCompany,
    sellerCountry,
    sellerFollow,
    isSelf
  } = props;

  return (
    <React.Fragment>
      <div className="message-seller-info-container">
        {renderAvatar(sellerAvatar, sellerContractedName)}
        {renderInfo(sellerName, sellerCompany, sellerCountry)}
      </div>
      {renderButtonGroup(sellerId, sellerFollow, isSelf, props.onClickFollow)}
    </React.Fragment>
  );
};

const renderAvatar = (sellerAvatar, sellerContractedName) => (
  <div className="message-seller-avatar">
    {sellerAvatar ? (
      <img className="message-seller-avatar-image" src={sellerAvatar} alt="" />
    ) : (
      <div>{sellerContractedName}</div>
    )}
  </div>
);

const renderInfo = (sellerName, sellerCompany, sellerCountry) => (
  <div className="info-user">
    <div className="name-user">
      <span>{sellerName}</span>
    </div>
    <p className="name-company">{sellerCompany}</p>
    <p className="location">{sellerCountry ? sellerCountry.name : null}</p>
  </div>
);

const renderButtonGroup = (sellerId, sellerFollow, isSelf, onClickFollow) => {
  return !isSelf ? (
    <div className="info-button-group">
      <div className="col-xs-3">
        <Link
          className="button button-primary follow"
          onClick={onClickFollow}
          to="#"
        >
          {!sellerFollow ? (
            <Translate value="common.follow" />
          ) : (
            <Translate value="common.unfollow" />
          )}
        </Link>
      </div>
      <div className="col-xs-3">
        <div className="button button-outline-primary">
          <Link to={`/profile/${sellerId}`}>
            <Translate value="product_detail.view_profile" />
          </Link>
        </div>
      </div>
      <div className="col-xs-3">
        <div className="button button-outline-primary">
          <span className="text-danger">
            <Translate value="message.block_user" />
          </span>
        </div>
      </div>
      <div className="col-xs-3">
        <div className="button button-outline-primary">
          <span className="text-danger">
            <Translate value="message.report_scam" />
          </span>
        </div>
      </div>
    </div>
  ) : null;
};

export default SellerInfo;
