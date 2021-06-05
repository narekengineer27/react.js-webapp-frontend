import React from "react";
import { Link } from "react-router-dom";
import NoneWishImage from "../assets/img/svg/none-wish.svg";

const noneList = {
  orders: {
    title: "My Orders",
    text: "You haven't ordered any offers yet",
    link: "/",
    linkText: "View Offers"
  },
  wishList: {
    title: "Saved Offers",
    text: "You haven't saved any offers yet",
    link: "/",
    linkText: "View Offers"
  },
  payment: {
    title: "Payments",
    text: "You haven't saved any payment methods yet",
    link: "/payments",
    linkText: "Choose your payment method now"
  }
};

const NonePage = props => (
  <div className="wrapper-margin">
    <div className="none-notification">
      <h3 className="none-notification-title">
        {noneList[props.page].title}
      </h3>
      <div className="none-inner">
        <img src={NoneWishImage} alt="" />
        <div className="text">{noneList[props.page].text}</div>
        <div className="action-blc">
          <Link className="button button-blue" to={noneList[props.page].link}>
          {noneList[props.page].linkText}
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NonePage;
