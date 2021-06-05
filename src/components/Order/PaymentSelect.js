import React from "react";
import { MDBTabPane } from "mdbreact";

import { PaymentItems } from "../PaymentMethods";
import { createNotification } from "../../utils/notification";

import NextButton from "./NextButton";

class PaymentSelect extends React.Component {
  state = {
    isSelected: {
      isCredit: false,
      isACH: false
    },
    selected: false
  };

  handleOnClickPayment = (value, type) => {
    if (value === "isAdd") {
      this.props.history.push("/payments");
      return;
    }
    let isSelected = { ...this.state.isSelected };
    let newSelected = {};
    Object.keys(isSelected).map(item => (newSelected[item] = false));
    newSelected[value] = true;
    this.setState({ isSelected: newSelected, selected: true });
    this.props.onClickPaymentMethod(type);
  };

  handleClickNext = e => {
    if (this.state.selected) this.props.onClickNext();
    else createNotification("⚠️ Please choose a payment method.", "info");
  };

  render = () => {
    return (
      <MDBTabPane tabId="2" role="tabpanel">
        <div className="order-wrapper payment">
          <div className="title text-center">Payment</div>
          <div className="short-text text-center">
            Choose payment method below.
          </div>
          <PaymentItems
            clickItem={this.handleOnClickPayment}
            paymentMethods={this.props.paymentMethods}
            sendOrder={this.props.sendOrder}
          />
          <NextButton onClickNext={this.handleClickNext} />
        </div>
      </MDBTabPane>
    );
  };
}

export default PaymentSelect;
