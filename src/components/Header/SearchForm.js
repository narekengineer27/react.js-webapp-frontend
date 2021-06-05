import React, { Component } from "react";
import { Link } from "react-router-dom";
var I18n = require("react-redux-i18n").I18n;
var Translate = require("react-redux-i18n").Translate;

class SearchForm extends Component {
  render = () => {
    const searchClassName = this.props.mobile
      ? "mobile-search-form"
      : "main-search-form";

    return (
      <div className={searchClassName}>
        <div
          className="input-switch-container"
          onClick={this.props.onClickOpen}
        >
          {this.renderSearchOffer()}
          {this.props.filterState
            ? this.renderSearchResultPeople()
            : this.renderSearchResultContent()}
          {this.renderSwitchPosition()}
        </div>
      </div>
    );
  };

  renderSearchOffer = () => {
    const placeHolder = this.props.filterState
      ? I18n.t("navigation_menu.search_users")
      : I18n.t("navigation_menu.search_offers");
    const icon = this.props.filterState ? "people-icon" : "offers-icon";

    return (
      <label className="select-offer">
        <div className={icon}></div>
        <input
          className="main-input"
          name="name"
          placeholder={placeHolder}
          autoComplete="off"
          onKeyUp={this.props.onChange}
        />
      </label>
    );
  };

  renderSearchResultContent = () => {
    const results = this.props.searchResults ? this.props.searchResults : [];
    const generalStyle = {
      display: this.props.isOpenSearchResult ? "block" : "none",
      width: this.props.mobile ? "100%" : "calc(100% + 100px)"
    };

    return this.props.value !== "" ? (
      <div className="dummy-div" style={generalStyle}>
        {results.map((result, index) => (
          <div
            className="dummy-item"
            key={index}
            onClick={this.handleClickSearchResult(result.id)}
          >
            <img className="dummy-image" src={result.image} alt="" />
            <div className="dummy-description">
              <span className="dummy-title">{result.title}</span>
              <span className="dummy-location">{result.formatted_address}</span>
            </div>
          </div>
        ))}
        <div className="dummy-footer" style={{ display: "none" }}>
          <Link
            to="#"
            onClick={() => this.props.handleClickAllResults(this.props.value)}
          >
            {I18n.t("navigation_menu.search_result")}
          </Link>
        </div>
      </div>
    ) : null;
  };

  renderSearchResultPeople = () => {
    const results = this.props.searchResults ? this.props.searchResults : [];
    const generalStyle = {
      display: this.props.isOpenSearchResult ? "block" : "none",
      width: this.props.mobile ? "100%" : "calc(100% + 100px)"
    };

    return this.props.value !== "" ? (
      <div className="dummy-div" style={generalStyle}>
        {results.map((result, index) => (
          <div
            className="dummy-item"
            key={index}
            onClick={this.handleClickSearchResult(result.id)}
          >
            {result.avatar ? (
              <img className="dummy-image" src={result.avatar} alt="" />
            ) : (
              <div className="dummy-avatar" style={{ background: "grey" }}>
                {result.first_name.charAt(0).toUpperCase() +
                  result.last_name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="dummy-description">
              <span className="dummy-title">
                {result.first_name}&nbsp;{result.last_name}
              </span>
              <span className="dummy-location">
                {result.Company.formatted_address}
              </span>
            </div>
          </div>
        ))}
        <div className="dummy-footer" style={{ display: "none" }}>
          <Link
            to="#"
            onClick={() => this.props.handleClickAllResults(this.props.value)}
          >
            All Results
          </Link>
        </div>
      </div>
    ) : null;
  };

  handleClickSearchResult = id => e => {
    this.props.handleCloseSearchResult();
    this.props.filterState
      ? this.props.history.push(`/profile/${id}`)
      : this.props.history.push(`/product/${id}`);
  };

  renderSwitchPosition = () => {
    const style = this.props.display
      ? { display: "block" }
      : { display: "none" };

    return (
      <div className="switch-position" style={style}>
        <h6 className="switch-position-title">
          <Translate value="navigation_menu.search_in" />
        </h6>
        {this.renderSwitchPositionSelect()}
      </div>
    );
  };

  renderSwitchPositionSelect = () => (
    <ul className="switch-position-select">
      <li onClick={this.props.onClickOffers}>
        <img
          width="14"
          height="17"
          src={require("../../assets/img/svg/grid.svg")}
          alt=""
        />
        <Translate value="navigation_menu.offers" />
      </li>
      <li onClick={this.props.onClickPeople}>
        <img
          width="15"
          height="15"
          src={require("../../assets/img/svg/user.svg")}
          alt=""
        />
        <Translate value="navigation_menu.people" />
      </li>
    </ul>
  );
}

export default SearchForm;
