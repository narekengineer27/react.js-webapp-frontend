import React, { Component } from "react";
import { MDBIcon } from "mdbreact";
import { IbanElement, injectStripe } from "react-stripe-elements";

const style = {
  base: {
    fontSize: "16px",
    color: "#424770",
    letterSpacing: "0.025em",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#9e2146"
  }
};

class IbanForm extends Component {
  state = {
    name: "",
    email: "",
    loadingSave: false
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handeSubmit = async e => {
    e.preventDefault();
    if (this.state.loadingSave) return;
    this.setState({ loadingSave: true });
    const ibanElement = this.props.elements.getElement("iban");
    try {
      const sepaSetupIntent = await this.props.sepaSetupIntent();

      this.props.stripe
        .confirmSepaDebitSetup(sepaSetupIntent, {
          payment_method: {
            sepa_debit: ibanElement,
            billing_details: {
              name: this.state.name,
              email: this.state.email
            }
          }
        })
        .then(res => {
          console.log(res);
          //   this.props.onClickSave(res);
          this.setState({ loadingSave: false });
        });
    } catch (e) {
      console.log(e);
      this.setState({ loadingSave: false });
    }
    return;
  };

  render = () => (
    <form className="iban-form" onSubmit={this.handeSubmit}>
      <h3 className="iban-form-title">IBAN Info</h3>
      {this.renderIbanBlock()}
      {this.renderSaveButtonBlock()}
    </form>
  );

  renderIbanBlock = () => (
    <div className="form-group iban-number">
      <label>
        Name
        <input
          type="text"
          placeholder="Jane Doe"
          onChange={e => this.handleChange("name", e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          placeholder="jane.doe@example.com"
          onChange={e => this.handleChange("email", e.target.value)}
          required
        />
      </label>
      <label>
        <span>IBAN</span>
      </label>
      <div className="input-item">
        <IbanElement supportedCountries={["SEPA"]} style={style} />
      </div>
      <label>
        BIC 
        <input
          type="text"
          placeholder="DEUTDE2H273"
        />
      </label>
    </div>
  );

  renderSaveButtonBlock = () => (
    <div className="action-blc">
      <button className="button button-primary credit">
        {this.state.loadingSave && (
          <MDBIcon icon="circle-notch" spin size="2x" fixed />
        )}
        {!this.state.loadingSave && "Save my card"}
      </button>
    </div>
  );
}
export default injectStripe(IbanForm);
