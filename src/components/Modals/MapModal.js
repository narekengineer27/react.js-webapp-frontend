import React from "react";
import PropTypes from "prop-types";
import { MDBModal, MDBModalHeader, MDBModalBody } from "mdbreact";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
var Translate = require("react-redux-i18n").Translate;

class MapModal extends React.Component {
  render() {
    const { isOpen, toggle } = this.props;
    return (
      <MDBModal
        isOpen={isOpen}
        toggle={toggle}
        contentClassName="rounded-lg"
        centered
      >
        <MDBModalHeader toggle={toggle}>
          <Translate value="common.location" />
        </MDBModalHeader>
        <MDBModalBody>{this.renderGoogleMap()}</MDBModalBody>
      </MDBModal>
    );
  }

  renderGoogleMap = () => {
    const { latitude, longitude } = this.props;
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          zoom={15}
          initialCenter={{ lat: latitude, lng: longitude }}
        >
          <Marker />
        </Map>
      </div>
    );
  };
}

MapModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API
})(MapModal);
