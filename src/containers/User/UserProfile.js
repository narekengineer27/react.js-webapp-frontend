import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  ProfilePageTop,
  UserReview,
  UserOffers
} from "../../components/User/UserProfile";

import {
  getUserProfile,
  upLoadAvatar,
  getCurrentUserSession,
  changeFollowStatus,
  getFollowings
} from "../../actions/user";
import { getAllListingsByUserId } from "../../actions/listing";
import LoadingCard from "../../components/LoadingCard";
import FollowModal from "../../components/Modals/FollowModal";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      userData: null,
      isUpdate: false,
      profileProductList: [],
      loadingData: false,
      isFollowModalOpen: false
    };
  }

  componentDidMount() {
    this.loadingUserData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id)
      this.loadingUserData(this.props);
  }

  loadingUserData = async props => {
    const { currentUser } = props.user;
    this.setState({ loadingData: true });
    const myId = currentUser
      ? currentUser.id
      : localStorage.getItem("plastplace_userId");
    const userId = props.match.params.id || myId;
    try {
      const user = await props.getUserProfile(userId);
      const productList = await props.getAllListingsByUserId(userId);

      this.setState({
        userData: user,
        profileProductList: productList,
        loadingData: false
      });
    } catch (err) {
      console.log(err);
      this.setState({ loadingData: false });
    }
  };

  render = () => {
    const { userData, profileProductList, loadingData } = this.state;
    const { currentUser } = this.props.user;

    return (
      <div className="wrapper-margin">
        <div className="profile-page">
          {loadingData && <LoadingCard />}
          {userData && currentUser && (
            <ProfilePageTop
              userInfo={userData}
              currentUser={currentUser}
              isUpdate={this.state.isUpdate}
              onChangeAvatar={this.handleChangAvartar}
              onClickFollow={this.toggleModal}
            />
          )}
          <UserReview />
          <UserOffers
            userInfo={userData}
            productList={profileProductList}
            history={this.props.history}
            currentUser={currentUser}
          />
          <FollowModal
            isOpen={this.state.isFollowModalOpen}
            toggle={this.toggleModal}
            sellerData={this.state.userData}
          />
        </div>
      </div>
    );
  };

  toggleModal = async () => {
    if (!this.state.isFollowModalOpen)
      await this.props.changeFollowStatus(this.state.userData.id).then(res => {
        let userData = { ...this.state.userData };
        userData.follow = res.follow;
        this.props.getFollowings(this.props.user.currentUser.id, "all")
        this.setState({ userData });
      });

    this.setState({ isFollowModalOpen: !this.state.isFollowModalOpen });
  };

  handleChangAvartar = async e => {
    const { currentUser } = this.props.user;
    let userData = { ...this.state.userData };
    let newAvatar = new FormData();

    newAvatar.append("avatar", e.target.files[0]);

    try {
      const newUserAvatar = await this.props.upLoadAvatar(
        currentUser.id,
        newAvatar
      );
      userData.avatar = newUserAvatar.avatar;
      this.setState({ userData });
    } catch (e) {
      console.log(e);
    }
  };
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUserProfile,
      upLoadAvatar,
      getAllListingsByUserId,
      getCurrentUserSession,
      changeFollowStatus,
      getFollowings
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
