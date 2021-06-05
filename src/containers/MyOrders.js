import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoadingCard from "../components/LoadingCard";
import { CardsShow } from "../components/Dashboard";
import NonePage from "../components/NonePage";

import { getOrderedListings } from "../actions/listing";

class MyOrders extends Component {
  constructor() {
    super();
    this.state = {
      loadingData: false,
      listingData: null
    };
  }

  componentDidMount = async () => {
    this.setState({ loadingData: true });

    await this.props.getOrderedListings().then(res => {
      this.setState({ listingData: res, loadingData: false });
    });

  };

  render = () => {
    const { loadingData, listingData } = this.state;
    const counts = listingData && listingData.length;
    if (!listingData && !loadingData) return null;

    return counts > 0 ? (
      <div className="wrapper-margin">
        {loadingData && <LoadingCard />}
        {!loadingData && (
          <React.Fragment>
            {this.renderNotification(counts)}
            {this.renderWishList(listingData)}
          </React.Fragment>
        )}
      </div>
    ) : (
      <NonePage page="orders" />
    );
  };

  renderNotification = counts => (
    <div className="container px-2  mb-3">
      <div className="wishlist-notification">
        <span>
          You have saved <span className="checklis_count">{counts}</span>
          <span id="items_to_view">offers</span> to view
        </span>
      </div>
    </div>
  );

  renderWishList = listingData => (
    <CardsShow
      data={listingData}
      filterCurrency={null}
      filterUnit={null}
      history={this.props.history}
      exchangeRates={null}
      currencies={null}
    />
  );
}
const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getOrderedListings }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
