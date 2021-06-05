import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavigationList, BurgerMenu } from ".";
var Translate = require("react-redux-i18n").Translate;

const subMenuItems = [
  {
    link: "/myaccount/",
    icon: "navigation-menu-icon fas fa-user",
    click: "my_account"
  },
  {
    link: "/wishlist",
    icon: "navigation-menu-icon fas fa-heart",
    click: "wishlist"
  },
  // {
  //   link: "#",
  //   icon: "navigation-menu-icon fas fa-th-large",
  //   click: "following_offers"
  // },
  {
    link: "/orders",
    icon: "navigation-menu-icon fas fa-table",
    click: "my_orders"
  },
  {
    link: "/payments",
    icon: "navigation-menu-icon fas fa-credit-card",
    click: "payment_methods"
  },
  {
    link: "#",
    icon: "navigation-menu-icon fas fa-sign-out-alt",
    click: "logOut"
  }
];

class Navigation extends Component {
  render = () => {
    return (
      <div className={this.props.toNavClassName}>
        <BurgerMenu
          toBurgerMenuClassName={this.props.toBurgerClassName}
          display={this.props.display}
          onClickBurger={this.props.onClickBurger}
        />
        <NavigationList
          onClickBurger={this.props.onClickBurger}
          messages={this.props.messages}
          notificationList={this.props.notificationList}
          unreadCount={this.props.unreadCount}
          onClickItem={this.props.onClickItem}
          user={this.props.user}
        />
        {this.renderNavigationMenu()}
      </div>
    );
  };

  renderNavigationMenu = () => {
    const { currentUser } = this.props.user;

    return (
      <div className="navigation-menu">
        <Link className="navigation-menu-link" to="#">
          {currentUser ? this.renderUserAvatar(currentUser) : null}
          <span className="caret">
            {currentUser ? currentUser.first_name : null}
          </span>
        </Link>
        {this.renderSubMenuDropDownList()}
      </div>
    );
  };

  renderUserAvatar = currentUser => (
    <div>
      {currentUser.avatar ? (
        <img className="colorful-placeholder" src={currentUser.avatar} alt="" />
      ) : (
        <div className="colorful-placeholder" style={{ background: "grey" }}>
          {currentUser.first_name.charAt(0).toUpperCase() +
            currentUser.last_name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );

  renderSubMenuDropDownList = () => (
    <ul className="sub-menu">
      {subMenuItems.map((item, i) => (
        <li key={`${item.name}${i}`} onClick={this.props.onClickBurger}>
          <Link
            to={`${item.link}`}
            onClick={item.click === "logOut" ? this.props.onClickLogOut : null}
          >
            <i className={item.icon}></i>
            <span>
              {item.click === "wishlist" ? (
                <span>
                  <Translate value={`navigation_dropdown.${item.click}`} />
                  {`(${this.props.wishLists.length})`}
                </span>
              ) : (
                <Translate value={`navigation_dropdown.${item.click}`} />
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Navigation;
