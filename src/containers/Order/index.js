import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Order from "../../components/Order";

import {
  getPaymentMethods,
  sendOrder,
  getPaymentSettings,
  sendConfirmCardOrder
} from "../../actions/payment";
import NonePage from "../../components/NonePage";

class OrderPage extends React.Component {
  state = {
    paymentMethods: []
  };

  componentDidMount = async () => {
    const paymentMethods = await this.props.getPaymentMethods();
    this.setState({ paymentMethods });
  };

  handleEnd = () => {
    this.props.history.push("/");
  };

  render = () => {
    const paymentMethods = this.state.paymentMethods;
    return paymentMethods.length > 0 ? (
      <div className="wrapper-margin bg-white">
        <Order
          productDetail={this.props.location.state.productDetail}
          paymentMethods={this.state.paymentMethods}
          getPaymentSettings={this.props.getPaymentSettings}
          sendOrder={this.props.sendOrder}
          sendConfirmCardOrder={this.props.sendConfirmCardOrder}
          onClickEnd={this.handleEnd}
          history={this.props.history}
        />
      </div>
    ) : (
      <NonePage page="payment" />
    );
  };
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getPaymentMethods, sendOrder, getPaymentSettings, sendConfirmCardOrder },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
