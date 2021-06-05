import React, { Component } from "react";
import { Link } from "react-router-dom";
var I18n = require("react-redux-i18n").I18n;

export default class BodyBlock extends Component {
  titles = {
    name: I18n.t("wanted.material_wanted"),
    category: I18n.t("common.category"),
    condition: I18n.t("common.condition"),
    country: I18n.t("common.country"),
    notification: I18n.t("common.notification")
  };

  render() {
    return (
      <div className="wanted-blc">
        {this.renderWantedList()}
        {this.renderWantedDetail()}
      </div>
    );
  }

  renderWantedList = () => (
    <ul className="wanted-list">
      <div className="list-box">{this.renderWantedListItems()}</div>
    </ul>
  );

  renderWantedListItems = () => {
    const { selectedListId, wantedLists } = this.props;

    return (
      <div className="list-container">
        {wantedLists
          ? wantedLists.map((item, index) => {
              let itemClassName = getClassName(selectedListId, item);
              let notificationStatus =
                item.notification !== "NO"
                  ? "Notifications ON"
                  : "Notifications OFF";
              return (
                <li
                  key={index}
                  className={itemClassName}
                  onClick={e => this.props.onClickActive(item.id)}
                >
                  <div className="colorful-placeholder">
                    <span>{item.Category ? item.Category.name : null}</span>
                  </div>
                  <div className="info">
                    <h5 className="info-title">{item.name}</h5>
                    <p className="info-description">
                      <Link
                        className="matching-offers-link"
                        to="#"
                        onClick={e => this.props.onClick("MATCHES")}
                      >
                        {item.match > 0
                          ? `${item.match} matches found`
                          : "No matches found"}
                      </Link>
                    </p>
                  </div>
                  <div className="wanted-list-footer">
                    <div className="wanted-list-footer-icon" />
                    <div className="wanted-list-footer-status">
                      {notificationStatus}
                    </div>
                  </div>
                </li>
              );
            })
          : null}
      </div>
    );
  };

  renderWantedDetail = () => {
    const { data } = this.props;

    return (
      <div className="detail-info">
        <ul className="detail-info-list">
          {Object.keys(data).map((item, index) => {
            let value = getItemValues(item, data[item]);
            return (
              <li key={index} className="detail-info-item">
                <div className="detail-info-title">{this.titles[item]}</div>
                <div className="detail-info-value">{value}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
}

const getClassName = (selectedListId, wantedList) => {
  if (wantedList.id === selectedListId) {
    if (wantedList.notification !== "NO")
      return "wanted-list-item item-complete active";
    return "wanted-list-item item-error active";
  }
  if (wantedList.notification !== "NO") return "wanted-list-item item-complete";
  return "wanted-list-item item-error";
};

const getItemValues = (key, item) => {
  if (item) {
    if (key === "name") return item;
    else if (key === "category" || key === "condition") return item.label;
    else if (key === "notification") {
      return item !== "NO" ? "ON" : "OFF";
    }
    let countries = item.filter(itm => itm.isSelected === true);

    if (countries.length === 1) return countries[0].label;
    else if (countries.length > 0)
      return `${countries[0].label}${" + "}${countries.length - 1}`;
    return "All";
  }
  return null;
};
