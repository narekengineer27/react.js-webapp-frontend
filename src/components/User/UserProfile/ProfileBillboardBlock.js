import React, { Component } from "react";
import { Link } from "react-router-dom";
var Translate = require("react-redux-i18n").Translate;

class ProfileBillboardBlock extends Component {
  render = () => {
    const { userInfo, currentUser } = this.props;
    const currentUserId = currentUser ? this.props.currentUser.id : null;

    return (
      <div className="col-sm-12 col-md-4 mb-3 profile-billboard-block">
        {userInfo && currentUser ? (
          <div className="profile-avatar">
            {this.renderProfileAvatarImage(userInfo, currentUser)}
            {this.renderProfileInfoText(userInfo, currentUser)}
          </div>
        ) : null}
        {currentUserId === userInfo.id ? (
          <div className="profile-buttons">{this.renderProfileButtons()}</div>
        ) : null}
      </div>
    );
  };

  renderProfileAvatarImage = (userInfo, currentUser) => {
    const currentUserId = currentUser ? this.props.currentUser.id : null;

    return (
      <div className="profile-avatar-image">
        {userInfo.avatar ? (
          <React.Fragment>
            <img
              className="colorful-placeholder profile"
              src={userInfo.avatar}
              alt=""
            />
            {currentUserId === userInfo.id
              ? this.renderUploadProfileImage()
              : null}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              className="colorful-placeholder profile"
              style={{ background: "grey" }}
            >
              {userInfo.first_name.charAt(0).toUpperCase() +
                userInfo.last_name.charAt(0).toUpperCase()}
            </div>
            {currentUserId === userInfo.id
              ? this.renderUploadProfileImage()
              : null}
          </React.Fragment>
        )}
      </div>
    );
  };

  renderUploadProfileImage = () => (
    <form className="upload-profile-image">
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef => (this.inputElement = inputRef)}
        onChange={this.props.onChangeAvatar}
      />
      <button
        type="button"
        className="upload-profile-image-btn"
        onClick={this.handleClick}
      >
        <Translate value="profile.add_photo" />
      </button>
    </form>
  );

  renderProfileInfoText = (userInfo, currentUser) => {
    const currentUserId = currentUser ? this.props.currentUser.id : null;

    return (
      <div className="profile-info-text">
        <div className="fullname">
          {userInfo.first_name}&nbsp;{userInfo.last_name}
        </div>
        <div className="seller-verified-status"></div>
        <div className="company-name">{userInfo.Company.name}</div>
        <div className="country-name">
          {userInfo.Company.Country ? userInfo.Company.Country.name : ""}
        </div>
        {currentUserId !== userInfo.id ? (
          <div className="row m-0 profile-info-text-action">
            <Link
              className="button button-primary follow"
              onClick={this.props.onClickFollow}
              to="#"
            >
              {userInfo && !userInfo.follow ? (
                <Translate value="common.follow" />
              ) : (
                <Translate value="common.unfollow" />
              )}
            </Link>
            <div className="custom-dropdown"></div>
          </div>
        ) : null}
      </div>
    );
  };

  renderProfileButtons = () => {
    return this.props.isUpdate ? (
      <Link className="button button-grey" to="#">
        <Translate value="profile.delete_account" />
      </Link>
    ) : (
      <Link className="button button-primary" to={`/profile/edit`}>
        <Translate value="profile.edit_account" />
      </Link>
    );
  };

  handleClick = e => {
    this.inputElement.click();
  };
}

export default ProfileBillboardBlock;
