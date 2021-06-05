import React from "react";
import { Link } from "react-router-dom";
var Translate = require('react-redux-i18n').Translate;

const ListingDetail = props => {
  const {
    listingImage,
    listingName,
    listingPrice,
    location,
    listingId,
    description
  } = props;

  return (
    <div className="product-container">
      <div className="product-avatar-container">
        <div className="product-avatar">
          <img width={"100%"} src={listingImage} alt="" />
        </div>
      </div>
      <div className="product-info">
        <div className="product-name">{listingName}</div>
        <div className="price-container">
          <span><Translate value="common.price" /></span>
          <span>{listingPrice}</span>
        </div>
        <div className="location-container">
          <span><Translate value="common.location" /></span>
          <span className="location">{location}</span>
        </div>
        <div className="detail-container">
          <span><Translate value="message.material_desc" />: </span>
          <div
            className="shot-text"
            ref={divRef => {
              if (divRef) divRef.innerHTML = description;
            }}
          />
        </div>
        <Link
          className="button button-outline-primary view-more-btn"
          to={`/product/${listingId}`}
        >
          <span><Translate value="common.view_more" /></span>
        </Link>
      </div>
    </div>
  );
};

export default ListingDetail;
