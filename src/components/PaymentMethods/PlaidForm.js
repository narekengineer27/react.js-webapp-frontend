import React from "react";
import PlaidLink from "react-plaid-link";

const PlaidForm = props => {
  return props.plaidInfo ? (
    <PlaidLink
      className="button button-primary credit"
      style={{display: "none"}}
      clientName={props.plaidInfo.clientName}
      env={props.plaidInfo.env}
      product={props.plaidInfo.product}
      selectAccount={true}
      publicKey={props.plaidInfo.publicKey}
      onSuccess={props.onSuccessPlaid}
    >
      Link your bank account
    </PlaidLink>
  ) : null;
};
export default PlaidForm;
