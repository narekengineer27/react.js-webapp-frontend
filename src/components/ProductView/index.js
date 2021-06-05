import React from "react";

import ProductViewHeader from "./ProductViewHeader";
import ProductViewInfo from "./ProductViewInfo";
import UpgradPremium from "../Dashboard/UpgradePremium";

const ProductView = props => {
  return (
    <div className="product-view-inner">
      <ProductViewHeader
        history={props.history}
        productDetail={props.productDetail}
        onClick={props.onClick}
        wishCheck={props.wishCheck}
        onClickChat={props.onClickChat}
        userId={props.userId}
      />
      <ProductViewInfo
        productDetail={props.productDetail}
        sellerData={props.sellerData}
        onlineStatus={props.onlineStatus}
        onClickFollow={props.onClickFollow}
        userId={props.userId}
        auctionData={props.auctionData}
        getCurrentListing={props.getCurrentListing}
        biddersOnlineStatus={props.biddersOnlineStatus}
        isAdmin={props.isAdmin}
      />
      <UpgradPremium style={{display: 'none'}} />
    </div>
  );
};

export default ProductView;
