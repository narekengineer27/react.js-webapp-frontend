import React, { Component } from "react";
import ProductSliderBlock from "./ProductSliderBlock";
var Translate = require("react-redux-i18n").Translate;
var I18n = require("react-redux-i18n").I18n;

class ProductsSlider extends Component {
  render = () => {
    return (
      <div className="products-slider">
        {this.renderProductSliderHeader()}
        {this.renderProductSliderBlc()}
      </div>
    );
  };

  onGoToDashboard = () => {
    const { productList, setListingsData, history } = this.props;
    setListingsData(productList);
    history.push("/?filtering=true");
  };

  renderProductSliderHeader = () => {
    const productSliderTitle = this.props.userName
      ? I18n.t("product_detail.user_offers")
      : I18n.t("product_detail.similar_offers");
    const sliderStyle = this.props.productList.length === 0 ? "none" : "flex";

    return (
      <div className="products-slider-header" style={{ display: sliderStyle }}>
        <h4 className="info-title">
          {productSliderTitle}&nbsp;{this.props.userName}
        </h4>
        <div
          className="button button-outline-blue button-white"
          onClick={this.onGoToDashboard}
        >
          <Translate value="product_detail.see_all" />
        </div>
      </div>
    );
  };

  onGoToOtherListing = async id => {
    await this.props.loadListingData(id);
    this.props.history.push(`/product/${id}`);
  };

  renderProductSliderBlc = () => (
    <ProductSliderBlock
      productList={this.props.productList}
      onGoToOtherListing={this.onGoToOtherListing}
      isProductDetail={true}
    />
  );
}

export default ProductsSlider;
