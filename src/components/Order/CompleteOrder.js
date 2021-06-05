import React from "react";
import { MDBTabPane } from "mdbreact";

import { createNotification } from "../../utils/notification";
import NextButton from "./NextButton";

var Translate = require("react-redux-i18n").Translate;
var I18n = require("react-redux-i18n").I18n;

class CompleteOrder extends React.Component {
  state = {
    stripe: null,
    stripeInfo: null,
    downloadLink: null,
    loadingSave: false
  };

  componentDidMount = async () => {
    const { getPaymentSettings } = this.props;

    const paymentSettings = await getPaymentSettings();
    const stripeInfo = paymentSettings.stripe;

    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(stripeInfo.publishableKey) });
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        this.setState({
          stripe: window.Stripe(stripeInfo.publishableKey)
        });
      });
    }
    this.setState({ stripeInfo });
  };

  handleClickNext = async e => {
    if (this.state.loadingSave) return;
    this.setState({ loadingSave: true });
    const {
      onClickNexthandler,
      selectedPaymentMethod,
      sendOrder,
      sendConfirmCardOrder,
      productDetail
    } = this.props;
    const stripe = this.state.stripe ? this.state.stripe : null;
    const data = { ListingId: productDetail.id, method: selectedPaymentMethod };
    const result = await sendOrder(data);

    if (result.data.error) {
      if (result.data.error === "authentication_required") {
        if (stripe) {
          stripe
            .confirmCardPayment(result.data.clientSecret, {
              payment_method: result.data.paymentMethod
            })
            .then(async res => {
              if (res.error) {
                createNotification("⚠️ " + res.error.message, "info");
                this.setState({ loadingSave: false });
              } else {
                const resultData = await sendConfirmCardOrder(
                  res.paymentIntent.id
                );
                onClickNexthandler(resultData.zipUrl);
                this.setState({ loadingSave: false });
              }
            });
        }
      }
    } else {
      onClickNexthandler(result.data.data.zipUrl);
      this.setState({ loadingSave: false });
    }
  };

  render = () => {
    return (
      <MDBTabPane tabId="4" role="tabpanel">
        <div className="order-wrapper">
          {this.renderTitle()}
          {this.renderShortText()}
          {this.renderDetail()}
          {this.renderNextButton()}
        </div>
      </MDBTabPane>
    );
  };

  renderTitle = () => <div className="title text-center">Complete Order</div>;

  renderShortText = () => (
    <div className="short-text text-center">
      Check your order and complete the payment process.
    </div>
  );

  renderDetail = () => {
    const { productDetail } = this.props;
    const renderUnit = productDetail.unit === "mt" ? "t" : productDetail.unit
    const correctQty = productDetail.quantity + renderUnit;
    const orderVolume = (
      productDetail.pricePerUnit * productDetail.quantity
    ).toFixed(2);
    const fee = ((orderVolume / 100) * 3).toFixed(2);
    const detailCharactors = {
      category: productDetail.Category.name,
      condition: productDetail.Condition.name,
      quantity: correctQty,
      supply: productDetail.supply,
      pricing_term: productDetail.PricingTerm.name,
      address: productDetail.address
    };
    const detailDisplayNames = {
      category: I18n.t("common.category"),
      condition: I18n.t("common.condition"),
      quantity: I18n.t("common.quantity"),
      supply: I18n.t("common.supply"),
      pricing_term: I18n.t("common.pricing_terms"),
      address: I18n.t("common.location")
    };
    const currencySymbol = productDetail.Country.Currency.symbol;
    const charactors = {
      pricePerUnit: this.numberWithCommas(productDetail.pricePerUnit),
      order_volume: this.numberWithCommas(orderVolume),
      fee: this.numberWithCommas(fee)
    };
    const displayNames = {
      pricePerUnit: "Price / " + renderUnit,
      order_volume: "Order Volume",
      fee: "Fee"
    };

    return (
      <div className="additional-info">
        <h4 className="info-title detail-title">
          <Translate value="product_detail.material" />
        </h4>
        <div className="material-info">
          {Object.keys(detailCharactors).map((item, i) => (
            <div className="row m-0 material-info-items" key={item}>
              <div className="col-6 col-sm-4 col-md-2 p-0 pt-2">
                {detailDisplayNames[item]}
              </div>
              <div className="col-6 col-sm-8 col-md-10 p-0 pt-2">
                {detailCharactors[item]}
              </div>
            </div>
          ))}
        </div>
        <div className="material-payment-info">
          {Object.keys(charactors).map((item, i) => (
            <div className="additional-info-item" key={i}>
              <span className="additional-info-item-title">
                {displayNames[item]}
              </span>
              <span
                className="additional-info-item-description"
                ref={divRef => {
                  if (divRef)
                    divRef.innerHTML = currencySymbol + " " + charactors[item];
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  renderNextButton = () => (
    <NextButton
      onClickNext={this.handleClickNext}
      loadingSave={this.state.loadingSave}
    />
  );
  numberWithCommas(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
}

export default CompleteOrder;
