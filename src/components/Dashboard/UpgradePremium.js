import React from "react";
import { Link } from "react-router-dom";
var Translate = require("react-redux-i18n").Translate;

const UpgradePremium = props => (
  <div className="promo-line" style={props.style}>
    <div className="promo-line-inner">
      <div className="promo-line-inner-text">
        <div>
          <b className="b">
            <Translate value="profile.upgrade_premium" />
          </b>
        </div>
        <div>
          <b>
            <Translate value="profile.premium_text" />
          </b>
        </div>
      </div>
      <Link to="/payment-page" className="learn-more">
        <Translate value="profile.learn_more" />
      </Link>
    </div>
  </div>
);

export default UpgradePremium;
