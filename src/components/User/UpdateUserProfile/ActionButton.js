import React from "react";
import { MDBIcon } from "mdbreact";
var Translate = require("react-redux-i18n").Translate;

const ActionButton = props => (
  <div className="row m-0 action-btn">
    <div
      className="col-xs-12 col-sm-6 col-md-6 m-1 button button-grey cancel"
      onClick={props.onClickCancel}
    >
      <Translate value="common.cancel" />
    </div>
    <div
      className="col-xs-12 col-sm-6 col-md-6 m-1 button button-primary save"
      onClick={props.onClickSave}
    >
      {props.loadingSave && (
        <MDBIcon icon="circle-notch" spin size="2x" fixed />
      )}
      {!props.loadingSave && <Translate value="common.save" />}
    </div>
  </div>
);

export default ActionButton;
