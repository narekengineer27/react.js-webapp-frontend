import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Navigation from "../components/Header/Navigation";
import { SearchForm, SearchMobile, BurgerMenu } from "../components/Header";

import { logOut } from "../actions/user";
import {
  getSomeListingsByContent,
  getAllListingsByContent,
  getSomeListingsByPeople,
  getAllListingsByPeople,
  getListingsByWishList
} from "../actions/listing";
import { getUnreadMessages } from "../actions/message";
import {
  getNewNotificationList,
  sendReadNotification,
  deleteNotification
} from "../actions/notification";

const mobileBurgerClassName = "burger-menu burger-menu--open";
const defaultBurgerClassName = "burger-menu";
const mobileNavClassName = "navigation mobile-open";
const defaultNavClassName = "navigation";

class Header extends Component {
  state = {
    isMobile: false,
    isSearch: false,
    filterState: false,
    searchValue: "",
    searchResultsByContent: [],
    searchResultsByPeople: [],
    isOpenSearchResult: false,
    isSearchMobileOpen: false
  };

  componentDidMount = async () => {
    this.props.getUnreadMessages();
    if (!this.props.wishLists) await this.props.getListingsByWishList();
    if (this.props.notificationList && this.props.notificationList.length === 0)
      await this.props.getNewNotificationList("some");
  };

  render = () => {
    const burgerClassName = this.state.isMobile
      ? mobileBurgerClassName
      : defaultBurgerClassName;
    const navClassName = this.state.isMobile
      ? mobileNavClassName
      : defaultNavClassName;
    return (
      <div className="header-main">
        <div className="content-center">
          <div className="header-main-inner">
            <Link className="logo" to="/">
              <img
                width="85px"
                height="36px"
                src={require("../assets/img/PlastPlace_Logo.png")}
                alt=""
              />
            </Link>
            <div
              className="search-mobile-btn"
              onClick={this.onSearchMobileOpen}
            >
              {this.state.isSearchMobileOpen ? (
                <i className="fas fa-arrow-left fa-2x" />
              ) : (
                <i className="fas fa-search fa-2x" />
              )}
            </div>
            <SearchMobile
              onClick={this.onSearchMobileOpen}
              displayMobile={this.state.isSearchMobileOpen}
              display={this.state.isSearch}
              isOpenSearchResult={this.state.isOpenSearchResult}
              handleCloseSearchResult={() => this.handleOpenSearchResult(false)}
              onClickOpen={this.onSearchOpen}
              filterState={this.state.filterState}
              onClickOffers={this.onClickOffers}
              onClickPeople={this.onClickPeople}
              value={this.state.searchValue}
              onChange={this.onChange}
              searchResults={
                this.state.filterState
                  ? this.state.searchResultsByPeople
                  : this.state.searchResultsByContent
              }
              handleClickAllResults={this.handleClickAllResults}
              history={this.props.history}
            />
            <SearchForm
              display={this.state.isSearch}
              isOpenSearchResult={this.state.isOpenSearchResult}
              handleCloseSearchResult={() => this.handleOpenSearchResult(false)}
              onClickOpen={this.onSearchOpen}
              filterState={this.state.filterState}
              onClickOffers={this.onClickOffers}
              onClickPeople={this.onClickPeople}
              value={this.state.searchValue}
              onChange={this.onChange}
              searchResults={
                this.state.filterState
                  ? this.state.searchResultsByPeople
                  : this.state.searchResultsByContent
              }
              handleClickAllResults={this.handleClickAllResults}
              history={this.props.history}
            />
            <BurgerMenu
              toBurgerMenuClassName={burgerClassName}
              display={this.state.isMobile}
              onClickBurger={this.onMoblieOpen}
            />
            <Navigation
              toNavClassName={navClassName}
              toBurgerClassName={burgerClassName}
              display={this.state.isMobile}
              onClickBurger={this.onMoblieOpen}
              onClickLogOut={this.onClickLogOut}
              user={this.props.user}
              messages={this.props.messages}
              wishLists={this.props.listingsByWishList}
              notificationList={this.props.notificationList}
              unreadCount={this.props.unreadCount}
              onClickItem={this.handleClickItem}
            />
          </div>
        </div>
      </div>
    );
  };

  handleClickItem = async (name, id) => {
    try {
      if (name === "READ") await this.props.sendReadNotification(id);
      if (name === "DEL") await this.props.deleteNotification(id);
    } catch (err) {
      console.log(err);
    }
  };

  handleClickAllResults = async data => {
    this.setState({ isOpenSearchResult: false });
    try {
      if (this.state.filterState) await this.props.getAllListingsByPeople(data);
      else await this.props.getAllListingsByContent(data);
    } catch (err) {
      console.log(err);
    }
  };

  onChange = e => {
    this.setState({
      isSearch: false
    });
    if (e.key === "Enter") {
      this.handleClickAllResults(e.target.value);
      this.setState({ isOpenSearchResult: false });
      return;
    }
    if (this.state.filterState) {
      this.props.getSomeListingsByPeople(e.target.value).then(res => {
        this.setState({
          searchResultsByPeople: res,
          isOpenSearchResult: true
        });
      });
    } else {
      this.props.getSomeListingsByContent(e.target.value).then(res => {
        this.setState({
          searchResultsByContent: res,
          isOpenSearchResult: true
        });
      });
    }

    this.setState({
      searchValue: e.target.value
    });
  };

  handleOpenSearchResult = status => {
    this.setState({
      isOpenSearchResult: status
    });
  };

  onMoblieOpen = e => {
    this.setState({
      isMobile: !this.state.isMobile
    });
  };

  onSearchOpen = e => {
    if (this.state.searchValue !== "") return;

    this.setState({
      isSearch: !this.state.isSearch
    });
  };

  onClickOffers = e => {
    this.setState({
      filterState: false
    });
  };

  onClickPeople = e => {
    this.setState({
      filterState: true
    });
  };

  onSearchMobileOpen = e => {
    this.setState({
      isSearchMobileOpen: !this.state.isSearchMobileOpen
    });
  };

  onClickLogOut = e => {
    this.props.logOut();
  };
}

const mapStateToProps = state => ({
  user: state.user,
  listingsByContent: state.listing.currentListingsByContent,
  messages: state.message.unreadMessages,
  listingsByWishList: state.listing.currentListingsByWishList,
  notificationList: state.notification.notificationList,
  unreadCount: state.notification.unreadCount
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logOut,
      getSomeListingsByContent,
      getAllListingsByContent,
      getSomeListingsByPeople,
      getAllListingsByPeople,
      getUnreadMessages,
      getListingsByWishList,
      getNewNotificationList,
      sendReadNotification,
      deleteNotification
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
