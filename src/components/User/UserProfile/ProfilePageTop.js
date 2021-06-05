import React, { Component } from "react";

import ProfileBillboardBlock from "./ProfileBillboardBlock";
import ProfileLocationBlock from "./ProfileLocationBlock";

class ProfilePageTop extends Component {
  render = () => {
    return (
      <div className="row m-0 profile-page-top">
        <ProfileBillboardBlock
          userInfo={this.props.userInfo}
          currentUser={this.props.currentUser}
          onChangeAvatar={this.props.onChangeAvatar}
          onClickFollow={this.props.onClickFollow}
        />
        <ProfileLocationBlock
          userInfo={this.props.userInfo}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  };
}

export default ProfilePageTop;
