import React, { Component } from "react";

import { StripeProvider, Elements } from "react-stripe-elements";

import CreditForm from "./CreditForm";
import PlaidForm from "./PlaidForm";
import IbanForm from "./IbanForm";

class PaymentForm extends Component {
  state = {
    stripe: null,
    countries: [],
    plaidInfo: null,
    stripeInfo: null
  };

  componentDidMount = async () => {
    const { getCountries, getPaymentSettings } = this.props;

    const countries = await getCountries();
    const paymentSettings = await getPaymentSettings();
    const stripeInfo = paymentSettings.stripe;
    const plaidInfo = paymentSettings.plaid;

    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(stripeInfo.publishableKey) });
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        this.setState({
          stripe: window.Stripe(stripeInfo.publishableKey)
        });
      });
    }
    this.setState({ countries, plaidInfo, stripeInfo });
  };
  render() {
    return (
      <div className="payment-form-blc">
        {this.renderCreditForm()}
        {this.renderPlaidLink()}
      </div>
    );
  }

  renderCreditForm = () => (
    <StripeProvider stripe={this.state.stripe}>
      <Elements>
        <CreditForm
          data={this.props.data}
          onChangeInput={this.props.onChangeInput}
          onClickSave={this.props.onClickSave}
          countries={this.state.countries}
          display={this.props.isSelected.isCredit}
          setupIntent={this.props.setupIntent}
        />
      </Elements>
    </StripeProvider>
  );

  renderPlaidLink = () => (
    <StripeProvider stripe={this.state.stripe}>
      <Elements>
        <div
          className="area"
          style={
            this.props.isSelected.isACH
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <div className="action-blc">
            <IbanForm sepaSetupIntent={this.props.sepaSetupIntent} />
            <PlaidForm
              plaidInfo={this.state.plaidInfo}
              onSuccessPlaid={this.props.onSuccessPlaid}
            />
          </div>
        </div>
      </Elements>
    </StripeProvider>
  );
}
export default PaymentForm;
