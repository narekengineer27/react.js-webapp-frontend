import React from "react";
import PropTypes from "prop-types";

import InputGroupTitle from "./InputGroupTitle";
import InputLabel from "./InputLabel";
import Dropdown from "./Dropdown";
import { Input } from "../../UIComponents";
var I18n = require('react-redux-i18n').I18n;

class AvailabilityForm extends React.Component {
  render = () => {
    const {
      data,
      onChange,
      unitList,
      supplyList,
      onRef
    } = this.props;

    return (
      <div className="container mt-4" ref={onRef("quantity")}>
        <InputGroupTitle title={I18n.t("create_listing.availabilty")} />
        <div className="row">
          {this.renderQuantityInput(data.quantity, onChange)}
          {this.renderDropdown(
            I18n.t("common.unit"),
            "unit",
            data.unit,
            unitList,
            onChange,
            onRef
          )}
          {this.renderDropdown(
            I18n.t("common.supply"),
            "supply",
            data.supply,
            supplyList,
            onChange,
            onRef
          )}
        </div>
      </div>
    );
  };

  renderQuantityInput = (quantity, onChange) => (
    <div className="col-md-6">
      <Input
        type="number"
        label={I18n.t("common.quantity")}
        value={quantity}
        onChange={e => onChange("quantity", e.target.value)}
      />
    </div>
  );

  renderDropdown = (
    title,
    name,
    itemSelected,
    list,
    onChange,
    onRef
  ) => (
    <div className="col-md-3 col-sm-6 col-xs-6" ref={onRef(name)}>
      <InputLabel label={title} />
      <Dropdown
        name={name}
        itemSelected={itemSelected}
        list={list}
        onSelect={value => onChange(name, value)}
      />
    </div>
  );
}

AvailabilityForm.propTypes = {
  data: PropTypes.object.isRequired,
  unitList: PropTypes.object,
  supplyList: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onRef: PropTypes.func
};

export default AvailabilityForm;
