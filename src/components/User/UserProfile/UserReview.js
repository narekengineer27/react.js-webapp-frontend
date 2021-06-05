import React, { Component } from "react";
import { Link } from "react-router-dom";
var Translate = require("react-redux-i18n").Translate;

class UserReview extends Component {
  render = () => {
    return (
      <div className="row review">
        {this.renderFollowBlock()}
        {this.renderComenent()}
      </div>
    );
  };

  renderFollowBlock = () => (
    <div className="col-sm-12 col-md-4 follow-blcs">
      <div className="tab js-tabCustom">
        <div className="tab-header">
          <div className="tab-header-item active">
            <Link to="ifollow" className="tab-header-item_link">
              <Translate value="profile.i_follow" />
            </Link>
            <div className="tab-header-item_total">
              <Link to="/profile/followings">
                <Translate value="common.total" />: 0
              </Link>
            </div>
          </div>
          <div className="tab-header-item">
            <Link to="myfollowers" className="tab-header-item_link">
              <Translate value="profile.my_followers" />
            </Link>
            <div className="tab-header-item_total">
              <Link to="/profile/followers">
                <Translate value="common.total" />: 0
              </Link>
            </div>
          </div>
        </div>

        <div className="tab-body">
          <div id="ifollow" className="tab-body-item active">
            <ul className="tab-user-list"></ul>
            <div className="without-content">
              <p>
                <Translate value="profile.no_follower" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  renderComenent = () => (
    <div className="col-sm-12 col-md-8 comment">
      <div className="product_review_block">
        <div className="product_review_block_header">
          <strong>
            <Translate value="common.comments" />
          </strong>
          (0)
        </div>
        <div className="product_review_block_body my-comment"></div>
        <div className="without-content">
          <p>
            <Translate value="profile.no_comment" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserReview;
