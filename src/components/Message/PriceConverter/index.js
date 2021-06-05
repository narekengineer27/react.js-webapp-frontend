import React, { Component } from "react";
import Dropdown from "./Dropdown";
var Translate = require('react-redux-i18n').Translate;

class PriceConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: props.price,
      quantity: props.quantity,
      currencySelected: props.currency,
      unitSelected: props.unit,
      totalPrice: props.price * props.quantity,
      unitList: this.getListFromUnits(props.units)
    };
  }

  getListFromUnits = units => {
    const list = [];
    for (let i = 0; i < Object.keys(units).length; i++) {
      list.push({
        id: i + 1,
        code: Object.keys(units)[i],
        rate: units[Object.keys(units)[i]]
      });
    }
    return list;
  };

  handleQuantityChange = e => {
    this.setState({
      quantity: e.target.value,
      totalPrice: this.state.price * e.target.value
    });
  };

  renderQuantity = () => (
    <div className="form-item">
      <div className="label"><Translate value="common.quantity" /></div>
      <input
        className="form-control"
        type="number"
        value={this.state.quantity}
        onChange={this.handleQuantityChange}
      />
    </div>
  );

  handleUnitChange = i => {
    const { units } = this.props;
    const { unitList, price, totalPrice, unitSelected } = this.state;

    this.setState({
      unitSelected: unitList[i].code,
      price: (price / units[unitList[i].code]) * units[unitSelected],
      totalPrice: (totalPrice / units[unitList[i].code]) * units[unitSelected]
    });
  };

  renderUnits = () => {
    const { unitList, unitSelected } = this.state;
    const selected = unitList.filter(item => item.code === unitSelected);

    return (
      <div className="form-item">
        <div className="label"><Translate value="common.unit" /></div>
        <Dropdown
          list={unitList}
          itemSelected={selected[0]}
          onSelect={this.handleUnitChange}
        />
      </div>
    );
  };

  renderPrice = () => {
    return (
      <div className="form-item">
        <div className="label"><Translate value="common.price" /></div>
        <input
          className="form-control"
          type="number"
          value={this.state.price.toFixed(2)}
          disabled
        />
      </div>
    );
  };

  handleCurrencyChange = i => {
    const { currencies, exchangeRates } = this.props;
    const { price, totalPrice, currencySelected } = this.state;
    // Note: the EUR rate is not defiend in exchangeRate from api
    exchangeRates["EUR"] = 0.9
    
    this.setState({
      currencySelected: currencies[i].code,
      price:
        (price * exchangeRates[currencies[i].code]) /
        exchangeRates[currencySelected],
      totalPrice:
        (totalPrice * exchangeRates[currencies[i].code]) /
        exchangeRates[currencySelected]
    });
  };

  renderCurrencies = () => {
    const { currencies } = this.props;
    const selected = currencies.filter(
      item => item.code === this.state.currencySelected
    );
    return (
      <div className="form-item">
        <div className="label"><Translate value="common.currency" /></div>
        <Dropdown
          list={currencies}
          itemSelected={selected[0]}
          onSelect={this.handleCurrencyChange}
        />
      </div>
    );
  };

  renderTotalPrice = () => {
    const selected = this.props.currencies.filter(
      item => item.code === this.state.currencySelected
    );
    return (
      <div className="total-price-container">
        <div className="total-price">
          <span><Translate value="message.total_price" /></span>
          <span>
            <span ref={symbolRef => {
              if (symbolRef)
                symbolRef.innerHTML = selected[0].symbol
            }} /> {this.state.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="price-converter-container">
        <div className="price-converter-inner">
          <div className="price-converter-header"><Translate value="message.price_converter" /></div>
          <div className="price-converter-content">
            <p className="description">
              <Translate value="message.converter_intro" />
            </p>
            <div className="form-row">
              {this.renderQuantity()}
              {this.renderUnits()}
            </div>
            <div className="form-row">
              {this.renderPrice()}
              {this.renderCurrencies()}
            </div>
            {this.renderTotalPrice()}
          </div>
        </div>
      </div>
    );
  }
}

export default PriceConverter;
