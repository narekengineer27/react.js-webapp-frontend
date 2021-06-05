import React from "react";
import PropTypes from "prop-types";
import DateTime from "react-datetime";

import "react-datetime/css/react-datetime.css";

import InputGroupTitle from "./InputGroupTitle";
import InputLabel from "./InputLabel";
import Dropdown from "./Dropdown";
var I18n = require('react-redux-i18n').I18n;
var Translate = require('react-redux-i18n').Translate;

class PriceForm extends React.Component {
  render = () => {
    const { data, onChange, pricingTermsList, onRef, unit } = this.props;

    return (
      <div className="container mt-4">
        <InputGroupTitle title={I18n.t("common.price")} />
        {this.renderRadioButtonGroup()}
        <div className="row">
          {this.renderInput(data, onChange, onRef, unit)}
          {this.renderDropdown(data, pricingTermsList, onChange, onRef)}
        </div>
        {data.fixedPriceChecked ? (
          <div className="row">
            {this.renderCheckBox(data.isCheckedFree, onChange)}
          </div>
        ) : null}
        {data.auctionChecked ? this.renderAuctionField() : null}
      </div>
    );
  };

  renderRadioButtonGroup = () => (
    <div className="row price-radio">
      <div className="custom-control custom-radio custom-control-inline">
        <input
          type="radio"
          className="custom-control-input"
          id="fixed-price-radio"
          name="fixedPriceRadio"
          checked={this.props.data.fixedPriceChecked}
          onChange={e => {}}
          onClick={e => {
            this.props.onChange("isCheckedFree", false);
            this.props.onChange("fixedPriceChecked", true);
            this.props.onChange("auctionChecked", false);
            this.props.onChange("auctionInterval", 0);
          }}
        />
        <label className="custom-control-label text-light" htmlFor="fixed-price-radio">
          <Translate value="auction.fixed_price" />
        </label>
      </div>
      <div className="custom-control custom-radio custom-control-inline">
        <input
          type="radio"
          className="custom-control-input"
          id="auction-radio"
          name="auctionRadio"
          checked={this.props.data.auctionChecked}
          onChange={e => {}}
          onClick={e => {
            this.props.onChange("isCheckedFree", false);
            this.props.onChange("auctionChecked", true);
            this.props.onChange("fixedPriceChecked", false);
            this.props.onChange("auctionInterval", "");
          }}
        />
        <label className="custom-control-label text-light" htmlFor="auction-radio">
          <Translate value="auction.auction" />
        </label>
      </div>
    </div>
  );

  renderAuctionField = () => (
    <div className="row">
      <div
        className="col-sm-6 col-xs-6"
        ref={this.props.onRef("auctionInterval")}
      >
        <label>
          <InputLabel label={I18n.t("auction.auction_interval")} />
        </label>
        <input
          className="form-control text-dark"
          type="number"
          value={this.props.data.auctionInterval}
          onChange={e => this.props.onChange("auctionInterval", e.target.value)}
        />
      </div>
      <div className="col-sm-6 col-xs-6">
        <label>
          <InputLabel label={I18n.t("auction.end_date")} />
        </label>
        <DateTime
          value={this.props.data.auctionDateTime}
          onChange={dt => this.props.onChange("auctionDateTime", dt)}
        />
      </div>
    </div>
  );

  renderInput = (data, onChange, onRef, unit) => (
    <div className="col-sm-6 col-xs-6" ref={onRef("pricePerUnit")}>
      <label>
        <InputLabel
          label={
            data.fixedPriceChecked ? I18n.t("create_listing.unit_price") : I18n.t("auction.init_price")
          }
        />
      </label>
      <div className="input-group">
        <input
          className="form-control text-dark create-listing-input"
          type="number"
          value={data.isCheckedFree ? "0" : data.pricePerUnit}
          onChange={e => onChange("pricePerUnit", e.target.value)}
          disabled={data.isCheckedFree}
        />
        <div className="input-group-append">
          <span className="input-group-text create-listing-input">
            {data.currency}
            {unit.value !== -1 ? `/${unit.label}` : null}
          </span>
        </div>
      </div>
    </div>
  );

  renderDropdown = (data, pricingTermsList, onChange, onRef) => (
    <div className="col-sm-6 col-xs-6" ref={onRef("pricingTerm")}>
      <InputLabel label={I18n.t("common.pricing_terms")} />
      <Dropdown
        name="pricing term"
        list={pricingTermsList}
        itemSelected={data.pricingTerm}
        onSelect={value => onChange("pricingTerm", value)}
      />
    </div>
  );

  renderCheckBox = (isCheckedFree, onChange) => (
    <div className="custom-control custom-checkbox ml-4 mt-2">
      <input
        type="checkbox"
        className="custom-control-input"
        id="checkFree"
        name="check-free"
        checked={isCheckedFree}
        onChange={e => {
          onChange("isCheckedFree", e.target.checked);
          if (e.target.checked) onChange("pricePerUnit", 0);
          else onChange("pricePerUnit", "");
        }}
      />
      <label
        className="custom-control-label text-light"
        htmlFor="checkFree"
        style={{ fontSize: "12px", paddingTop: "3px" }}
      >
        <Translate value="create_listing.free" />
      </label>
    </div>
  );
}

PriceForm.propTypes = {
  data: PropTypes.object.isRequired,
  pricingTermsList: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onRef: PropTypes.func,
  unit: PropTypes.object
};

export default PriceForm;
