import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  addCardInfo,
  getCountries,
  getPaymentSettings,
  addACHTransfer,
  createSetupIntent,
  createSepaSetupIntent
} from "../actions/payment";

import { PaymentItems, PaymentForm } from "../components/PaymentMethods";

const formErrors = {
  cardNumber: "This field is required.",
  cardExpiry: "Please, enter correct expiration date.",
  cardName: "Please, enter cardholder name.",
  cardCode: "This value may only contain numeric characters",
  name: "Please, write the name",
  country: "Please, choose country",
  address: "Please, enter street address",
  city: "Please, enter city name",
  state: "Please, choose state",
  zip: "please, enter zip code"
};

class PaymentMethods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        cardNumber: null,
        cardExpiry: null,
        cardName: null,
        cardCode: null,
        name: null,
        country: null,
        address: null,
        city: null,
        state: null,
        zip: null,
        errors: {
          cardNumber: null,
          cardExpiry: null,
          cardName: null,
          cardCode: null,
          name: null,
          country: null,
          address: null,
          city: null,
          state: null,
          zip: null
        }
      },
      isSelected: {
        isCredit: false,
        isACH: false
      }
    };
  }

  handleOnSuccessPlaid = (publicKey, data) => {
    const sendPlaidToken = {
      account_id: data.account_id,
      public_token: publicKey
    };
    try {
      this.props.addACHTransfer(sendPlaidToken);
    } catch (e) {
      console.log(e);
    }
  };

  handleItemClick = (value, type) => {
    let isSelected = { ...this.state.isSelected };
    let newSelected = {};
    Object.keys(isSelected).map(item => (newSelected[item] = false));
    newSelected[value] = true;
    this.setState({ isSelected: newSelected });
  };

  handleSave = (res = null) => {
    let data = { ...this.state.data };
    let errorList = this.formValidation(data);
    if (errorList.length > 0) {
      for (let key of errorList) {
        if (data.errors.hasOwnProperty(key)) data.errors[key] = formErrors[key];
      }
      this.setState({ data });
      return false;
    } else if (res) {
      try {
        this.props.addCardInfo({
          payment_method: res.setupIntent.payment_method
        });
      } catch (e) {
        console.log(e);
      }
    }
    return true;
  };

  formValidation = formData => {
    let errorList = [];
    for (let key in formData) {
      if (formData[key] === null || formData[key] === "") {
        errorList.push(key);
      }
    }
    return errorList;
  };

  handleOnChangeInput = (name, value) => {
    let data = { ...this.state.data };
    data[name] = value;
    data.errors[name] = formErrors[name];
    if (typeof value === "boolean" && !value) data.errors[name] = null;
    else if (typeof value === "string" && value !== "")
      data.errors[name] = null;
    this.setState({ data });
  };

  render() {
    return (
      <div className="wrapper-margin">
        <div className="payment-wrapper">
          <div className="payment-inner">
            {this.renderHeader()}
            {this.renderBody()}
          </div>
        </div>
      </div>
    );
  }

  renderHeader = () => (
    <div className="payment-header">
      <div className="payment-title">Payment methods</div>
      <div className="payment-label">Choose payment method below</div>
    </div>
  );

  renderBody = () => (
    <div className="payment-body">
      <PaymentItems clickItem={this.handleItemClick} />
      <PaymentForm
        isSelected={this.state.isSelected}
        data={this.state.data}
        onChangeInput={this.handleOnChangeInput}
        onClickSave={this.handleSave}
        getCountries={this.props.getCountries}
        getPaymentSettings={this.props.getPaymentSettings}
        setupIntent={this.props.createSetupIntent}
        sepaSetupIntent={this.props.createSepaSetupIntent}
        onSuccessPlaid={this.handleOnSuccessPlaid}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addCardInfo,
      getCountries,
      getPaymentSettings,
      addACHTransfer,
      createSetupIntent,
      createSepaSetupIntent
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethods);
