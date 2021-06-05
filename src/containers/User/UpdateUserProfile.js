import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ProfileBillboardBlock } from "../../components/User/UserProfile";
import { EditAccountBlock } from "../../components/User/UpdateUserProfile";
import LoadingCard from "../../components/LoadingCard";
import {
  getUserProfile,
  getBusinesstypes,
  patchUserProfile,
  upLoadAvatar
} from "../../actions/user";
var I18n = require("react-redux-i18n").I18n;

class UpdateUserProfile extends Component {
  constructor() {
    super();
    this.state = {
      userData: null,
      userInfo: null,
      location: null,
      isUpdate: true,
      loadingSave: false,
      loadingData: false
    };
  }

  initialData = {
    first_name: {
      name: "firstName",
      title: I18n.t("common.first_name"),
      value: "",
      alert: I18n.t("form_errors.firstname")
    },
    last_name: {
      name: "lastName",
      title: I18n.t("common.last_name"),
      value: "",
      alert: I18n.t("form_errors.lastname")
    },
    company: {
      name: "company",
      title: I18n.t("common.company"),
      value: "",
      alert: I18n.t("form_errors.company")
    },
    email: {
      name: "email",
      title: I18n.t("common.email"),
      value: "",
      alert: I18n.t("form_errors.email")
    },
    location: {
      name: "location",
      title: I18n.t("common.location"),
      value: "",
      alert: I18n.t("form_errors.business_address")
    },
    business_type: {
      name: "businessType",
      title: I18n.t("common.business_type"),
      value: [],
      alert: I18n.t("form_errors.business_type")
    },
    description: {
      name: "businessDescription",
      title: I18n.t("common.business_desc"),
      value: "",
      alert: I18n.t("form_errors.business_desc")
    }
  };

  componentDidMount() {
    const { currentUser } = this.props.user;
    const myId = currentUser
      ? currentUser.id
      : localStorage.getItem("plastplace_userId");
    if (!myId) this.props.history.push("/");
    else this.loadingUserProfileData(myId);
  }
  loadingUserProfileData = async id => {
    this.setState({ loadingData: true });
    try {
      const userProfileData = await this.props.getUserProfile(id);
      const businessTypes = await this.props.getBusinesstypes();
      let userBusinessType = businessTypes.map(item => {
        return {
          ...item,
          isSelected: false
        };
      });
      for (let userBusinessTypeItem of userProfileData.BusinessTypes) {
        userBusinessType = userBusinessType.map((item, index) => {
          if (userBusinessTypeItem.id === item.id) {
            return {
              ...item,
              isSelected: true
            };
          }
          return item;
        });
      }

      const inputData = { ...this.initialData };
      inputData.first_name.value = userProfileData.first_name;
      inputData.last_name.value = userProfileData.last_name;
      inputData.company.value = userProfileData.Company.name;
      inputData.email.value = userProfileData.email;
      inputData.location.value = userProfileData.Company.formatted_address;
      inputData.business_type.value = userBusinessType;
      inputData.description.value = userProfileData.businessDescription;

      const location = {
        formatted_address: userProfileData.Company.formatted_address,
        address: userProfileData.Company.address,
        city: userProfileData.Company.city,
        alpha2Code: userProfileData.Company.alpha2Code
      };

      this.setState({
        userData: inputData,
        userInfo: userProfileData,
        location: location,
        loadingData: false
      });
    } catch (err) {
      console.log(err);
      this.setState({ loadingData: false });
    }
  };
  render = () => {
    const { userData, location, userInfo, loadingSave, loadingData } = this.state;
    const { currentUser } = this.props.user;
    if (!currentUser) return null;
    return (
      <div className="wrapper-margin">
        <div className="row m-0 profile-page">
          {loadingData && <LoadingCard />}
          {userInfo && currentUser && (
            <ProfileBillboardBlock
              userInfo={userInfo}
              currentUser={currentUser}
              isUpdate={this.state.isUpdate}
              onChangeAvatar={this.handleChangAvartar}
            />
          )}
          {userData && (
            <EditAccountBlock
              userData={userData}
              location={location}
              onChange={this.handleChange}
              onClickSave={this.handleClickSave}
              onClickCancel={this.handleClickCancel}
              loadingSave={loadingSave}
            />
          )}
        </div>
      </div>
    );
  };
  handleChange = (name, value) => {
    let userData = { ...this.state.userData };
    switch (name) {
      case "firstName":
        userData.first_name.value = value;
        this.setState({ userData });
        break;
      case "lastName":
        userData.last_name.value = value;
        this.setState({ userData });
        break;
      case "company":
        userData.company.value = value;
        this.setState({ userData });
        break;
      case "location":
        userData.location.value = value.formatted_address;
        this.setState({ userData, location: value });
        break;
      case "businessTypes":
        let newValue = userData.business_type.value.map(item => {
          return {
            ...item,
            isSelected: false
          };
        });
        for (let newItem of value) {
          newValue = newValue.map((item, index) => {
            if (newItem === item.id) {
              return {
                ...item,
                isSelected: true
              };
            }
            return item;
          });
        }
        userData.business_type.value = newValue;
        this.setState({ userData });
        break;
      case "businessDescription":
        userData.description.value = value;
        this.setState({ userData });
        break;
      default:
        break;
    }
  };

  handleChangAvartar = async e => {
    const { currentUser } = this.props.user;
    let userInfo = { ...this.state.userInfo };
    let newAvatar = new FormData();

    newAvatar.append("avatar", e.target.files[0]);

    try {
      const newUserAvatar = await this.props.upLoadAvatar(
        currentUser.id,
        newAvatar
      );
      userInfo.avatar = newUserAvatar.avatar;
      this.setState({ userInfo });
    } catch (e) {
      console.log(e);
    }
  };

  handleClickCancel = e => {
    this.props.history.push(`/myaccount`);
  };

  handleClickSave = () => {
    const { userData, location } = this.state;
    let userBusinessType = [];
    userData.business_type.value.map(item => {
      if (item.isSelected) userBusinessType.push(item.id);
      return true;
    });

    if (
      !userData.first_name.value ||
      !userData.last_name.value ||
      !userData.company.value ||
      !location.address ||
      userBusinessType.length === 0
    )
      return;

    const newUserData = {
      first_name: userData.first_name.value,
      last_name: userData.last_name.value,
      company: userData.company.value,
      UserBusinessTypes: userBusinessType,
      businessDescription: userData.description.value,
      location: {
        formatted_address: userData.location.value,
        alpha2Code: this.state.location.alpha2Code,
        city: this.state.location.city,
        address: this.state.location.address
      }
    };

    this.setState({ loadingSave: true });

    this.props
      .patchUserProfile(this.state.userInfo.id, newUserData)
      .then(res => {
        this.setState({
          userInfo: res,
          loadingSave: false
        });
        this.props.history.push(`/myaccount`);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loadingSave: false });
      });
  };
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUserProfile,
      getBusinesstypes,
      patchUserProfile,
      upLoadAvatar
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserProfile);
