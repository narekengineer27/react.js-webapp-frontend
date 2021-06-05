import React, { Component } from "react";
import MapModal from "../../Modals/MapModal";
import Geocode from "react-geocode";
import mapImage from "../../../assets/img/google_map_sample.jpg";
var Translate = require("react-redux-i18n").Translate;

class ProfileLocationBlock extends Component {
  constructor() {
    super();
    this.state = {
      isMapModalOpen: false,
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
    const { userInfo } = this.props;
    if (!userInfo) return;
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API);
    Geocode.setLanguage("en");
    Geocode.fromAddress(userInfo.Company.formatted_address)
      .then(res => {
        const { lat, lng } = res.results[0].geometry.location;
        this.setState({
          latitude: lat,
          longitude: lng
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render = () => {
    const { isMapModalOpen, latitude, longitude } = this.state;
    return (
      <div className="col-sm-12 col-md-8 mb-3 profile-location-block">
        <div className="profile-location-image" onClick={this.toggleModal}>
          <img className="google-map-image" src={mapImage} alt="" />
        </div>
        <div className="profile-info">
          {this.renderLocationInner()}
          {this.renderDescription()}
        </div>
        <MapModal
          isOpen={isMapModalOpen}
          toggle={this.toggleModal}
          latitude={latitude}
          longitude={longitude}
        />
      </div>
    );
  };

  renderLocationInner = () => {
    const { userInfo } = this.props;
    let userBusinessTypes = [];
    userInfo.BusinessTypes.map(item => {
      userBusinessTypes.push(item.name);
      return userBusinessTypes;
    });
    return (
      <div className="change-location">
        <div className="location-inner">
          <div className="profile-title">
            <Translate value="common.location" />
          </div>
          <div className="profile-location-header">
            <span className="address-text">
              {userInfo.Company.formatted_address}
            </span>
          </div>
        </div>
        <div className="business-type">
          <div className="profile-title">
            <Translate value="common.business_type" />
          </div>
          <p>{userBusinessTypes.join(", ")}</p>
        </div>
      </div>
    );
  };

  renderDescription = () => (
    <div className="description">
      <div className="profile-title">
        <Translate value="common.business_desc" />
      </div>
      <p>{this.props.userInfo.businessDescription}</p>
    </div>
  );

  toggleModal = () => {
    this.setState({
      isMapModalOpen: !this.state.isMapModalOpen
    });
  };
}

export default ProfileLocationBlock;
