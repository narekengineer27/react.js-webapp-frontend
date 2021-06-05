import React, { Component } from "react";
import ProductSliderBlock from "../../ProductsSlider/ProductSliderBlock";
var Translate = require("react-redux-i18n").Translate;

class UserOffers extends Component {
  render = () => {
    return (
      <React.Fragment>
        {this.renderProfileFiter()}
        {this.renderProfileInner()}
      </React.Fragment>
    );
  };

  renderProfileFiter = () => (
    <div className="profile-filter">
      <div className="profile-filter-title">
        <Translate value="navigation_menu.offers" />
      </div>
    </div>
  );

  renderProfileInner = () => (
    <div className="profile-inner">
      <ProductSliderBlock
        productList={this.props.productList}
        isProductDetail={false}
        onGoToProductEdit={this.onGoToProductEdit}
      />
    </div>
  );

  onGoToProductEdit = productId => {
    const { userInfo, currentUser } = this.props;
    if (userInfo.id === currentUser.id) {
      this.props.history.push(`/product/edit/${productId}`);
    } else {
      this.props.history.push(`/product/${productId}`);
    }
  };
}

export default UserOffers;
