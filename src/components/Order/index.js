import React from "react";
import { MDBContainer, MDBTabContent } from "mdbreact";

import ReviewForm from "./ReviewForm";
import ReadDocument from "./ReadDocument";
import PaymentSelect from "./PaymentSelect";
import CompleteOrders from "./CompleteOrder";
import EndOrder from "./EndOrder";

class Order extends React.Component {
  state = {
    activeItem: "1",
    selectedPaymentMethod: null,
    downloadLink: ""
  };

  toggle = tab => () => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  handleSelect = method => {
    this.setState({ selectedPaymentMethod: method });
  };

  handleNextClick = url => {
    this.setState({ downloadLink: url });
    this.toggle("5")();
  };

  render = () => (
    <MDBContainer className="pt-5">{this.renderContent()}</MDBContainer>
  );

  renderContent = () => (
    <MDBTabContent activeItem={this.state.activeItem}>
      <ReviewForm
        productDetail={this.props.productDetail}
        onClickNext={this.toggle("2")}
      />
      <PaymentSelect
        onClickNext={this.toggle("3")}
        paymentMethods={this.props.paymentMethods}
        onClickPaymentMethod={this.handleSelect}
        history={this.props.history}
      />
      <ReadDocument onClickNext={this.toggle("4")} />
      <CompleteOrders
        productDetail={this.props.productDetail}
        selectedPaymentMethod={this.state.selectedPaymentMethod}
        getPaymentSettings={this.props.getPaymentSettings}
        sendOrder={this.props.sendOrder}
        sendConfirmCardOrder={this.props.sendConfirmCardOrder}
        onClickNexthandler={this.handleNextClick}
      />
      <EndOrder
        downloadLink={this.state.downloadLink}
        onClickEnd={this.props.onClickEnd}
      />
    </MDBTabContent>
  );
}

export default Order;
