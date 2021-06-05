import React, { Component } from "react";
import { MDBIcon } from "mdbreact";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  injectStripe
} from "react-stripe-elements";

import { createNotification } from "../../utils/notification";

class CreditForm extends Component {
  state = {
    loadingSave: false
  };

  handeSubmit = async e => {
    e.preventDefault();
    if (this.state.loadingSave) return;
    if (this.props.onClickSave()) {
      this.setState({ loadingSave: true });
      const cardNumberElement = this.props.elements.getElement("cardNumber");
      try {
        const setupIntent = await this.props.setupIntent();

        this.props.stripe
          .confirmCardSetup(setupIntent, {
            payment_method: {
              card: cardNumberElement,
              billing_details: {
                name: this.props.data.cardName,
                address: {
                  city: this.props.data.city,
                  country: this.props.data.country,
                  state: this.props.data.state,
                  postal_code: this.props.data.zip,
                  line1: this.props.data.address
                }
              }
            }
          })
          .then(res => {
            if (res.error) {
              createNotification("⚠️ " + res.error.message, "info");
              this.setState({ loadingSave: false });
            } else {
              this.props.onClickSave(res);
              this.setState({ loadingSave: false });
            }
          });
      } catch (e) {
        console.log(e);
        this.setState({ loadingSave: false });
      }
    }
    return;
  };

  render() {
    return (
      <form
        className="credit-form"
        style={this.props.display ? { display: "block" } : { display: "none" }}
        onSubmit={this.handeSubmit}
      >
        {this.renderCreditCardBlock()}
        {this.renderBillingAddressBlock()}
        {this.renderSaveButtonBlock()}
      </form>
    );
  }

  renderCreditCardBlock = () => (
    <React.Fragment>
      <h3 className="credit-form-title">Card Info</h3>
      <div className="row card-row">
        <div className="col-sm-12 col-md-6 p-2">
          <div className="card-blc front">
            <div id="card-element" className="form-group card-number">
              <label>
                <span>Card Number</span>
              </label>
              <div className="input-item">
                <CardNumberElement
                  onChange={e =>
                    this.props.onChangeInput("cardNumber", e.empty)
                  }
                />
                <div className="help-block">
                  {this.props.data.errors.cardNumber}
                </div>
              </div>
            </div>
            <div className="form-group card-expiration">
              <label>
                <span>Expiration Date</span>
              </label>
              <div className="input-item">
                <CardExpiryElement
                  onChange={e =>
                    this.props.onChangeInput("cardExpiry", e.empty)
                  }
                />
                <div className="help-block">
                  {this.props.data.errors.cardExpiry}
                </div>
              </div>
            </div>
            <div className="form-group card-name">
              <label>
                <span>Cardholder Name</span>
              </label>
              <div className="input-item">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  tabIndex="0"
                  name="name"
                  onChange={e =>
                    this.props.onChangeInput("cardName", e.target.value)
                  }
                />
                <div className="help-block">
                  {this.props.data.errors.cardName}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 p-2">
          <div className="card-blc back">
            <div className="form-group">
              <div className="back-inner">
                <label>
                  <span>CVC code</span>
                </label>
                <CardCvcElement
                  onChange={e => this.props.onChangeInput("cardCode", e.empty)}
                />
                <div className="help-block">
                  {this.props.data.errors.cardCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  renderBillingAddressBlock = () => (
    <div className="area">
      <h3 className="credit-form-title">Billing Address</h3>
      <div className="row">
        <div className="col-sm-12 col-md-6 p-2 ">
          <div className="form-group">
            <label>
              <span>Name</span>
            </label>
            <input
              type="text"
              placeholder="Person or company name"
              tabIndex="0"
              onChange={e => this.props.onChangeInput("name", e.target.value)}
            />
            <div className="help-block">{this.props.data.errors.name}</div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 p-2 ">
          <div className="form-group">
            <label>
              <span>Country</span>
            </label>
            <div className="select-wrap">
              <select
                onChange={e =>
                  this.props.onChangeInput("country", e.target.value)
                }
              >
                <option>Select Country</option>
                {this.props.countries && this.props.countries.length > 0
                  ? this.props.countries.map((item, index) => (
                      <option key={index} value={item.alpha2Code}>
                        {item.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="help-block">{this.props.data.errors.country}</div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 p-2 ">
          <div className="form-group">
            <label>
              <span>Street Address</span>
            </label>
            <input
              type="text"
              placeholder="Street"
              tabIndex="0"
              onChange={e =>
                this.props.onChangeInput("address", e.target.value)
              }
            />
            <div className="help-block">{this.props.data.errors.address}</div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 p-2 ">
          <div className="form-group">
            <label>
              <span>City</span>
            </label>
            <input
              type="text"
              placeholder="City"
              tabIndex="0"
              onChange={e => this.props.onChangeInput("city", e.target.value)}
            />
            <div className="help-block">{this.props.data.errors.city}</div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 p-2 ">
          <div className="form-group">
            <label>
              <span>State</span>
            </label>
            <input
              type="text"
              placeholder="Region"
              tabIndex="0"
              onChange={e => this.props.onChangeInput("state", e.target.value)}
            />
            <div className="help-block">{this.props.data.errors.state}</div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 p-2 ">
          <div className="form-group">
            <label>
              <span>Zip</span>
            </label>
            <input
              type="text"
              placeholder="10001"
              tabIndex="0"
              pattern="[0-9]*"
              value={this.props.data.zip ? this.props.data.zip : ""}
              onChange={e => {
                if (e.target.validity.valid)
                  this.props.onChangeInput("zip", e.target.value);
              }}
            />
            <div className="help-block">{this.props.data.errors.zip}</div>
          </div>
        </div>
      </div>
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

export default injectStripe(CreditForm);
