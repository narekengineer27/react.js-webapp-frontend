import React, { Component } from "react";
var Translate = require("react-redux-i18n").Translate;

const weightUnit = ["mt", "kg", "lb"];

class ProductFilter extends Component {
  render = () => {
    return (
      <div className="product-filter">
        <div className="product-filter-inner">
          <div className="product-filter-selects">
            <div>
              <Translate value="filter.price_in" />
            </div>
            {this.renderCurrency()}
            {this.renderUnit()}
          </div>
        </div>
      </div>
    );
  };

  handleCurrencyChange = e => {
    this.props.onChange("filterCurrency", e.target.value);
  };

  handleUnitChange = e => {
    this.props.onChange("filterUnit", e.target.value);
  };

  renderCurrency = () => (
    <div className="select-field-wrap">
      <select
        name="displayed_currency"
        className="browser-default"
        onChange={this.handleCurrencyChange}
      >
        {this.props.currencies.map((item, i) => (
          <option key={i} value={item.code}>
            {item.code}
          </option>
        ))}
      </select>
    </div>
  );

  renderUnit = () => (
    <div className="select-field-wrap">
      <select
        name="displayed_unit"
        className="browser-default"
        onChange={this.handleUnitChange}
      >
        {weightUnit.map((unit, i) => {
          return (
            <option key={i} value={unit}>
              {unit === "mt" ? "t" : unit}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default ProductFilter;
