import React, { Component } from "react";
import { Link } from "react-router-dom";

import MainImage from "./MainImage";
import ImageSlider from "./ImageSlider";
import AuctionForm from "./Auction";
var Translate = require("react-redux-i18n").Translate;
var I18n = require("react-redux-i18n").I18n;

class ProductViewHeader extends Component {
  render = () => {
    const { productDetail, userId } = this.props;
    const urls =
      productDetail.ListingFiles && productDetail.ListingFiles.length > 0
        ? productDetail.ListingFiles
        : null;
    let files = [];
    let pdfUrl = [];
    if (urls) {
      for (let i = 0; i < urls.length; i++) {
        if (urls[i].type === "PDF") pdfUrl.push(urls[i]);
        else files.push(urls[i]);
      }
    } else files = null;

    return (
      <div className="row m-0 pb-4 product-view-header">
        <div className="col-sm-12 col-md-5 p-0 mb-3 gallery">
          <MainImage
            imgLink={files && files.length > 0 ? files[0].url : null}
            type={files && files.length > 0 ? files[0].type : null}
            imgAlt={productDetail.title}
          />
          <ImageSlider className="slider-blc" files={files} />
        </div>
        <div className="col-sm-12 col-md-6 offset-md-1 product-small-info">
          {this.renderProductTitle()}
          {this.renderShortText()}
          {this.renderDetail()}
          {!productDetail.isAuction && this.renderProductPrice()}
          {!productDetail.isOrdered && productDetail.UserId !== userId && this.renderOrderButton()}
          {productDetail.UserId !== userId && this.renderProductInfoAction()}
        </div>
        {pdfUrl.length > 0 ? this.renderPDF(pdfUrl) : null}
      </div>
    );
  };

  renderPDF = pdfUrl =>
    pdfUrl.map((item, index) => {
      return (
        <div key={index} className="row pdf-blc">
          <span>[PDF]</span>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <h5>
              {item.url
                ? decodeURIComponent(
                    item.url
                      .substring(item.url.lastIndexOf("/") + 1)
                      .split("+")
                      .join(" ")
                  )
                : null}
            </h5>
          </a>
        </div>
      );
    });

  renderProductTitle = () => (
    <div className="product-small-info-title">
      {this.props.productDetail.title}
    </div>
  );

  renderShortText = () => (
    <div className="product-small-info-description">
      <div className="row">
        <div className="col-md-6">
          <div
            className="shot-text pb-4"
            ref={divRef => {
              if (divRef)
                divRef.innerHTML = this.props.productDetail.description;
            }}
          />
        </div>
      </div>
    </div>
  );

  renderProductPrice = () => (
    <div className="product-price">
      <span className="value-price">
        <b>
          <span
            ref={spanRef => {
              if (spanRef)
                spanRef.innerHTML = this.props.productDetail.Country.Currency.symbol;
            }}
          />
          {this.props.productDetail.pricePerUnit}
        </b>
        {this.props.productDetail.unit === "mt"
          ? "/t"
          : "/" + this.props.productDetail.unit}
      </span>
    </div>
  );

  renderOrderButton = () => (
    <div className="row pl-3 product-small-info-action">
      <Link
        className="col-sm-6 col-md-8 button button-blue"
        to="#"
        onClick={e => {
          e.preventDefault();
          this.props.history.push({
            pathname: "/order",
            state: { productDetail: this.props.productDetail }
          });
        }}
      >
        <i className="fab fa-opencart"></i>
        <span>
          <Translate value="product_detail.order" />
        </span>
      </Link>
    </div>
  );

  renderProductInfoAction = () => (
    <div className="row pl-3 product-small-info-action">
      <Link
        className="col-sm-6 col-md-8 button button-blue"
        to="#"
        onClick={this.props.onClickChat}
      >
        <i className="far fa-comments" />
        <span>
          <Translate value="product_detail.chat_seller" />
        </span>
      </Link>
      {this.renderWish()}
    </div>
  );

  renderWish = () => {
    const checkedIcon = this.props.wishCheck ? "fas fa-heart" : "far fa-heart";
    const toolTip = this.props.wishCheck
      ? I18n.t("common.remove")
      : I18n.t("common.save");
    return (
      <div
        className="col-sm-6 col-md-4 pinSpan save-btn"
        onClick={this.props.onClick}
      >
        <i className={checkedIcon} />
        <div className="profile-tooltip">
          <p className="txt">{toolTip}</p>
          <span>▲</span>
        </div>
      </div>
    );
  };

  renderAuction = data => (
    <AuctionForm
      bidAuction={data.bidAuction}
      initialPrice={data.initialPrice}
      data={data.data}
      isMyListing={data.isMyListing}
      usdPrice={data.usdPrice}
      getCurrentListing={data.getCurrentListing}
    />
  );

  renderDetail = () => {
    const { productDetail } = this.props;
    const renderUnit = productDetail.unit === "mt" ? "t" : productDetail.unit;
    const correctQty = productDetail.quantity + renderUnit;
    const charactors = {
      category: productDetail.Category.name,
      condition: productDetail.Condition.name,
      quantity: correctQty,
      supply: productDetail.supply,
      pricing_term: productDetail.PricingTerm.name,
      address: productDetail.address
    };
    const displayNames = {
      category: I18n.t("common.category"),
      condition: I18n.t("common.condition"),
      quantity: I18n.t("common.quantity"),
      supply: I18n.t("common.supply"),
      pricing_term: I18n.t("common.pricing_terms"),
      address: I18n.t("common.location")
    };

    return (
      <div className="additional-info">
        {Object.keys(charactors).map((item, i) => (
          <div className="row pt-2 m-0 additional-info-item" key={item}>
            <span className="col-6 col-sm-4 p-0">{displayNames[item]}</span>
            <span className="col-6 col-sm-8 p-0">{charactors[item]}</span>
          </div>
        ))}
      </div>
    );
  };
}

export default ProductViewHeader;
