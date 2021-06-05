import React from "react";
import { GoogleApiWrapper } from "google-maps-react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.placeDetail = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    const { google } = this.props
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    const location = {
      formatted_address: place.address_components ? place.formatted_address : place.name,
      alpha2Code: this.getCountry(place.address_components),
      city: this.getCity(place.address_components),
      address: this.getAddress(place.address_components)
    };
    this.props.onChange("location", location);
  }

  getAddress = addcomp => {
    if (!addcomp) return "";
    for (let i = 0; i < addcomp.length; i++) {
      if (addcomp[i].types[0] === "street_number") {
        var num = addcomp[i].short_name;
      }
    }
    for (let j = 0; j < addcomp.length; j++) {
      if (addcomp[j].types[0] === "route") {
        var street = addcomp[j].short_name;
      }
    }
    if (!num && !street) return "";
    else if (!num) return street;
    else if (!street) return num;
    return num + " " + street;
  };

  getCountry = addcomp => {
    if (!addcomp) return "";
    for (var i = 0; i < addcomp.length; i++) {
      if (addcomp[i].types[0] === "country") {
        return addcomp[i].short_name;
      }
      if (addcomp[i].types.length === 2) {
        if (addcomp[i].types[0] === "political") {
          return addcomp[i].short_name;
        }
      }
    }
    return false;
  };

  getCity = addcomp => {
    if (!addcomp) return "";
    if (typeof addcomp === "object" && addcomp instanceof Array) {
      let order = ["locality"];
      for (let i = 0; i < addcomp.length; i++) {
        let obj = addcomp[i];
        let types = obj.types;
        if (intersect(order, types).size > 0) return obj.long_name;
      }
    }
    return false;
  };

  render() {
    return (
      <input
        className={this.props.className}
        ref={this.autocompleteInput}
        id="autocomplete"
        type="text"
        placeholder={this.props.placeHolder}
        defaultValue={this.props.value}
      />
    );
  }
}

const intersect = function(a, b) {
  return new Set(a.filter(v => ~b.indexOf(v)));
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API
})(SearchBar);
