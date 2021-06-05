import React, { Component } from "react";

import CreditImage from "../../assets/img/svg/paymentIcons/credit-card-tool.svg";
import ACHImage from "../../assets/img/svg/paymentIcons/stripe.svg";
import PaypalImage from "../../assets/img/svg/paymentIcons/paypal.svg";
import AmazonImage from "../../assets/img/svg/paymentIcons/amazon-logo.svg";
import PlusImage from "../../assets/img/svg/paymentIcons/plus.svg";

const paymentItems = [
  {
    imgSrc: CreditImage,
    status: "isCredit",
    type: "card"
  },
  {
    imgSrc: ACHImage,
    status: "isACH",
    type: "sepa"
  },
  {
    imgSrc: PaypalImage,
    status: "isPaypal",
    type: "paypal"
  },
  {
    imgSrc: AmazonImage,
    status: "isAmazon",
    type: "amazon"
  }
];
const addItem = {
  imgSrc: PlusImage,
  status: "isAdd",
  type: ""
};
const originalClass = "payment-item";
const selectedClass = "payment-item-selected";

class PaymentItems extends Component {
  state = {
    status: null
  };

  handleOnClick = (status, type) => {
    this.setState({ status });
    this.props.clickItem(status, type);
  };

  render() {
    const methods = this.props.paymentMethods;
    let payments = [];
    if (methods && methods.length > 0) {
      payments = paymentItems.filter(itm => {
        for (let item of methods) {
          if (item.method === itm.type) return true;
        }
        return false;
      });
      if (payments.length < 3) {
        payments.push(addItem);
      }
    } else payments = paymentItems;
    return (
      <div className="row payment-items">
        {payments.map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 text-center p-2">
            <div
              className={
                this.state.status === item.status
                  ? selectedClass
                  : originalClass
              }
              onClick={e => this.handleOnClick(item.status, item.type)}
            >
              <img width="100px" height="100px" src={item.imgSrc} alt="" />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default PaymentItems;
