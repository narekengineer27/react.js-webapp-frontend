import React from "react";
import PropTypes from "prop-types";

import Dropdown from "./Dropdown";
import InputGroupTitle from "./InputGroupTitle";
import InputLabel from "./InputLabel";
import { Input } from "../../UIComponents";
var I18n = require('react-redux-i18n').I18n;

class LocationForm extends React.Component {
  render = () => {
    const { data, onChange, countryList } = this.props;

    return (
      <div className="container mt-4">
        <InputGroupTitle title={I18n.t("common.location")} />
        <div className="row">
          {this.renderAddress(data.address, onChange)}
          {this.renderCity(data.city, onChange)}
        </div>
        <div className="row">
          {this.renderCountry(data.country, countryList, onChange)}
          {this.renderZipcode(data.zipcode, onChange)}
        </div>
      </div>
    );
  };

  renderAddress = (address, onChange) => (
    <div className="col-sm-6">
      <Input
        label={I18n.t("create_listing.street_address")}
        value={address}
        onChange={e => onChange("address", e.target.value)}
      />
    </div>
  );

  renderCity = (city, onChange) => (
    <div className="col-sm-6">
      <Input
        label={I18n.t("create_listing.city")}
        value={city}
        onChange={e => onChange("city", e.target.value)}
      />
    </div>
  );

  renderCountry = (country, countryList, onChange) => (
    <div className="col-sm-6">
      <InputLabel label={I18n.t("create_listing.country")} />
      <Dropdown
        itemSelected={country}
        list={countryList}
        onSelect={value => {
          onChange("country", value);
        }}
      />
    </div>
  );

  renderZipcode = (zipcode, onChange) => (
    <div className="col-sm-6">
      <Input
        type="number"
        label={I18n.t("create_listing.zip_code")}
        value={zipcode}
        className="zip-code"
        onChange={e => onChange("zipcode", e.target.value)}
      />
    </div>
  );
}

LocationForm.propTypes = {
  data: PropTypes.object.isRequired,
  countryList: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default LocationForm;
