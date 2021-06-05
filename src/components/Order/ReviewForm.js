import React from "react";
import { MDBTabPane } from "mdbreact";

import NextButton from "./NextButton";

var Translate = require("react-redux-i18n").Translate;
var I18n = require("react-redux-i18n").I18n;

class ReviewForm extends React.Component {
  render = () => {
    return (
      <MDBTabPane tabId="1" role="tabpanel">
        <div className="order-wrapper">
          {this.renderTitle()}
          {this.renderShortText()}
          {this.renderDetail()}
          {this.renderNextButton()}
        </div>
      </MDBTabPane>
    );
  };

  renderTitle = () => <div className="title text-center">Order</div>;

  renderShortText = () => (
    <div className="short-text text-center">Review your current Order.</div>
  );

  renderDetail = () => {
    const { productDetail } = this.props;
    const renderUnit = productDetail.unit === "mt" ? "t" : productDetail.unit
    const correctQty = productDetail.quantity + " " + renderUnit;
    const currencySymbol = productDetail.Country.Currency.symbol;
    const orderVolume = (
      productDetail.pricePerUnit * productDetail.quantity
    ).toFixed(2);
    const fee = ((orderVolume / 100) * 3).toFixed(2);
    const charactors = {
      pricePerUnit: this.numberWithCommas(productDetail.pricePerUnit),
      quantity: this.numberWithCommas(correctQty),
      order_volume: this.numberWithCommas(orderVolume),
      fee: this.numberWithCommas(fee)
    };
    const displayNames = {
      pricePerUnit: "Price / " + renderUnit,
      quantity: I18n.t("common.quantity"),
      order_volume: "Order Volume",
      fee: "Fee"
    };

    return (
      <div className="additional-info">
        <h4 className="info-title detail-title">
          <Translate value="product_detail.material" />
        </h4>
        {Object.keys(charactors).map((item, i) => (
          <div className="additional-info-item" key={item}>
            <span className="additional-info-item-title">
              {displayNames[item]}
            </span>
            {item === "quantity" ? (
              <span className="additional-info-item-description">
                {charactors[item]}
              </span>
            ) : (
              <span
                className="additional-info-item-description"
                ref={divRef => {
                  if (divRef)
                    divRef.innerHTML = currencySymbol + " " + charactors[item];
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  renderNextButton = () => <NextButton onClickNext={this.props.onClickNext} />;

  numberWithCommas(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
}

export default ReviewForm;
