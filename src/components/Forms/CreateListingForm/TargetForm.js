import React from "react";
import PropTypes from "prop-types";

import InputGroupTitle from "./InputGroupTitle";
import Dropdown from "./Dropdown";
import InputLabel from "./InputLabel";
var I18n = require('react-redux-i18n').I18n;

class TargetForm extends React.Component {
  render = () => {
    const { data, onChange, geographyList, usersList } = this.props;

    return (
      <div className="container mt-4">
        <InputGroupTitle title={I18n.t("create_listing.target")} />
        <div className="row">
          {this.renderGeography(data.geography, geographyList, onChange)}
          {this.renderUsers(data.users, usersList, onChange)}
        </div>
      </div>
    );
  };

  renderGeography = (geography, geographyList, onChange) => (
    <div className="col-sm-6">
      <InputLabel label={I18n.t("create_listing.geography")} />
      <Dropdown
        itemSelected={geography}
        list={geographyList}
        onSelect={value => onChange("geography", value)}
      />
    </div>
  );

  renderUsers = (users, usersList, onChange) => (
    <div className="col-sm-6">
      <InputLabel label={I18n.t("create_listing.users")} />
      <Dropdown
        itemSelected={users}
        list={usersList}
        onSelect={value => onChange("users", value)}
      />
    </div>
  );
}

TargetForm.propTypes = {
  data: PropTypes.object.isRequired,
  geographyList: PropTypes.object,
  usersList: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default TargetForm;
