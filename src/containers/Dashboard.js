import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CardsShow, UpgradePremium, Filters } from "../components/Dashboard";
import {
  getListings,
  getListingProperties,
  getExchangeRates,
  getCurrencies
} from "../actions/listing";
import { getFollowings, setCurrentPage } from "../actions/user";
import LoadingCard from "../components/LoadingCard";

var Translate = require("react-redux-i18n").Translate;

class Dashboard extends Component {
  state = {
    filters: {
      country: [],
      category: [],
      condition: [],
      following: []
    },
    filterApplied: {
      country: false,
      category: false,
      condition: false,
      following: false
    },
    filterCurrency: null,
    filterUnit: null,
    loadingData: false,
    isNoListings: false
  };

  componentDidMount = async () => {
    const params = new URLSearchParams(this.props.location.search);
    const { listing, setCurrentPage } = this.props;
    this.setState({ loadingData: true });
    setCurrentPage("/");
    try {
      if (listing.currencies.length === 0) await this.props.getCurrencies();
      if (!params.get("filtering")) {
        await this.props.getListings();
      } else {
        if (listing.listings.length === 0)
          this.setState({ isNoListings: true });
        else this.setState({ isNoListings: false });
      }
      if (!listing.exchangeRates) await this.props.getExchangeRates();
      if (!listing.listingProperties.countries)
        await this.props.getListingProperties();
      if (!this.props.user.followings)
        await this.props.getFollowings(this.props.user.currentUser.id, "all");

      this.setState({ loadingData: false });
    } catch (err) {
      this.setState({ loadingData: false });
      console.log(err);
    }
  };

  handleSelect = name => (item, checked) => {
    let list = this.state.filters[name];
    if (checked) {
      list.push(item);
    } else {
      list = this.state.filters[name].filter((itm, index) => item !== itm);
    }
    this.setState({
      filters: { ...this.state.filters, [name]: list }
    });
  };

  handleReset = name => {
    this.setState(
      {
        filters: { ...this.state.filters, [name]: [] }
      },
      () => {
        let filters = {};

        Object.keys(this.state.filterApplied)
          .filter((key, index) => this.state.filterApplied[key])
          .forEach((key, index) => (filters[key] = this.state.filters[key]));

        this.props.getListings(filters);
      }
    );
  };

  handleResetAll = () => {
    this.setState(
      {
        filters: {
          country: [],
          category: [],
          condition: [],
          following: []
        }
      },
      () => {
        this.props.getListings({});
      }
    );
  };

  handleApply = name => {
    this.setState(
      {
        filterApplied: { ...this.state.filterApplied, [name]: true }
      },
      () => {
        let filters = {};

        Object.keys(this.state.filterApplied)
          .filter((key, index) => this.state.filterApplied[key])
          .forEach((key, index) => (filters[key] = this.state.filters[key]));

        if (filters.following) {
          filters.users = filters.following;
          delete filters.following;
        }
        this.props.getListings(filters);
      }
    );
  };

  handleChangeProductFilter = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  render = () => {
    const {
      filters,
      filterCurrency,
      filterUnit,
      loadingData,
      isNoListings
    } = this.state;
    const { listing, history, user } = this.props;
    const filterData = {
      countries: listing.listingProperties.countries,
      categories: listing.listingProperties.categories,
      conditions: listing.listingProperties.conditions,
      followings:
        user.followings && user.followings.total > 0 ? user.followings : null
    };
    const mainStyle = isNoListings ? { display: "none" } : { display: "block" };

    return (
      <React.Fragment>
        {isNoListings ? this.renderNoListings() : null}
        <div style={mainStyle}>
          <Filters
            filterStatus={filters}
            filterMenus={filterData}
            onSelect={this.handleSelect}
            onReset={this.handleReset}
            onApply={this.handleApply}
            onResetAll={this.handleResetAll}
            currencies={listing.currencies}
            onChange={this.handleChangeProductFilter}
          />
          <div className="container">
            <div className="m-2">
              <div className="product-filter-content">
                <Translate value="filter.header_content" />
              </div>
              <div className="product-filter-text" style={{ display: "none" }}>
                <Translate value="filter.header_text" />
              </div>
              <UpgradePremium style={{ display: "none" }} />
            </div>
            {loadingData && <LoadingCard />}
            {!loadingData && (
              <CardsShow
                data={listing.listings}
                filterCurrency={filterCurrency}
                filterUnit={filterUnit}
                history={history}
                exchangeRates={listing.exchangeRates}
                currencies={listing.currencies}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  };
  renderNoListings = () => (
    <div className="wrapper-margin">
      <div className="container px-2  mb-3">
        <div className="wishlist-notification">
          <span>No offers found</span>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

// import action here and send to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getListings,
      getListingProperties,
      getExchangeRates,
      getCurrencies,
      getFollowings,
      setCurrentPage
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
