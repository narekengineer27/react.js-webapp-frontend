import React from "react";
import { MDBTabPane } from "mdbreact";

const EndOrder = props => (
  <MDBTabPane tabId="5" role="tabpanel">
    <div className="order-wrapper final">
      <div className="title text-center">Thank you for your order</div>
      <div className="short-text text-center">
        To download required information press button
      </div>

      <div className="text-center pt-5">
        <a
          className="button button-blue mb-5 download"
          href={props.downloadLink}
          download
          onClick={props.onClickEnd}
        >
          <h4>DownLoad</h4>
        </a>
      </div>
    </div>
  </MDBTabPane>
);

export default EndOrder;
