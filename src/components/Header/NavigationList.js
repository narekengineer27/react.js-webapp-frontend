import React, { Component } from "react";
import { Link } from "react-router-dom";

import Notification from "./Notification";
var Translate = require("react-redux-i18n").Translate;

const navListItems = [
  {
    class: "",
    name: "sell",
    link: "/product/create",
    image: require("../../assets/img/svg/barter.svg"),
    addItem: false
  },
  {
    class: "",
    name: "wanted",
    link: "/wanted",
    image: require("../../assets/img/svg/add-to-cart.svg"),
    addItem: false
  },
  {
    class: "notifications-main-list",
    name: "notification",
    link: "#",
    image: require("../../assets/img/svg/notification-bell.svg"),
    addItem: true
  },
  {
    class: "",
    name: "messages",
    link: "/messages",
    image: require("../../assets/img/svg/messages.svg"),
    addItem: false
  }
];

class NavigationList extends Component {
  render = () => {
    return (
      <ul className="navigation-list">
        {navListItems.map((unit, index) => this.renderNavListItem(unit, index, this.props.user))}
      </ul>
    );
  };

  renderNavListItem = (item, index, user) => (
    <li className={item.class} key={`${index}${item.name}`}>
      <Link to={item.link} onClick={this.props.onClickBurger}>
        <i className="sell-icon">{this.renderCount(item)}</i>
        <span>
          <Translate value={`navigation_menu.${item.name}`} />
        </span>
      </Link>
      {user.currentPage === item.link && <div className="nav-active">•</div>}
      {item.addItem && user.currentPage === "/notifications" && <div className="nav-active">•</div>}
      {item.addItem ? this.renderNotificationDropdownList() : null}
    </li>
  );

  renderNotificationDropdownList = () => (
    <Notification
      notificationList={this.props.notificationList}
      onClickItem={this.props.onClickItem}
      onClickBurger={this.props.onClickBurger}
    />
  );

  renderCount = item => {
    if (
      window.location.pathname !== "/messages" &&
      item.name === "messages" &&
      this.props.messages.length > 0
    )
      return <div className="messages-count">{this.props.messages.length}</div>;

    if (item.name === "notification" && this.props.unreadCount > 0)
      return <div className="messages-count">{this.props.unreadCount}</div>;

    return null;
  };
}

export default NavigationList;
